import json
word = {}
with open("data.csv","r")as f:
    for l in f.read().lower().split("\n"):
        
        w=[w for w in" ".join(w for w in l.split(" ") if w and "http" not in w and "www" not in w).replace("."," ").replace("“"," ").replace(":"," ").replace("?"," ").replace(","," ").replace(";"," ").replace("\""," ").replace("…"," ").replace("!"," ").replace("—"," ").replace("-"," ").replace("”"," ").replace("&amp","and").replace("’","'").replace("‘","'").replace("("," ").replace(")"," ").split(" ")if w]
        for i in range(len(w)):
            
            while "\\u" in w[i]:
                w[i]=w[i][:w[i].find("\\u")]+" "+w[i][w[i].find("\\u")+6:]
                print(w[i])
            if w[i][0]=="'":
                w[i]=w[i][1:]
            if w[i] and w[i][-1]=="'":
                w[i]=w[i][:-1]
        w=[wr for wr in w if wr]
        for i in range(len(w)):
            if w[i] in word:
                if w[(i+1)%len(w)] in word[w[i]]:
                    word[w[i]][w[(i+1)%len(w)]]+=1
                else:
                    word[w[i]][w[(i+1)%len(w)]]=1
            else:
                word[w[i]]={w[(i+1)%len(w)]:1}
with open("static/data.json","w") as f:
    f.write(json.dumps(word))
