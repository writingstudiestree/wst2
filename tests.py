from py2neo import Graph, Node, Relationship, authenticate, watch
from py2neo.ogm import GraphObject, Property, RelatedTo, RelatedFrom
from os import getenv

graph = Graph(password=getenv("NEO4J_PASSWORD"))
watch("neo4j.bolt")

# Start clean
graph.run('MATCH (n) DETACH DELETE n')

# Set uniqueness constraints
graph.run('CREATE CONSTRAINT ON (p:Person) ASSERT p.name IS UNIQUE;')
graph.run('CREATE CONSTRAINT ON (i:Institution) ASSERT i.name IS UNIQUE;')
graph.run('CREATE CONSTRAINT ON (ds:DataSource) ASSERT ds.uri IS UNIQUE;')
graph.run('CREATE CONSTRAINT ON (ul:DataSource) ASSERT ul.id IS UNIQUE;')
graph.run('CREATE CONSTRAINT ON (u:User) ASSERT u.id IS UNIQUE;')

query='''
MERGE (user1:User {id:'user1'})
MERGE (user2:User {id:'user2'})

MERGE (Ben:Person {name:'Ben Miller'})
MERGE (Amanda:Person {name:'Amanda Licastro'})
MERGE (Jill:Person {name:'Jill Belli'})
MERGE (Sondra:Person {name:'Sondra Perl'})
MERGE (Mark:Person {name:'Mark McBeth'})
MERGE (GC:Institution {name:'The Graduate Center, CUNY', type:'school'})
MERGE (Pitt:Institution {name:'University of Pittsburgh', type:'school'})

MERGE (Sondra)-[:MENTORED {roles:['PhD dissertation chair', 'graduate professor']}]->(Ben)
MERGE (Sondra)-[:MENTORED {roles:['PhD dissertation non-chair committee member', 'graduate professor']}]->(Amanda)
MERGE (Amanda)-[:WORKED_ALONGSIDE {roles:['on a digital project']}]->(Ben)
MERGE (Jill)-[:WORKED_ALONGSIDE {roles:['on a digital project']}]->(Ben)
MERGE (Ben)-[:STUDIED_AT {degrees:['PhD'], department:'English', start:2007, end:2015}]->(GC)
MERGE (Ben)-[:WORKED_AT {title:'Assistant Professor'}]->(Pitt)
  
MERGE (Amanda)-[:STUDIED_AT {degrees:['PhD'], department:'English', start:2009, end:2016}]->(GC)
MERGE (Jill)-[:STUDIED_AT {degrees:['PhD'], department:'English', start:2005, end:2012}]->(GC)
MERGE (Mark)-[:STUDIED_AT {degrees:['PhD'], department:'English', end:2001}]->(GC)
MERGE (Sondra)-[:WORKED_AT {title:'Professor'}]->(GC)
MERGE (Mark)-[:WORKED_AT {title:'Associate Professor'}]->(GC)
MERGE (Sondra)-[:MENTORED {roles:['PhD dissertation chair', 'graduate professor']}]->(Mark)
MERGE (Mark)-[:MENTORED {roles:['PhD dissertation non-chair committee member', 'graduate professor']}]->(Ben)

MERGE (pe:DataSource {name:'direct experience', description:'Information determined by direct personal experience'})
MERGE (wst:DataSource {name:'WST 1.0', description:'Information already in the original Writing Studies Tree'})

MERGE (log1:UpdateLog {id:1, 
	query:"MERGE (Ben:Person {name:'Ben Miller'})
MERGE (Amanda:Person {name:'Amanda Licastro'})
MERGE (Jill:Person {name:'Jill Belli'})
MERGE (Sondra:Person {name:'Sondra Perl'})
MERGE (Mark:Person {name:'Mark McBeth'})
MERGE (GC:Institution {name:'The Graduate Center, CUNY', type:'school'})
MERGE (Pitt:Institution {name:'University of Pittsburgh', type:'school'})

MERGE (Sondra)-[:MENTORED {roles:['PhD dissertation chair', 'graduate professor']}]->(Ben)
MERGE (Sondra)-[:MENTORED {roles:['PhD dissertation non-chair committee member', 'graduate professor']}]->(Amanda)
MERGE (Amanda)-[:WORKED_ALONGSIDE {roles:['on a digital project']}]->(Ben)
MERGE (Jill)-[:WORKED_ALONGSIDE {roles:['on a digital project']}]->(Ben)
MERGE (Ben)-[:STUDIED_AT {degrees:['PhD'], department:'English', start:2007, end:2015}]->(GC)
MERGE (Ben)-[:WORKED_AT {title:'Assistant Professor'}]->(Pitt)"})
MERGE  (log1)-[:BASED_ON]->(pe)
MERGE  (user1)-[:CONTRIBUTED]->(log1)

MERGE (log2:UpdateLog {id:2, 
	query:"MERGE (Amanda)-[:STUDIED_AT {degrees:['PhD'], department:'English', start:2009, end:2016}]->(GC)
MERGE (Jill)-[:STUDIED_AT {degrees:['PhD'], department:'English', start:2005, end:2012}]->(GC)
MERGE (Mark)-[:STUDIED_AT {degrees:['PhD'], department:'English', end:2001}]->(GC)
MERGE (Sondra)-[:WORKED_AT {title:'Professor'}]->(GC)
MERGE (Mark)-[:WORKED_AT {title:'Associate Professor'}]->(GC)
MERGE (Sondra)-[:MENTORED {roles:['PhD dissertation chair', 'graduate professor']}]->(Mark)
MERGE (Mark)-[:MENTORED {roles:['PhD dissertation non-chair committee member', 'graduate professor']}]->(Ben)"})
MERGE (log2)-[:BASED_ON]->(wst)
MERGE (user2)-[:CONTRIBUTED]->(log2)
'''
graph.run(query)

# TO DO: link :UpdateLog nodes to content nodes
