from flask import Flask, jsonify, render_template, request
app = Flask(__name__)

@app.route('/generate', methods=['POST'])
def generate():
    a = request.form['repoURL']
    b = request.form['monthYear']
    return jsonify({"repoURL": a, "monthYear": b})

@app.route('/')
def index():
    return render_template("landingPage.html")