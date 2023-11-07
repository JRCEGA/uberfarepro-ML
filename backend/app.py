import numpy as np
import pandas as pd
from flask import Flask


app = Flask(__name__)

@app.route("/")
def index():
    return "Hello, world!"

@app.route("/get-fares")
def getFares():
    pass
    # df = pd.read_csv("./data/fares.csv")
    # return df