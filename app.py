from flask import Flask, render_template, request
from scripts import parse
app = Flask(__name__)

@app.route('/generate', methods=['POST'])
def generate():
    repoURL = request.form['repoURL'].replace("https://github.com/", "")
    monthYear = request.form['monthYear']
    response = parse.parse(repoURL, monthYear)
    return response

@app.route('/')
def index():
    return render_template("landingPage.html")