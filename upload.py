import json
import os
from pymongo import MongoClient

client = MongoClient(
    'mongodb+srv://hwpark:ewha403@cluster0.kihsr.mongodb.net/?ssl=true&ssl_cert_reqs=CERT_NONE')

db = client['hwparkdb']
collection_currency = db['terraria_recipe2']

with open("recipes_new.json", encoding='utf-8', mode='r') as f:
    file_data = json.load(f)

collection_currency.insert_many(file_data)
