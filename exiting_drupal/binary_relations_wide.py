#!/usr/bin/python3

##### binary_relations_wide #####
#
# GOAL: Convert the field_data_endpoints table from "tall" format
# (each row is one node) to "wide" format (each row is one relation),
# then populate with relation fields from the 10 other tables in which
# they're scattered about by Drupal
#
#####


def main():
	import pymysql.cursors
	import os

	# Connect to the database
	DATABASE = 'wst_minimal_20170310'

	connection = pymysql.connect(host='127.0.0.1',
								 user = os.environ.get('DBUSR'),
								 password = os.environ.get('DBPWD'),
								 db = DATABASE,
								 charset = 'utf8',
								 port = 8889)

	# Do the hard work
	get_binaries(connection)
	# Close connection
	connection.close()


# The hard work
def get_binaries(connection):
	# Use fancy join, since I already had it prepped
	with connection.cursor() as cursor:
		sql = '''
	SELECT
		R.entity_id rid,
		R.bundle relation_type,
		S.endpoints_entity_id source,
		S.endpoints_entity_type source_type,
		T.endpoints_entity_id target,
		T.endpoints_entity_type target_type
	FROM
		(
			SELECT DISTINCT entity_id, bundle
			FROM field_data_endpoints
			WHERE bundle != "worked_alongside"
		) R
				INNER JOIN
		(   SELECT entity_id, endpoints_entity_id, endpoints_entity_type
			FROM field_data_endpoints
			WHERE delta = 0
		) S
				ON
			R.entity_id = S.entity_id
				INNER JOIN
		(   SELECT entity_id, endpoints_entity_id, endpoints_entity_type
			FROM field_data_endpoints
			WHERE delta !=0
		) T
				ON
			R.entity_id = T.entity_id;
	'''
		cursor.execute(sql)

	# Bind data to variable
	a = cursor.fetchall()


	# Make sure there's a destination table.
	# Require rid (relation id) to be unique.
	# NB: To successfully UNION later with relations_collab_edges, need same column names.
	with connection.cursor() as cursor:
		sql = '''
	CREATE TABLE IF NOT EXISTS relations_wide
	(
	rid int UNSIGNED NOT NULL,
	crid int UNSIGNED NOT NULL DEFAULT 0,
	relation_type varchar(255) NOT NULL,
	directed tinyint DEFAULT 1,
	source int UNSIGNED NOT NULL,
	source_type varchar(255) NOT NULL,
	target int UNSIGNED NOT NULL,
	target_type varchar(255) NOT NULL,
	relation_subtype varchar(255),
	degree varchar(255),
	department varchar(255),
	start_date varchar(255),
	end_date varchar(255),
	start_position varchar(255),
	end_position varchar(255),
	other mediumtext,
	created_by varchar(255),
	created int(11),
	updated_by varchar(255),
	updated int(11),
	PRIMARY KEY (rid, crid)
	);
	'''
		cursor.execute(sql)


	## Insert required info for new relations or update existing ones.
	# First, prep insert statement to be populated with data
	insert_sql = '''
	INSERT INTO relations_wide (rid, relation_type, source, source_type, target, target_type) VALUES %s
	ON DUPLICATE KEY UPDATE relation_type=%s, source=%s, source_type=%s, target=%s, target_type=%s;
	'''

	# then loop through the data to insert
	with connection.cursor() as cursor:
		for i in a:
			data = i, i[1], i[2], i[3], i[4], i[5]
			cleandata = tuple(map(connection.escape, data))
			query = insert_sql % cleandata
			cursor.execute(query)


	## Grab relation fields, with rids, from the other tables.
	## Store each field as a tuple of duples, then loop over rows to insert

	# A few fields in the relation table don't have separate entity_id:
	select_meta = '''
	SELECT a.uid AS created_by, a.created, b.uid AS updated_by, b.changed AS updated, a.rid
	FROM relation AS a, relation_revision AS b
	WHERE a.vid = b.vid;
	'''
	with connection.cursor() as cursor:
		cursor.execute(select_meta)
		b = cursor.fetchall()

	update_meta = '''
	UPDATE relations_wide
	SET created_by=%s, created=%s, updated_by=%s, updated=%s
	WHERE rid=%s;
	'''

	for i in b:
		with connection.cursor() as cursor:
			cleandata = tuple(map(connection.escape, i))
			sql = update_meta % cleandata
			cursor.execute(sql)


	# All remaining columns use similar sql, so prep them outside the loop

	# get the list of old columns and tables, with their new names
	import csv
	with open('relation_fields.csv', 'rU') as f:
		reader = csv.reader(f, quoting=csv.QUOTE_NONE)
		field_list = list(reader)[1:]    # skip first line, which is a header
	#     print(field_list)


	select_sql = '''
	SELECT a.entity_id, a.%s AS %s
	FROM %s AS a;
	'''
	update_sql = '''
	UPDATE relations_wide
	SET %s=%s
	WHERE rid=%s;
	'''
	# To compile the sql statements, loop over the columns in field_list.
	for source in field_list:
		# For each column, get the data from the old table...
		with connection.cursor() as cursor:
			query = select_sql % tuple(source)
			cursor.execute(query)
			my_items = cursor.fetchall()

			# ... and loop through rows to insert them into the new table
			for i in my_items:      # (consider batching this into executemany)
				i = tuple(map(connection.escape, i))
				query = update_sql % (source[1], i[1], i[0])
				cursor.execute(query)



	##     translate mtypes into human-readable values
	## TO DO: this translation while importing into neo4j
	# mtype_table = {("chair", "as dissertation chair"), \
	# ("committee","as a non-chair member of the dissertation committee"), \
	# ("writing program","as a writing program administrator"), \
	# ("writing center","as a writing center administrator"), \
	# ("wac-wid","as a WAC/WID program administrator"), \
	# ("writing project","as a writing project site administrator"), \
	# ("professor","as a professor (graduate)"), \
	# ("undergrad professor","as a professor (undergraduate)"), \
	# ("other ","as a formal advisor of a type not listed above")}
	# print(mtype_table)



	## Save changes to the database, or they won't show up.
	connection.commit()


if __name__=="__main__": main()
