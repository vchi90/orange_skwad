import json
word = {}
with open("data.csv","r")as f:
    for l in f.read().lower().split("\n"):
        
        w=[w for w in" ".join(w for w in l.split(" ") if w and "http" not in w).replace("."," ").replace("“"," ").replace(":"," ").replace("-"," ").replace("?"," ").replace(","," ").replace(";"," ").replace("\""," ").replace("…"," ").replace("!"," ").replace("—"," ").replace("”"," ").replace("&amp","and").replace("’","'").replace("‘","'").split(" ")if w]
        for wrd in w:
            while "\\u" in wrd:
                wrd = wrd[:wrd.find("\\u")]+" "+wrd[wrd.find("\\u")+6:]
        for i in range(len(w)):
            if w[i] in word:
                if w[(i+1)%len(w)] in word[w[i]]:
                    word[w[i]][w[(i+1)%len(w)]]+=1
                else:
                    word[w[i]][w[(i+1)%len(w)]]=1
            else:
                word[w[i]]={w[(i+1)%len(w)]:1}
with open("static/data.json","w+") as f:
    f.write(json.dumps(word))
