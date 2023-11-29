import pandas as pd
from flask import Flask, request
from flask_cors import CORS
import json

# Starts flask application
app = Flask(__name__)
CORS(app)

df = pd.read_csv("./data/predictions.csv")

# Backend endpoint
# This endpoint receives POST requests with the information sended from the Frontend
# The endpoint receives an object and parses it into a Json object
# The it extracts the distance field and use that compare the closest distances from the trained dataset
# Then the endpoint return the top 100 observations with the closest distance as a response
@app.route('/get-fares', methods=['POST'])
def getFares():
    data = request.get_json()
    data['distance'] = float(data['distance'])
    r_dist = data['distance']
    df['Distance_diff'] = abs(df['Distance'] - r_dist)
    top_rows = df.nsmallest(100, 'Distance_diff').sort_values(by='Predicted', ascending=True)
    top_rows = top_rows.drop(columns=['Distance_diff'])
    top_rows_json = top_rows.to_json(orient='records')
    return json.loads(top_rows_json)
