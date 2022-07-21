#!/usr/bin/python3

##### drupal_to_wide #####
#
# GOAL: To get WST data out of a Drupal database dump.
# PLAN: Set database connection once, then run three files:
#   worked_alongside.py,
#   binary_relations_wide.py,
#   nodes.py
#
# PREP: The tables we'll need from Drupal are these:
# 	field_data_body
# 	field_data_endpoints
# 	field_data_field_city
# 	field_data_field_collaboration_type
# 	field_data_field_country
# 	field_data_field_degree
# 	field_data_field_department
# 	field_data_field_end_date
# 	field_data_field_ending_position
# 	field_data_field_keywords_
# 	field_data_field_links
# 	field_data_field_mentoring_type
# 	field_data_field_name
# 	field_data_field_other
# 	field_data_field_person_image
# 	field_data_field_start_date
# 	field_data_field_starting_position
# 	field_data_field_state
# 	field_data_field_year_end
# 	field_data_field_year_start
# 	file_managed
# 	node
# 	node_revision
# 	relation
# 	relation_revision
# 	taxonomy_index
# 	taxonomy_term_data
# 	users
#
# We'll also need relation_fields.csv and node_fields.csv,
# which map Drupal columns to new fieldnames.
#
# NB: If the database has prefixes on all table names, you can use
# remove_table_prefix.sql in SequelPro to remove them.
# Don't forget to change the database name in line 13 and
# adjust the prefix (and its length) in lines 13 and 11.
#
#####

db_slug='majoring_drup1_'
db_date='20220701'
DATABASE = db_slug + db_date

def main():
	# Connect to the database
	import pymysql.cursors
	connection = pymysql.connect(host='127.0.0.1',
								 user = os.environ.get('DBUSR'),
								 password = os.environ.get('DBPWD'),
								 db = DATABASE,
								 charset = 'utf8',
								 port = 8889)

	# Get all our data
	from binary_relations_wide import get_binaries
	get_binaries(connection)

	from worked_alongside import get_collaborations, merge
	get_collaborations(connection)
	merge(connection)

	from nodes_wide import get_nodes
	get_nodes(connection)

# 	# Export to CSV
#####
#
#	# NB: I couldn't get the file to save properly, so I just exported the following tables from SequelPro: nodes_wide (as nodes_wide.csv), relations_wide (as relations_wide_all.csv)
#	 	IMPORTANT NOTE: WHEN EXPORTING FROM SequelPro, YOU MUST
#		USE " (double-quote) AS THE ESCAPE CHARACTER,
#		NOT THE DEFAULT \ (backslash), OR LINEBREAKS WILL DESTROY THE WORLD
#
#####
# 	from csv_export import save_to_csv
# 	item_types = ['nodes', 'relations']
# 	save_to_csv(connection, item_types)

	# Close connection
	connection.close()

if __name__=="__main__": main()
