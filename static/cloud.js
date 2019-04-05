//Function to color the words
var fill = d3.scaleOrdinal(d3.schemeCategory10);

//Sample words
var words = ["You don't know about me without you have read a book called The Adventures of Tom Sawyer but that ain't no matter.",
    "Wot the new mop like key hop yup"];

//Create the svg element
var svg0 = d3.select('.svgcontainer').append('svg').
    attr("width",500).
    attr("height", 500).
    append("g")
    .attr("transform","translate(250,250)"); //The cloud initially is centered at 0,0 top left, but we want to center on canvas

function draw(wordlist) {
    var cloud = svg0.selectAll("g text").
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

function getWords(i) {
    return words[i]
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
    draw(words1)
}

var words1 = getWords(0)
show();
