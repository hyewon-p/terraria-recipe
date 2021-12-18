import json

file = open("images.json", "r")
strings = file.readlines()
newStrings = []

for string in strings:
    string = string.split("\" alt")
    string = string[0].split("src=\"")
    string = string[1]
    newStrings.append(string)

with open("items.json", "r") as f:
    json_data = json.load(f)

for i in json_data:
    print(i, "writing")
    if int(i["id"]) < 5000:
        i["image"] = newStrings[int(i["id"])-1]
    else:
        i["image"] = newStrings[int(i["id"])-5073]


with open('leftover.json', 'w', encoding='utf-8') as make_file:
    json.dump(json_data, make_file, indent="\t")

make_file.close()
