from crypt import methods
from http.client import OK
from operator import imod
from random import expovariate
from iteration_utilities import unique_everseen
from flask_cors import CORS
import itertools
import sqlite3
import pandas as pd
import json
from flask import Flask, render_template, jsonify

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    return conn

@app.route('/')
def hello():
    return 'server is running'

#get all trades
@app.route('/all-trades', methods = ['GET'])
def index():
    trades = []
    try:
     conn = get_db_connection()
     cursor = conn.execute("SELECT * FROM trades")
     entries = cursor.fetchall()

     #convert entries objects to dictionary
     for i in entries:
         trade = {}
         trade["trade_id"] = i[0]
         trade["client"] = i[1]
         trade["instrument"] = i[2]
         trade["quantity"] = i[3]
         trade["direction"] = i[4]
         trades.append(trade)
      

    except:
     conn.rollback()
    
    finally:
        conn.close()
    
    # return trades
    return jsonify(json.dumps(trades))

#get sum of quantity for the same client and instrument
@app.route('/quantities', methods = ['GET'])
def sum():
    quantities = []
    try:
     conn = get_db_connection()
     cursor = conn.execute("SELECT client, instrument , sum(quantity) ,direction FROM trades group by client, instrument")
     entriess = cursor.fetchall()

     #convert entries objects to dictionary
     for i in entriess:
         quantity = {}
         quantity["client"] = i[0]
         quantity["instrument"] = i[1]
         quantity["sum of quantity"] = i[2]
         quantity["direction"] = i[3]

         quantities.append(quantity)
               
          

    except:
     conn.rollback()
    
    finally:
        conn.close()
    
    return jsonify(json.dumps(quantities)) 


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3006)




