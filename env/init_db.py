from asyncore import read
from multiprocessing import connection
import sqlite3
# import pandas as pd
import csv
connection = sqlite3.connect('database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

# Opening the trades.csv file
file = open('trades.csv')
 
# Reading the contents of the
# person-records.csv file
contents = csv.reader(file)

# print(contents)

# SQL query to insert data into the
# person table
insert_records = "INSERT INTO trades(trade_id, client, instrument, quantity, direction) VALUES (?, ?, ?, ?, ?)"
cur.executemany(insert_records, contents)

trades = "SELECT * FROM trades"
rows = cur.execute(trades).fetchall()


# Output to the console screen
for r in rows:
    print(r)
 
# Committing the changes
connection.commit()
 
# closing the database connection
connection.close()
