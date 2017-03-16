from flask import Flask, render_template, redirect, url_for, request
from flask_bootstrap import Bootstrap
from flask_wtf import Form
from wtforms import StringField, PasswordField
from py2neo import Graph, Node, Relationship, authenticate, watch
from py2neo.ogm import GraphObject, Property, RelatedTo, RelatedFrom, Related
from os import getenv

########### setup ########### 
app = Flask(__name__)
Bootstrap(app)
app.config['SECRET_KEY'] = 'ithinkiwassupposedtosaysomething'

graph = Graph(password=getenv('NEO4J_PASSWORD'))
watch('neo4j.bolt')

########### pages ########### 
@app.route('/', methods=['GET','POST'])
def home():
	if request.method == 'POST':
		searchname = request.form['name']
# 		return('The current name is ' + searchname)
		return render_template(url_for('get_person'), name=searchname)
	if request.method == 'GET':
		searchform = SearchForm()
		return render_template('home.html', form=searchform)

@app.route('/browse/people')
def get_person_list():
	people = Person.select(graph)

	return render_template('people.html', people=people)

@app.route('/browse/institutions')
def get_institution_list():
	institutions = Institution.select(graph).order_by('_.name')

	return render_template('institutions.html', institutions=institutions)

	
@app.route('/person/<string:name>')
def get_person(name):
# 	TO DO: use urllib.parse.quote_plus or cypher_escape to make name safe, translating back and forth between url and the database (in person.html)
# 	TO DO: put name_split in backticks before searching 
	name_split = name.replace('-', ' ')
	name_joined = title_except(name_split)
	
	person = Person.select(graph, name_split).first()
# 	siblings = 
	
	return render_template('person.html', person=person, name=name_joined)

@app.route('/institution/<string:name>')
def get_institution(name):
	name_split = name.replace('-', ' ')
	name_joined = title_except(name_split)
	
	institution = Institution.select(graph, name_split).first()
	
	return render_template('institution.html', institution=institution, name=name_joined)

# @app.route('add/person/<string:name>', method=['GET','POST'])
# def add_person(name):
# 	if request.method == 'POST':
# 		prev_update = UpdateLog.select(graph)[-1]
# 		
# 		update = UpdateLog()
# 		update.id = prev_update.id + 1
# # 		update.timestamp = 
# 
# 		person = Person()
# 		person.name = request.form['name']
# 		person.body = request.form['body']
# 		person.last_update = update
# 		person.push(graph)
# 		
# 		
# 		flash('Person added!')
# 		return redirect(url_for('add_person'), name=name)

# @app.route('/csv-upload', method=['GET','POST'])
# def load_csv():
# 	pass

########### actions ########### 
# TO DO
# - import from CSV
# - add person
# - edit person (use flask_admin?)
# - add institution
# - edit institution (use flask_admin?)
# - add relationship
# - edit relationship

########### models ########### 

##### nodes #####
class Content(GraphObject):				# group Person and Institution
	pass

class Person(Content):
	__primarykey__ = 'name'
	
	name = Property()
	in_scholar_names = Property()
# 	
	mentored = RelatedTo('Person')
	mentored_by = RelatedFrom('Person', 'MENTORED')
	worked_alongside = Related('Person', 'WORKED_ALONGSIDE')
	studied_at = RelatedTo('Institution')
	worked_at = RelatedTo('Institution')
	tagged = RelatedTo('Tag')
	member_of = RelatedTo('Institution')
	
	last_update = RelatedTo('UpdateLog')
	
	# TO DO: define functions to get the relation attributes for the 
	# relations above, since I can't figure out where py2neo does that
	
	def __lt__(self, other):
		return self.name.split()[-1] < other.name.split()[-1]

class Institution(Content):
	__primarykey__ = 'name'
# 	
	name = Property()
	location = Property()
	type = Property()
	carnegie_class = Property()
# 	
	students = RelatedFrom('Person', 'STUDIED_AT')
	employees = RelatedFrom('Person', 'WORKED_AT')
	members = RelatedFrom('Person', 'MEMBER_OF')
	
	last_update = RelatedTo('UpdateLog')
	
	def __lt__(self, other):
		return self.name < other.name

class User(GraphObject):
	__primarykey__ = 'username'
	
	username = Property()
	joined = Property()
	last_access = Property()
	active = Property()
	
	contributed = RelatedTo('UpdateLog')
	
	# TO DO: define functions here for adding nodes, relationships,
	# so we can call them in the view routes above

class Provenance(GraphObject):			# group UpdateLog and DataSource
	pass	
# 
class UpdateLog(Provenance):
	__primarykey__ = 'id'
	
	id = Property()
	timestamp = Property()
	query = Property()
	
	previous = RelatedTo('UpdateLog', 'LAST_UPDATE')
	next = RelatedFrom('UpdateLog', 'LAST_UPDATE')
	based_on = RelatedTo('Provenance', 'BASED_ON')
	
	affected_nodes = RelatedFrom('Content', 'LAST_UPDATE')
	contributed_by = RelatedFrom('User', 'CONTRIBUTED')
	
class DataSource(Provenance):
	__primarykey__ = 'uri'
	
	id = Property()
	description = Property()
	uri = Property()
	
	source_for = RelatedFrom('UpdateLog', 'BASED_ON')

class Tag(GraphObject):
	__primarykey__ = 'name'
	
	name = Property()
	description = Property()
	
	see_also = Related('Tag')
	tagged = RelatedFrom('Content')

##### relationships #####
class BasedOn(Relationship):
	pass

class Contributed(Relationship):
	pass

class Mentored(Relationship):
	pass

class StudiedAt(Relationship):
	pass

class WorkedAlongside(Relationship):
	pass

class WorkedAt(Relationship):
	pass



########### forms ###########
class SearchForm(Form):
	name = StringField('name')

class PersonForm(Form):
	name = StringField('Name: ')
	body = StringField('Any other text to add? ')


########### utility functions ########### 
# A way to make names uppercase from URL strings, 
# from http://stackoverflow.com/questions/3728655/titlecasing-a-string-with-exceptions
import re 
def title_except(s):
	exceptions = ['of', 'the', 'at', 'in', 'for']
	word_list = re.split(' ', s)	   # re.split behaves as expected
	final = [word_list[0].capitalize()]
	for word in word_list[1:]:
		final.append(word if word in exceptions else word.capitalize())
	return ' '.join(final)


############## run the app ############## 	
if __name__ == '__main__':
	app.run(debug=True, port=5001)
