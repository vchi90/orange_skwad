//Function to color the words
var fill = d3.scaleOrdinal(d3.schemeCategory10);

//Sample words
var words = "You don't know about me without you have read a book called The Adventures of Tom Sawyer but that ain't no matter.";

//Create the svg element
var svg = d3.select('.svgcontainer').append('svg').
    attr("width",500).
    attr("height", 500).
    append("g")
    .attr("transform","translate(250,250)"); //The cloud initially is centered at 0,0 top left, but we want to center on canvas

function draw(wordlist) {
    var cloud = svg.selectAll("g text").
	   data(wordlist, function(d) { return d.text; });
    cloud.enter()
    //Format how the words look
        .append("text")
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr('font-size', function(d) { return d.size; })
	    .text(function(d) { return d.text; })
        //Event listener for the individual svg elements of the words
        .on("click", function(d) {
	        show();
        });

    //Have a transition for when the cloud is redrawn/reloaded
    cloud.transition()
        .duration(600)
        .style("font-size", function(d) { return d.size + "px"; })
        .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .style("fill-opacity", 1);
    cloud.exit().transition()
        .duration(200)
        .style('fill-opacity', 1e-6)
        .attr('font-size', 1)
        .remove();
}

function getWords() {
    return words
            .replace(/[!\.,:;\?]/g, '')
            .split(' ')
            .map(function(d) {
                return {text: d, size: 10 + Math.random() * 60};
            })
}

var show = function() {

    d3.layout.cloud().size([500, 500])
                .words(words1)
                .padding(5)
                .rotate(function() { return Math.floor(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
}

var words1 = getWords()
show();
show(); //For some reason, calling it twice is needed because the rotations aren't applied in the first start call

//======================================DONUT CHART=================SHOULD PROBABLY BE IN ANOTHER FILE

// var width = 260;
// var height = 260;
// var thickness = 40;
// var duration = 750;
//
// var radius = width/2;
// var color = d3.scaleOrdinal(d3.schemeCategory10);
//
// var svg = d3.select(".svgcontainer2")
//     .append('svg')
//     .attr('class', 'pie')
//     .attr('width', width)
//     .attr('height', height)
//     .append('g')
//     .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')'); //Moving the chart from top left of container to the center
//
// //Function to get/display a section of the arc for later
// var arc = d3.arc()
//     .innerRadius(radius - thickness)
//     .outerRadius(radius);
//
// var pie = d3.pie()
//     .value(function(d) { return (Math.random() * 100); }) //For now, assign a random value to the elements (the portion of the whole pie it takes up)
//     .sort(null); //Show the data by greatest to least
//
// svg.selectAll('path')
//     .data(pie(getWords())) //Enter the data
//     .enter()
//     .append("g")
//     .append('path')
//     .attr('d', arc) //The arc
//     .attr('fill', (d,i) => color(i))
//     .each(function(d, i) { this._current = i; });
//
//
// svg.append('text')
//   .attr('text-anchor', 'middle')
//   .attr('dy', '.35em')
//   .text("Tweets");
