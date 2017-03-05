from flask import Flask, render_template, redirect, url_for, request
from flask_bootstrap import Bootstrap
from flask_wtf import Form
from wtforms import StringField, PasswordField
from py2neo import Graph, Node, Relationship, authenticate, watch
from py2neo.ogm import GraphObject, Property, RelatedTo, RelatedFrom
from os import getenv

########### setup ########### 
app = Flask(__name__)
Bootstrap(app)
app.config['SECRET_KEY'] = 'ithinkiwassupposedtosaysomething'

@app.route('/', methods=['GET','POST'])
def home():
	if request.method == 'POST':
		if form.validate_on_submit():	
			return render_template(url_for(person), name=searchform.name)
	if request.method == 'GET':
		searchform = SearchForm()
		return render_template('home.html', form=searchform)		
		
@app.route('/person/<string:name>')
def person(name):
	name_split = name.replace('-', ' ')
	name_joined = title_except(name_split)
	return '<h2>This is the page for ' + name_joined + '</h2>'


########### models ########### 
### database model ###

class Content(GraphObject):				# group Person and Institution
	pass

class Person(Content):
    __primarykey__ = "name"
	
    name = Property()
    in_scholar_names = Property()
	
    mentored = RelatedTo("Person")
    mentored_by = RelatedFrom("Person")
    worked_alongside = Related("Person")
    studied_at = RelatedTo("Institution")
    worked_at = RelatedTo("Institution")
    tagged = RelatedTo("Tag")
    member_of = RelatedTo("Institution")
    
    last_update = RelatedTo("UpdateLog")
     
    def __lt__(self, other):
        return self.name < other.name

class Institution(Content):
	__primarykey__ = "name"
	
	name = Property()
	location = Property()
	type = Property()
	carnegie_class = Property()

    students = RelatedFrom("Person", "STUDIED_AT")
    employees = RelatedFrom("Person", "WORKED_AT")
    members = RelatedFrom("Person", "MEMBER_OF")
	
    last_update = RelatedTo("UpdateLog")
	
    def __lt__(self, other):
        return self.name < other.name


class User(GraphObject)
	__primarykey__ = "username"
	
	username = Property()
	joined = Property()
	last_access = Property()
	active = Property()
	
	contributed = RelatedTo("UpdateLog")

class Provenance(GraphObject)			# group UpdateLog and DataSource
	pass	

class UpdateLog(Provenance)
	__primarykey__ = "id"
	
	id = Property()
	timestamp = Property()
	query = Property()
	
	previous = relatedTo("UpdateLog", "LAST_UPDATE")
	next = relatedFrom("UpdateLog", "LAST_UPDATE")
	based_on = relatedTo("Provenance", "BASED_ON")
	
	affected_nodes = relatedFrom("Content", "LAST_UPDATE")
	
class DataSource(Provenance)
	__primarykey__ = "id"
	
	id = Property()
	description = Property()
	uri = Property()
	
	source_for = relatedFrom("UpdateLog", "BASED_ON")

class Tag(GraphObject)
	__primarykey__ = "name"
	
	name = Property()
	description = Property()
	
	see_also = Related("Tag")
	tagged = RelatedFrom("Content")
	

### forms ###
class SearchForm(Form):
	name = StringField('name')


	
	
	
########### utility functions ########### 
# A way to make names uppercase from URL strings, 
# from http://stackoverflow.com/questions/3728655/titlecasing-a-string-with-exceptions
import re 
def title_except(s):
    exceptions = ['of', 'the', 'at']
    word_list = re.split(' ', s)       # re.split behaves as expected
    final = [word_list[0].capitalize()]
    for word in word_list[1:]:
        final.append(word if word in exceptions else word.capitalize())
    return " ".join(final)


############## run the app ############## 	
if __name__ == '__main__':
	app.run(debug=True, port=5001)
