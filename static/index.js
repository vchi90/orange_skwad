var fill = d3.scale.category20();

var words = "You don't know about me without you have read a book called The Adventures of Tom Sawyer but that ain't no matter.";

var svg = d3.select('body').append('svg').
    attr("width",500).
    attr("height", 500).
    append("g")
    .attr("transform","translate(250,250)");

function draw(words) {
    var cloud = svg.selectAll("g text").
	data(words, function(d) { return d.text; });
    cloud.enter().append("text").style("font-family", "Impact")
    .style("fill", function(d, i) { return fill(i); })
    .attr("text-anchor", "middle")
    .attr('font-size', 1)
	.text(function(d) { return d.text; })
    .on("click", function(d) {
	show();
    });

//Entering and existing words
cloud
    .transition()
    .duration(600)
    .style("font-size", function(d) { return d.size + "px"; })
    .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .style("fill-opacity", 1);

//Exiting words
cloud.exit()
    .transition()
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

words = getWords();

var show = function() {
    d3.layout.cloud().size([500, 500])
                .words(words)
                .padding(5)
                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
}

show();
