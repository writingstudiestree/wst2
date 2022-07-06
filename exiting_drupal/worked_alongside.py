#!/usr/bin/python3

##### worked_alongside #####
#
# GOAL: Split information about n-ary relations into pairwise edges
# for ease of network analysis
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
	get_collaborations(connection)

# 	merge(connection)


	# And then get out of there
	connection.close()


# Define the hard work
def get_collaborations(connection):
	# We'll need this later for doing combinations
	import itertools as iter

	# Isolate n-ary edges, which in this case can only be worked_alongside
	with connection.cursor() as cursor:
		sql = '''
	CREATE TABLE IF NOT EXISTS relation_worked_alongside
	SELECT *
	FROM field_data_endpoints
	WHERE bundle = "worked_alongside";
	'''
		cursor.execute(sql)

	# Make sure there's a destination table. Can't require rid to be unique,
	# so provide a new iterator, crid (collaborative relation id)
	# NB: To successfully UNION later with relations_wide, need same column names.
	with connection.cursor() as cursor:
		sql = '''
	CREATE TABLE IF NOT EXISTS relations_collab_edges
	(
	rid int UNSIGNED NOT NULL,
	crid int UNSIGNED NOT NULL AUTO_INCREMENT,
	relation_type varchar(255) NOT NULL DEFAULT 'worked_alongside',
	directed tinyint DEFAULT 0,
	source int UNSIGNED NOT NULL,
	source_type varchar(255) NOT NULL DEFAULT 'node',
	target int UNSIGNED NOT NULL,
	target_type varchar(255) NOT NULL DEFAULT 'node',
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
	PRIMARY KEY (crid)
	);
	'''
		cursor.execute(sql)

## 	Add index, unless this is just a re-import
# 	check_sql = "SHOW INDEX FROM relations_collab_edges WHERE COLUMN_NAME='rid'"
# 	create_sql = "CREATE INDEX rid_index ON relations_collab_edges (rid, crid);"
# 	with connection.cursor() as cursor:
# 		check = cursor.execute(check_sql)
# 		if check:
# 			drop_sql = "DROP INDEX rid_index ON relations_collab_edges"
# 			cursor.execute(drop_sql)
# 		cursor.execute(create_sql)

	# Get list of unique relation id's
	with connection.cursor() as cursor:
		sql = "SELECT entity_id FROM relation_worked_alongside GROUP BY entity_id;"
		cursor.execute(sql)

	# Bind to variable in a useable format
	rids = [i[0] for i in cursor.fetchall()]

	# Loop over relations (as rid)
	# to get list of nodes in each relation (as nids)
	with connection.cursor() as cursor:
		for rid in rids:
			sql = "SELECT endpoints_entity_id FROM relation_worked_alongside WHERE entity_id = %s;" % rid
			cursor.execute(sql)
			nids = [i[0] for i in cursor.fetchall()]

			# For each set of nids, find all combinations.
			# This gives a list of tuples (i.e. pairs).
			c = list(iter.combinations(nids, 2))

			# For each pair in c, make a new row in the new table
			for pair in c:
				insert_sql = '''
	INSERT INTO relations_collab_edges (rid, source, target)
	VALUES (%s, %s, %s);
				'''
				insert_sql = insert_sql % (rid, pair[0], pair[1])
	# 			print(insert_sql)
				cursor.execute(insert_sql)

	# Add in data for other columns from other tables
	select_sql = '''
	SELECT a.entity_id, a.%s AS %s
	FROM %s AS a;
	'''
	update_sql = '''
	UPDATE relations_collab_edges
	SET %s=%s
	WHERE rid=%s;
	'''
	# oh wait, I think there's only one other column that's relevant here
	source = ('field_collaboration_type_value', 'relation_subtype', 'field_data_field_collaboration_type')

	# For each column, get the data from the old table...
	with connection.cursor() as cursor:
		select_query = select_sql % tuple(source)
		cursor.execute(select_query)
		my_items = cursor.fetchall()

		# ... and loop through rows to insert them into the new table
		for i in my_items:      # (consider batching this into executemany)
			i = tuple(map(connection.escape, i))
			update_query = update_sql % (source[1], i[1], i[0])
			cursor.execute(update_query)


	# Add in metadata; same process as binary relations, but n-ary relations got # skipped from the list of rid's in the other file, so do it again
	select_meta = '''
	SELECT a.uid AS created_by, a.created, b.uid AS updated_by, b.changed AS updated, a.rid
	FROM relation AS a, relation_revision AS b
	WHERE a.vid = b.vid;
	'''
	with connection.cursor() as cursor:
		cursor.execute(select_meta)
		b = cursor.fetchall()

	update_meta = '''
	UPDATE relations_collab_edges
	SET created_by=%s, created=%s, updated_by=%s, updated=%s
	WHERE rid=%s;
	'''

	for i in b:
		with connection.cursor() as cursor:
			cleandata = tuple(map(connection.escape, i))
			sql = update_meta % cleandata
			cursor.execute(sql)

	# Save changes to the database, or they won't show up.
	connection.commit()

# Finally, add all rows of the table created above into relations_wide
def merge(connection):

	with connection.cursor() as cursor:
		merge_query = '''
		INSERT INTO relations_wide
		SELECT * FROM relations_collab_edges
		ORDER BY crid
		'''
		cursor.execute(merge_query)

	# Save changes to the database, or they won't show up.
	connection.commit()


if __name__=="__main__":
	main()
