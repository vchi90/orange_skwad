import json
word = {}
with open("data.csv","r")as f:
    for l in f.read().lower().split("\n"):

        w=[w for w in" ".join(w for w in l.split(" ") if w and "http" not in w and "www" not in w).replace("."," ").replace("“"," ").replace(":"," ").replace("?"," ").replace(","," ").replace(";"," ").replace("\""," ").replace("…"," ").replace("!"," ").replace("—"," ").replace("-"," ").replace("”"," ").replace("&amp","and").replace("’","'").replace("‘","'").replace("("," ").replace(")"," ").split(" ")if w]
        for i in range(len(w)):
            for ch in range(len(w[i])):
                if ord(w[i][ch])>128:
                    w[i]=w[i][:ch]+" "+w[i][ch+1:]
            if w[i][0]=="'":
                w[i]=w[i][1:]
            if w[i] and w[i][-1]=="'":
                w[i]=w[i][:-1]
        w=[wrr for wrr in" ".join(wr for wr in w if wr).split(" ")if wrr]
        for i in range(len(w)):
            if w[i] in word:
                if w[(i+1)%len(w)] in word[w[i]]:
                    word[w[i]][w[(i+1)%len(w)]]+=1
                else:
                    word[w[i]][w[(i+1)%len(w)]]=1
            else:
                word[w[i]]={w[(i+1)%len(w)]:1}
with open("static/data.js","w") as f:
    f.write("var words = " + json.dumps(word))
