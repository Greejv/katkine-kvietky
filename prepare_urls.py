import json

with open('plant_urls.json', 'r', encoding='utf-8') as f:
    plant_urls = json.load(f)

urls = [item[2] for item in plant_urls]

with open('urls_list.txt', 'w', encoding='utf-8') as f:
    for url in urls:
        f.write(url + '\n')
