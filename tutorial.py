from flask import Flask, render_template, redirect, url_for, request
from flask_bootstrap import Bootstrap
from flask_wtf import Form
from wtforms import StringField, PasswordField


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

########### classes ########### 
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
