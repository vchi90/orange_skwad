//Function to color the words
var fill = d3.scaleOrdinal(d3.schemeCategory10);


//Get and format the words that come after a word
function getWords(words,base) {
    let all = words[base];
    let keys = Object.keys(all);
    let lst = [];
    let total = 0;

    //Limit the number of words to 20
    if (keys.length > 40) {
        keys.sort(function(x,y) {
			return all[y]-all[x];
		});
        keys = keys.slice(0,40);
    }

    //Total count of words
    keys.forEach(function(key) {
        total += all[key];
    })

    let i = 0; //For the colors
    //Create a list of objects (because d3 cloud takes in a list of objs)
    keys.forEach(function(key) {
        let size = Math.pow(all[key] / total,.25) * 75; //Scale according to size, "curve" the data so less common words aren't tiny
        let size1 = Math.pow(all[key] / total,1) * 100 //Scale for the donut chart
        let color = i;
		let pct = "" + ((all[key] / total)*100);
		pct = pct.substring(0,3).replace(/^\.+|\.+$/g, '') + '%';
        i+=1;
        lst.push({text:key, size:size, size1: size1, color: fill(color), pct:pct})
    });

    return lst;
}

var mostPopular = function(allwords) {
    let words = Object.keys(allwords);
    words.sort(function(x,y) {
	let count1 = 0;
	let wordsinwords = Object.keys(x)
	for (let i = 0; i < wordsinwords.length; i++) {
	    count1 += x[wordsinwords[i]]
	}

	let count2 = 0;
	let wordsinwords2 = Object.keys(y)
	for (let i = 0; i < wordsinwords2.length; i++) {
	    count2 += y[wordsinwords2[i]]
	}

	return -1*count2+count1;



    })
    return words.slice(0,10)

}

//Scramble an array
function random(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let val = array[j];
    array[j] = array[i];
    array[i] = val
  }
}
