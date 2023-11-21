import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Hello, world!"

@app.route("/get-fares")
def getFares():
    df = pd.read_csv("./data/fares.csv")
    return json.loads(df.head().to_json(orient='records'))