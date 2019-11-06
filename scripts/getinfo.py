#https://api.github.com/repos/:owner/:repo/pulls?state=all
from github import Github
from math import inf
import time
def get_pulls(repo_name="atom/atom", npulls=inf):
    #uses my personal token to retrieve first n pulls from a specific repository
    #default is getting all pulls from atom
    token =  "5632ee88659debde36952977d6bc8b3781eb95b0"

    g = Github(login_or_token=token, per_page=100)
    r = g.get_repo(repo_name)

    pulls = []
    for index,pull in enumerate(r.get_pulls('all')): # , state='open' etc
        if index == npulls:
            break
        pulls.append(pull)

    return pulls


if __name__ == '__main__':
    #example
    start = time.time()
    pulls = get_pulls()
    print(time.time()-start)
    print(pulls[0].base.label)
    print(pulls[0].user.login)
    print(pulls[0].created_at)
    print(pulls[0].repo.size)
