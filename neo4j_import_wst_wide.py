#!/usr/bin/python3

###### neo4j_import_wst_wide ######
# 
# GOAL: Given WST data extracted via drupal_to_wide.py, 
# 		stored as two spreadsheets (one for nodes, one for relations),
#		import that data into neo4j.
#
######

# Load libraries
from py2neo import Graph, authenticate, watch, Node, Relationship, cypher_escape
import os
import csv
import uuid
import datetime

fileroot = os.path.join('/','Users','benmiller314','Documents','Webdev','wstbridges')
db_name = 'wst_minimal_20170310'


def main():
	# Connect to the neo4j database
	graph = Graph(password=os.getenv('NEO4J_PASSWORD'))
	watch('neo4j.bolt')
	
	# Do the hard work
	load_nodes(graph, start_clean=1)
	load_rels(graph, do_worked_at=1, do_mentored=1, do_worked_alongside=1, do_studied_at=1)
	
	# Close connection
# 	graph.close()


# Define the hard work
def load_nodes(graph, start_clean=0, do_people=1, do_schools=1):
	if(start_clean):
		graph.run('MATCH (n) DETACH DELETE n')
		graph.run('CREATE CONSTRAINT ON (p:Person) ASSERT p.name IS UNIQUE;')
		graph.run('CREATE CONSTRAINT ON (i:Institution) ASSERT i.name IS UNIQUE;')
		graph.run('CREATE CONSTRAINT ON (ds:DataSource) ASSERT ds.uri IS UNIQUE;')
		graph.run('CREATE CONSTRAINT ON (ul:DataSource) ASSERT ul.id IS UNIQUE;')
		graph.run('CREATE CONSTRAINT ON (u:User) ASSERT u.id IS UNIQUE;')
		graph.run('CREATE CONSTRAINT ON (p:Person) ASSERT p.nid IS UNIQUE')
		graph.run('CREATE CONSTRAINT ON (i:Institution) ASSERT i.nid IS UNIQUE')
		graph.run('CREATE INDEX ON :MENTORED(subtype)')
		graph.run('CREATE INDEX ON :WORKED_AT(subtype)')
		graph.run('CREATE INDEX ON :WORKED_ALONGSIDE(subtype)')
		graph.run('CREATE INDEX ON :STUDIED_AT(subtype)')

# Use Python to read in the node data, 
# hopefully fixing weird encoding and escaping errors in the process
	filename = os.path.join(fileroot, db_name + '_nodes_wide.csv')
	
	with open(filename, mode='r', newline=None, encoding='latin1') as f:
		reader = csv.DictReader(f)
		data = list(reader)[1:]

	people, schools = [], []
	for row in data:
		if row['node_type'] == 'person':
			people.append(row)
		elif row['node_type'] == 'school_or_institution':
			schools.append(row)
	
	# Create a single UpdateLog for this whole import
	ul_id = str(uuid.uuid4())
	ul = Node("UpdateLog", id=ul_id)
	graph.merge(ul)
	now = datetime.datetime.now().isoformat()
	ul.timestamp = now
	ul.query = "Can't record all queries from CSV import. CSV filename = %s"
	ul.query = ul.query % cypher_escape(filename)
	ul.push()
	
	# Create a DataSource that's just "crowdsourced into the WST by date"
	ds = Node("DataSource", uri="http://writingstudiestree.org")
	graph.merge(ds)
	ds.description = '''
	Entered into the Writing Studies Tree on or before %s
	''' % db_name[-8:]
	ds.push()
	
	# Link UpdateLog to DataSource
	rel = Relationship(ul, "BASED_ON", ds)
	graph.merge(rel)
	
	# Load people
	# TO DO: Make this import more efficient: list fields we want, write a function to copy from sourcefile to node iff the field is not empty, map the function onto the field list
	if do_people:
		for person in people:
			p = Node("Person", name = person['title'])
			graph.merge(p)
		
			## try not to overwrite nid with duplicate
	# 		if p['nid'] and person['nid'] not in p['nid']:
	# 			p['nid'].append(int(person['nid']))
	# 		else:
	# 			p['nid'] = []
	# 			p['nid'].append(int(person['nid']))
			p['nid'] = int(person['nid'])
			p['body'] = person['body']
			p['summary'] = person['summary']
			p['created_by'] = int(person['created_by'])
			p['created_on'] = int(person['created'])
			p['updated_by'] = int(person['updated_by'])
			p['updated_on'] = int(person['updated'])
			p['refs'] = []
			p['refs'].append(person['refs'])
			p.push()
	
			# Link this node to the UpdateLog
			rel = Relationship(p, "LAST_UPDATE", ul)
			graph.merge(rel)
	
		# check that it worked
		person_count = graph.run('match (p:Person) return count(p) as person_count').next()
		print(person_count)
	
	# Load institutions
	if do_schools:
		for school in schools:
			i = Node("Institution", name = school['title'])
			graph.merge(i)
		
	#		# try not to overwrite nid with duplicate
	# 		if i['nid'] and school['nid'] not in i['nid']:
	# 			i['nid'].append(int(school['nid']))
	# 		else:
	# 			i['nid'] = []
	# 			i['nid'].append(int(school['nid']))
	#			i['nid'].append(school['nid'])
		
			i['nid'] = int(school['nid'])
			i['city'] = school['city']
			i['state'] = school['state']
			i['country'] = school['country']
			i['body'] = school['body']
			i['summary'] = school['summary']
			i['created_by'] = int(school['created_by'])
			i['created_on'] = int(school['created'])
			i['updated_by'] = int(school['updated_by'])
			i['updated_on'] = int(school['updated'])
			i['refs'] = []
			i['refs'].append(school['refs'])
			i.push()
		
			# Link this node to the UpdateLog
			rel = Relationship(i, "LAST_UPDATE", ul)
			graph.merge(rel)
		
		# check that it worked
		school_count = graph.run('match (p:Institution) return count(p) as school_count').next()
		print(school_count)


# Load relations
def load_rels(graph, do_mentored=1, do_worked_at=1, do_studied_at=1, do_worked_alongside=1, do_this_took_place_at=0):
	filename = os.path.join(fileroot, db_name + '_relations_wide.csv')
	with open(filename, mode='r', newline=None, encoding='latin1') as f:
		reader = csv.DictReader(f)
		data = list(reader)[1:]
	
	# Split out the datasets for easier checking, at least for now
	# TO DO: Try to repeat less code by handling these cases more efficiently
	mentored, worked_at, studied_at, worked_alongside, took_place_at = [],[],[],[],[]
	for row in data:
		if row['relation_type'] == 'mentored':
			mentored.append(row)
		elif row['relation_type'] == 'worked_at':
			worked_at.append(row)
		elif row['relation_type'] == 'studied_at':
			studied_at.append(row)
		elif row['relation_type'] == 'worked_alongside':
			worked_alongside.append(row)
		elif row['relation_type'] == 'this_took_place_at':
			took_place_at.append(row)
	
	# Brace for manual entry
	manual_entry = []
	
	# Mentoring relations
	if do_mentored:
		for line in mentored:
			query = '''
			MATCH (s:Person {nid: %s}),(t:Person {nid: %s}) 
			MERGE (s)-[r:MENTORED]->(t)
			SET r.subtype = "%s", 
				r.start_date = "%s", 
				r.end_date = "%s", 
				r.created_on = "%s", 
				r.created_by = "%s",
				r.updated_on = "%s",
				r.updated_by = "%s",
				r.body = "%s",
				r.rid = "%s"
			''' 
			if line['other']:
				body = str.strip(line['other'])
				body = str.replace(body, '"', '""')
			else:
				body = ''
			
			mixins = (int(line['source']), int(line['target']), line['relation_subtype'], line['start_date'], line['end_date'], line['created'], line['created_by'], line['updated'], line['updated_by'], body, line['rid'])
# 			mixins = tuple(map(str.strip, mixins))
			graph.run(query % mixins)
	
	# Employment relations
	if do_worked_at:
		for line in worked_at:
			# if we have both start and end positions, split into two relations
			if len(line['start_position']) > 0 and len(line['end_position']) > 0:
				line_copy = line
				line['title'] = line['start_position']
				line_copy['title'] = line['end_position']
				line_copy['start_date'] = ''
				line_copy['start_position'] = ''
				line['end_date'] = ''
				line['end_position'] = ''
				worked_at.append(line_copy)
			
			# escape 'other' field (free text area) if it exists
			if len(line['other']) > 40:
				manual_entry.append(line)
				continue 
			elif line['other']:
				body = str.strip(line['other'])
				body = str.replace(body, '"', '""')
			else:
				body = ''
			
			
			query = '''
			MATCH (s:Person {nid: %s}), (t:Institution {nid: %s})
			with s, t
			MERGE (s)-[r:WORKED_AT]->(t)
			SET r.subtype = "%s", 
				r.start_date = "%s", 
				r.end_date = "%s", 
				r.created_on = "%s", 
				r.created_by = "%s",
				r.updated_on = "%s",
				r.updated_by = "%s",
				r.body = "%s",
				r.rid = "%s",
				r.title = "%s"
			''' 
			
			# get title of position
			if 'title' in line.keys():
				title = line['title']
			elif line['start_position']:
				title = line['start_position']
			elif line['end_position']:
				title = line['end_position']
			else:
				title = ''
			
			mixins = (int(line['source']), int(line['target']), line['relation_subtype'], line['start_date'], line['end_date'], line['created'], line['created_by'], line['updated'], line['updated_by'], body, line['rid'], title)
# 			mixins = tuple(map(str.strip, mixins))
	# 		print(query % mixins)
			graph.run(query % mixins)
	
	# Studying relations
	if do_studied_at:
		for line in studied_at:
			query = '''
			MATCH (s:Person {nid: %s}), (t:Institution {nid: %s}) 
			MERGE (s)-[r:STUDIED_AT]->(t)
			SET r.subtype = "%s", 
				r.start_date = "%s", 
				r.graduation_year = "%s", 
				r.created_on = "%s", 
				r.created_by = "%s",
				r.updated_on = "%s",
				r.updated_by = "%s",
				r.body = "%s",
				r.rid = "%s",
				r.department = "%s",
				r.toward_degree = "%s"
			''' 
			if line['other']:
				body = str.strip(line['other'])
				body = str.replace(body, '"', '""')
			else:
				body = ''


			mixins = (int(line['source']), int(line['target']), line['relation_subtype'], line['start_date'], line['end_date'], line['created'], line['created_by'], line['updated'], line['updated_by'], body, line['rid'], line['department'], line['degree'])
			# 			mixins = tuple(map(str.strip, mixins))
			graph.run(query % mixins)
		
	# Collaboration relations
	if do_worked_alongside:
		for line in worked_alongside:
			query = '''
			MATCH (s:Person {nid: %s}), (t:Person {nid: %s})
			MERGE (s)-[r:WORKED_ALONGSIDE]->(t)
			SET r.subtype = "%s", 
				r.start_date = "%s", 
				r.end_date = "%s", 
				r.created_on = "%s", 
				r.created_by = "%s",
				r.updated_on = "%s",
				r.updated_by = "%s",
				r.body = "%s",
				r.rid = "%s",
				r.crid = "%s"
			''' 
			if line['other']:
				body = str.strip(line['other'])
				body = str.replace(body, '"', '""')
			else:
				body = ''
			
			
			mixins = (int(line['source']), int(line['target']), line['relation_subtype'], line['start_date'], line['end_date'], line['created'], line['created_by'], line['updated'], line['updated_by'], body, line['rid'], line['crid'])
# 			mixins = tuple(map(str.strip, mixins))
			graph.run(query % mixins)

	if do_this_took_place_at:
		pass	
	
	# TO DO (maybe): 
	# add_label("Content") to all Person and Institution nodes?
	
	# TO DO: Load Users
# 	filename = os.path.join(fileroot, db_name + '_users.csv')
# 	with open(filename, mode='r', newline=None, encoding='latin1') as f:
# 		reader = csv.DictReader(f)
# 		data = list(reader)[1:]
	
	# TO DO: Make this save to csv instead of printing
	if len(manual_entry):
		print('The following rows need to be handled manually:')
		for row in manual_entry:
			print(row)
	

	# TO DO: Query (n:Content['created_by']) and (u:User['uid'])
	# to create Relationship(u, "CONTRIBUTED", 
	
if __name__ == '__main__':
	main()
