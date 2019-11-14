import json
from getinfo import get_pulls

def create_file(pulls,file_path):
    with open(file_path,'w+') as f:
        json_data = {}
        for index, pull in enumerate(pulls):
            json_data[index] = pull.raw_data
        json.dump(json_data,f)

if __name__ == '__main__':
    repo = 'atom/atom'
    pulls = get_pulls(repo=repo,n=5)
    create_file(pulls, 'cache/atom.json')
