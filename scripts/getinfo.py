#https://api.github.com/repos/:owner/:repo/pulls?state=all
from github import Github  # https://buildmedia.readthedocs.org/media/pdf/pygithub/latest/pygithub.pdf
from math import inf
import time
#to do, get pulls within a time frame

def get_pulls(repo="atom/atom", n=inf):
    #uses my personal token to retrieve first n pulls from a specific repository
    #default is getting all pulls from atom
    token =  "5632ee88659debde36952977d6bc8b3781eb95b0"

    g = Github(login_or_token=token, per_page=1000)

    r = g.get_repo(repo)

    pulls = []
    object_pulls = r.get_pulls('all')

    start = time.time()
    for index,pull in enumerate(object_pulls): # , state='open' etc
        if index == n:
            break
        pulls.append(pull)
    print(time.time()-start)
    return pulls


if __name__ == '__main__':
    #example
    #takes like 2 mins to get every atom pull
    pulls = get_pulls(n=5)

    print(pulls[0].base.label)
    print(pulls[0].user.login)
    print(pulls[0].created_at)
    print(pulls[2].__dict__)
