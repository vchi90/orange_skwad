//Function to color the words
var fill = d3.scaleOrdinal(d3.schemeCategory10);

//Sample words
var words = "You don't know about me without you have read a book called The Adventures of Tom Sawyer but that ain't no matter.";

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

var width = 250;
var height = 250;
var svgwidth = 300;
var svgheight = 300;
var thickness = 40;
var duration = 750;

var radius = width/2;
var color = d3.scaleOrdinal(d3.schemeCategory10);

var svg1 = d3.select(".svgcontainer2")
    .append('svg')
    .attr('class', 'pie')
    .attr('width', svgwidth)
    .attr('height', svgheight)
    .append('g')
    .attr('transform', 'translate(' + (svgwidth/2) + ',' + (svgheight/2) + ')'); //Moving the chart from top left of container to the center

//Function to get/display a section of the arc for later
var arc = d3.arc()
    .innerRadius(radius - thickness)
    .outerRadius(radius);

var pie = d3.pie()
    .value(function(d) { return (Math.random() * 100); }); //For now, assign a random value to the elements (the portion of the whole pie it takes up)


svg1.selectAll('path')
    .data(pie(getWords())) //Enter the data
    .enter()
    .append("g")
    .on("mouseover", function(d) {
        //console.log("wepy")
        d3.select(this).append("g").attr("class","text-group") //Each element of the donut chart create a next "textgroup" for accessibility
            .append("text")
            .attr("class", "name-text")
            .text(d.data.text)
            .attr('text-anchor', 'middle')
	
    })
    .on("mouseout", function(d) {
        d3.select(this)
            .select(".text-group").remove(); //Delete the entire text group made above ^^^
    })
    .append('path')
    .attr('d', arc) //The arc
    .attr('fill', (d,i) => color(i))
    .on("mouseover", function(d) {
	d3.select(this)
	    .transition()
	    .duration(200)
	    .ease(d3.easeBounce)
	    .attr('d', d3.arc().innerRadius(radius-thickness).outerRadius(radius+4));
    })
    .on("mouseout", function(d) {
		d3.select(this)
	    .transition()
	    .duration(200)
	    .ease(d3.easeBounce)
	    .attr('d', d3.arc().innerRadius(radius-thickness).outerRadius(radius));
    });
