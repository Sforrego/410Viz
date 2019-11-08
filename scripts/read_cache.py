import json

def read_file(file_path):
    with open(file_path,'r') as f:
        data = json.load(f)
    return data


if __name__ == '__main__':
    file = 'cache/atom.json'
    data = read_file(file)
    print(data["0"])
