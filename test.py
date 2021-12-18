from pymongo import MongoClient

client = MongoClient(
    'mongodb+srv://hwpark:ewha403@cluster0.kihsr.mongodb.net/?ssl=true&ssl_cert_reqs=CERT_NONE')

coll = client.hwparkdb
recipe = coll.terraria_recipe2
item = coll.terraria_item2

name = 'Mushroom'

items = item.find_one({'name': name})
print(items)


# result = item.aggregate([
#     {'$limit': 10},
#     {'$lookup': {
#         'from': "terraria_recipe2",
#         'localField': "recipe1",
#         'foreignField': "id",
#         'as': "r"
#     },
#     }]
# )


# for r in result:
#     if not r['r']:
#         print(r['name'])
#     else:
#         print(r['name'], r['r'][0]['table'])
