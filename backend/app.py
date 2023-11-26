import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

df = pd.read_csv("./data/predictions.csv")

@app.route('/get-fares', methods=['POST'])
def getFares():
    data = request.json
    print("dataaaaaaaa", data)
    r_dist = data['distance']
    df['Distance_diff'] = abs(df['Distance'] - r_dist)
    top_rows = df.nsmallest(5, 'Distance_diff')
    top_rows = top_rows.drop(columns=['Distance_diff'])
    top_rows_json = top_rows.to_json(orient='records')
    return json.loads(top_rows_json)