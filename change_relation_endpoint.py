#!/usr/bin/python3

###### change_relation_endpoint ######
#
# GOAL: Given an existing relation (n1)-[r]->(n2),
# 		get to (n1)-[copy-of-r]->(n3)
# USES: If you discover a duplicate or misspelled name in (n2),
#		and want to transfer its relationships to the original
#		or correctly spelled (n3).
######

# see http://stackoverflow.com/questions/23376881/neo4j-merge-2-or-multiple-duplicate-nodes

from py2neo import Graph, watch, Node, Relationship
from os import getenv

graph = Graph(password=getenv('NEO4J_PASSWORD'))
watch('neo4j.bolt')


# test values
current_target = "Purdue University at West Lafayette"
new_target = "Purdue University"

find_query = '''
match (i {name: "%s"})<-[r]-(p)
with p, r, i
return p.name as source,
LABELS(i) as targ_labels,
TYPE(r) as reltype,
properties(r) as rel_props,
i.name as current_target,
j.name as new_target
'''  % (current_target, new_target)
reply = graph.run(find_query).data()[:1]

for record in reply:
	targ_labels = record['targ_labels'].join(":")
	reltype = record['reltype']
	relprops = record['relprops']
	source = record['source']
	current_target = record['current_target']
	new_target = record['new_target']

	change_query = '''
	merge (j:%s {name: "%s"})<-[r:%s]-(p:%s {name: "%s"})
	''' % new_target


	'''
	match (i:Institution {name: "%s"})<-[r]-(p {name: "%s"})
	with p, r, i
	match (j:Institution {name:"%s"})
	with p, r, i, j
	merge (p)-[q:%s]->(j)
		on create set q += %s
	return p.name as source,
	r as old_relation,
	q as new_relation,
	j.name as new_target,
	TYPE(r) as old_reltype,
	TYPE(q) as new_reltype
	''' % (current_target, source, new_target, reltype)
	confirmation = graph.run(change_query)
