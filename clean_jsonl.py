import json, os, sys

with open(sys.argv[1]) as in_f, open(sys.argv[2], "w") as out_f:
    for line in in_f:
        page = json.loads(line)
        # url = page["response"]["url"]
        # html = page["result"]["html"]
        strings = page["result"].split("\n")
        #print(strings)
        new_strings = []
        for s in strings:
            s = s.strip()
            if s:
                new_strings.append(s)
        #print(new_strings)
        page["result"] = "\n".join(new_strings)
        if not page["result"]:
            continue
        #print(page["result"])
        out_f.write(json.dumps(page) + '\n')
