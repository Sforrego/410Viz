from flask import jsonify
from scripts import create_cache, getinfo, read_cache
from datetime import datetime

def parse(repoURL, monthYear):
    monthYear = datetime.strptime(monthYear, "%m-%Y")
    # print(monthYear)
    filepath = 'scripts/cache/' + repoURL.split('/')[1] + '.json'
    devTable = {}
    try:
        cache = read_cache.read_file(filepath)
    except FileNotFoundError:
        pulls = getinfo.get_pulls(repo=repoURL, n=100)
        create_cache.create_file(pulls, filepath)
        cache = read_cache.read_file(filepath)
    for key in cache:
        if (cache[key]["created_at"] and cache[key]["merged_at"]):
            created = datetime.strptime(cache[key]["created_at"], "%Y-%m-%dT%H:%M:%SZ")
            merged = datetime.strptime(cache[key]["merged_at"], "%Y-%m-%dT%H:%M:%SZ")
            # print(created)
            # print(merged)
            if (merged.month == monthYear.month and merged.year == monthYear.year):
                dev = cache[key]["user"]["login"]
                if devTable.get(dev) == None:
                    devTable[dev] = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0}
                days = (merged - created).days
                # print(days)
                if days <= 1:
                    devTable[dev]["1"] += 1
                elif days <= 7:
                    devTable[dev]["2"] += 1
                elif days <= 30:
                    devTable[dev]["3"] += 1
                elif days <= 90:
                    devTable[dev]["4"] += 1
                elif days <= 180:
                    devTable[dev]["5"] += 1
                else:
                    devTable[dev]["6"] += 1
            else:
                print("wrong month")
        else:
            print("not found")
    print(devTable)
    devs = list(devTable.keys())
    devs.sort()
    devCounts = []
    for dev in devs:
        devCounts.append({"Developer": dev, "Count": sum(devTable[dev].values())})
    data = formatData(devTable)
    print(data)
    return jsonify({"devList": devs, "nameLength": len(max(devs, key=len)), "lineCount": devCounts, "data": data})

def formatData(data):
    formatted = []
    count = 0
    devs = list(data.keys())
    devs.sort()
    for dev in devs:
        count += 1
        for period in data[dev]:
            formatted.append({"Developer": str(count), "Period": period, "Value": str(data[dev][period]), "TotalValue": str(sum(data[dev].values()))})
    return formatted
