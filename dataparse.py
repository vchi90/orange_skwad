import json
word = {}
with open("data.csv","r")as f:
    for l in f.read().split("\n"):
        w = [w for w in l.split(" ") if w and(4>len(w)or"http"!=w[:4])]
        for i in range(len(w)):
            if w[i] in word:
                word[w[i]].append(w[(i+1)%len(w)])
            else:
                word[w[i]]=w[(i+1)%len(w)]
