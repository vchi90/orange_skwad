//Function to color the words
var fill = d3.scaleOrdinal(d3.schemeCategory10);


//Get and format the words that come after a word
function getWords(base) {
    let all = words[base];
    let keys = Object.keys(all);
    let lst = [];
    let total = 0;

    //Limit the number of words to 20
    if (keys.length > 20) {
        random(keys);
        keys = keys.slice(0,20);
    }

    //Total count of words
    keys.forEach(function(key) {
        total += all[key];
    })

    let i = 0; //For the colors
    //Create a list of objects (because d3 cloud takes in a list of objs)
    keys.forEach(function(key) {
        let size = Math.pow(all[key] / total,.25) * 100; //Scale according to size, "curve" the data so less common words aren't tiny
        let size1 = Math.pow(all[key] / total,.40) * 100 //Scale for the donut chart
        let color = i;
        i+=1;
        lst.push({text:key, size:size, size1: size1, color: fill(color)})
    })

    return lst;
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
