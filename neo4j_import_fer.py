#!/usr/bin/python3

###### neo4j_import_fer ######
# 
# GOAL: Get data gathered by the FER (first experiences in research) program
# 		at Pitt out of google drive and into neo4j
#
# PLAN: 
# 		0. Export the `A worked at B` sheet to a CSV
#		1. Connect to the neo4j database
#		2. Use Python to read in the data, simplifying the header
#
#		For each line...
#		3. Merge the (ds:DataSource) into the database
#			- parse Source of Information column as a list
#		4. Create an (ul:UpdateLog)
#		5. Merge (ul)-[:BASED_ON]->(ds)
#		6. Merge the (p:Person) into the database
#			- combine first and last name
#			- if the name already exists, check that studied_at matches;
#				- if it doesn't, save separately for manual entry
#				- if it does match or there is no studied_at, proceed
# 		7. Merge the studied_at (i1:Institution) into the database
#		8. Merge the studied_at relation
# 			- include department and year
#			- TO DO: adjust  (p)-[:LAST_UPDATE]-(ul) and
#					  (i1)-[:LAST_UPDATE]->(ul)
#					  using some helper function I have to write
#		9. Merge the worked_at (i2:Institution) into the database
# 			TO DO: Look up and add location data automatically
# 			TO DO: Prompt on name variants using Levenshtein distance etc
#		10. Merge the worked_at relation, including title, role, start, end
#			- TO DO: adjust  (p)-[:LAST_UPDATE]-(ul) and
#					  (i1)-[:LAST_UPDATE]->(ul)
#					  using some helper function I have to write
#		11. Return / save the list of lines in need of manual entry


# Load libraries
from py2neo import Graph, watch, Node, Relationship
from os import getenv
import csv
import uuid


def main():
# 1. Connect to the neo4j database
	graph = Graph(password=getenv('NEO4J_PASSWORD'))
	watch('neo4j.bolt')

# 2. Use Python to read in the data, simplifying the header
	FILE = 'fer_data.csv'
	simple_headers = ('name_found_via','first_name','last_name','phd_school','phd_department','phd_year','data_source','data_source_file','added_by','worked_at','title','role','start','end','entered_on','needs_attention','confirmed','confirmed_by','confirmed_on')
	with open(FILE, mode='r', newline=None, encoding='latin1') as f:
		reader = csv.DictReader(f, fieldnames=simple_headers)
		data = list(reader)[1:]
	
	# remove whitespace 
	# (as per http://stackoverflow.com/questions/13152585/remove-white-spaces-from-dict-python)
	def strip_dict(d):
		return { key : strip_dict(value)
				if isinstance(value, dict)
				else value.strip()
				for key, value in d.items() }

	data = [strip_dict(row) for row in data]
	
# 	# test that it worked
# 	for i in (1, 5, 50, 100, 500, 1000):
# 		print(data[i]['first_name'] + ' ' + data[i]['last_name'] + ' worked at ' + data[i]['worked_at'] + ' from ' + data[i]['start'] + ' until ' + data[i]['end'])
	
	# create an empty list to save rows in need of manual checking
	manual_entry = []
	
	for row in data:
		# If the row is flagged for exclusion, skip to the next one
		if row['confirmed'] == 'exclude':
			continue
	
# 		# 3. Merge the (ds:DataSource) into the database
# 	
# 		ds = Node('DataSource')
# 			parse Source of Information column as a list, trimming whitespace
# 		ds['uri'] = list(map(str.strip, row['data_source'].split(',')))
# 		ds['description'] = 'Found by searching publicly accessible websites'
# 		graph.merge(ds)
# 		
# 		# 4. Create an (ul:UpdateLog); we'll fill in more info later
# 		ul = Node('UpdateLog', id=uuid.uuid4().hex)
# 		graph.merge(ul)
# 
# 		
# 		# 5. Merge (ul)-[:BASED_ON]->(ds)
# 		rel = Relationship(ul, 'BASED_ON', ds)
# 		graph.merge(rel)
# 		
# 		6. Merge the (p:Person) into the database
		#			combine first and last name
		fullname = row['first_name'] + ' ' + row['last_name']
		p = Node('Person', name=fullname)
		
#			if the name already exists, check that studied_at matches
#			- if it doesn't, save for manual entry and go to the next row
#			- if it does match or there is no studied_at, proceed
		phd_school = row['phd_school']
		query = '''
		MATCH (p:Person {name: "%s"})
		WITH p
		OPTIONAL MATCH (p)-[:STUDIED_AT]->(i:Institution)
		WITH p, i
		RETURN NOT p IS NULL as name_found, 
		  NOT i IS NULL as school_found, 
		  i.name CONTAINS "%s" as school_match
		'''
		reply = graph.run(query % (fullname, phd_school)).data()[:1]

		if type(reply) == 'dict' and reply['name_found'] and reply ['school_found']:
			if not reply['school_match']:
				print("%s is already in the database, but with a different PhD program; please check that it's the same person and enter manually. This row will be skipped and saved for later." % fullname)
				manual_entry.append(row)
				continue
		
# 		looks like we don't have a weird mismatched duplicate, let's proceed
		graph.merge(p)
		
# 		7. Merge the studied_at (i1:Institution) into the database.
# 			Match first with the unique name, then update
		i1 = Node('Institution', name=phd_school)
		graph.merge(i1)
		i1['type']='school'
		i1.push()
		
#		8. Merge the studied_at relation
# 			- include department and year		
		rel = Relationship(p, 'STUDIED_AT', i1)
		rel['toward_degree'] = 'PhD'		### update for a diff dataset ###
		rel['department'] = row['phd_department']
		rel['graduation_year'] = row['phd_year']
		graph.merge(rel)
#			TO DO: adjust  (p)-[:LAST_UPDATE]-(ul) and
#					  (i1)-[:LAST_UPDATE]->(ul)
#					  using some helper function I have to write
		
#		9. Merge the worked_at (i2:Institution) into the database
#		TO DO: Look up and add location data automatically
#		TO DO: Prompt on name variants using Levenshtein distance or similar
		i2 = Node('Institution', name=row['worked_at'])
		graph.merge(i2)
		
#		10. Merge the worked_at relation, including title, role, start, end
		rel = Relationship(p, 'WORKED_AT', i2)
		rel['title'] = row['title']
		rel['role'] = row['role']
		rel['start'] = row['start']
		rel['end'] = row['end']
		rel['as_of'] = row['entered_on']
		graph.merge(rel)
#			TO DO: adjust  (p)-[:LAST_UPDATE]-(ul) and
#					  (i1)-[:LAST_UPDATE]->(ul)
#					  using some helper function I have to write
	
	# TO DO: Make this save to csv instead of printing
	if len(manual_entry):
		print('The following rows need to be handled manually:')
		for row in manual_entry:
			print(row)


if __name__=='__main__': 
	main()

