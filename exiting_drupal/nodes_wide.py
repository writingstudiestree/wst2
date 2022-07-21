#!/usr/bin/python3

##### nodes_wide #####
#
# GOAL: Combine information about nodes into a single table for easier export
#
#####

def main():
	import pymysql.cursors

	# Connect to the database
	DATABASE = 'wst_minimal_20170310'

	connection = pymysql.connect(host='127.0.0.1',
								 user = os.environ.get('DBUSR'),
								 password = os.environ.get('DBPWD'),
								 db = DATABASE,
								 charset = 'utf8',
								 port = 8889)

	# Do the hard work
	get_nodes(connection)

	# close connection
	connection.close()


# The hard work
def get_nodes(connection):
	# Make sure there's a destination table. Require nid to be unique.
	#     Note that some fields will be easier to add later with joins
	#     (e.g. field_name, field_image)
	with connection.cursor() as cursor:
		sql = '''
	CREATE TABLE IF NOT EXISTS nodes_wide
	(
	nid int UNSIGNED NOT NULL,
	node_type varchar(32) NOT NULL,
	title varchar(255) NOT NULL,
	body longtext,
	summary mediumtext,
	city varchar(255),
	state varchar(255),
	country varchar(255),
	created_by varchar(255),
	created int(11),
	updated_by varchar(255),
	updated int(11),
	refs mediumtext,
	PRIMARY KEY (nid)
	);
	'''
		cursor.execute(sql)

	# Insert or update fields from various tables; first, actual `node` table
	select_meta = '''
	SELECT a.nid, a.type AS node_type, a.title, a.uid AS created_by, a.created AS created, a.changed AS updated
	FROM node AS a
	'''
	with connection.cursor() as cursor:
		cursor.execute(select_meta)
		a = cursor.fetchall()

	# First, prep insert statement to be populated with data
	insert_sql = '''
	INSERT INTO nodes_wide (nid, node_type, title, created_by, created, updated)
	VALUES %s
	ON DUPLICATE KEY UPDATE node_type=%s, title=%s, created_by=%s, created=%s, updated=%s;
	'''

	# then loop through the data to insert
	with connection.cursor() as cursor:
		for i in a:
			data = i, i[1], i[2], i[3], i[4], i[5]
			cleandata = tuple(map(connection.escape, data))
			query = insert_sql % cleandata
	#         print(query)
			cursor.execute(query)

	## Grab other node fields, with nids, from the other tables.
	## Store each field as a tuple of duples, then loop over rows to insert

	# Several columns use similar sql, so prep them outside the loop
	select_sql = '''
	SELECT a.entity_id, a.%s AS %s
	FROM %s AS a;
	'''
	update_sql = '''
	UPDATE nodes_wide
	SET %s=%s
	WHERE nid=%s;
	'''

	# Get the list of old columns and tables, with their new names
	import csv
	with open('node_fields.csv', 'rU') as f:
		reader = csv.reader(f)
		field_list = list(reader)[1:]    # skip first line, which is a header

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

	## Now to join in those other fields
	## first, names
	# select_sql = '''
	# SELECT b.*, field_name_title AS name_title, field_name_given AS name_given, field_name_middle AS name_middle, field_name_family AS name_family, field_name_generational AS name_generational, field_name_credentials AS credentials
	# FROM field_data_field_name AS a
	# RIGHT JOIN nodes_wide AS b
	# ON a.entity_id = b.nid;
	# '''

	# Add in metadata about node creation/revision
	select_meta = '''
	SELECT a.uid AS created_by, a.created, b.uid AS updated_by, b.timestamp AS updated, a.nid
	FROM node AS a, node_revision AS b
	WHERE a.vid = b.vid;
	'''
	with connection.cursor() as cursor:
		cursor.execute(select_meta)
		b = cursor.fetchall()

	update_meta = '''
	UPDATE nodes_wide
	SET created_by=%s, created=%s, updated_by=%s, updated=%s
	WHERE nid=%s;
	'''

	for i in b:
		with connection.cursor() as cursor:
			cleandata = tuple(map(connection.escape, i))
			sql = update_meta % cleandata
			cursor.execute(sql)



	## Save changes to the database, or they won't show up.
	connection.commit()

if __name__=="__main__": main()
