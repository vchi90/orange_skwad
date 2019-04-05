var width = 250;
var height = 250;
var svgwidth = 300;
var svgheight = 300;
var thickness = 40;
var duration = 750;

var radius = width/2;
var color = d3.scaleOrdinal(d3.schemeCategory10);


var drawDonut = function(words) {
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
        .value(function(d) { return 10; }); //For now, assign a random value to the elements (the portion of the whole pie it takes up)

    var donutPath = svg1.selectAll('path')
        .data(pie(words)) //Enter the data
        .enter()
        .append("g")
        .on("mouseover", function(d) {
            //console.log("wepy")
            d3.select(this).append("g").attr("class","text-group") //Each element of the donut chart create a next "textgroup" for accessibility
                .append("text")
                .attr("class", "name-text")
                .text(d.data.text)
                .attr('text-anchor', 'middle');

        })
        .on("mouseout", function(d) {
            d3.select(this)
                .select(".text-group").remove(); //Delete the entire text group made above ^^^
        })
        .append('path')

    donutPath.attr('d', arc) //The arc
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
}

var updateDonut = function(newWords) {
    d3.select('.svgcontainer2').select('svg').remove(); //Delete the old chart
    drawDonut(newWords); //Draw the new chart
}
drawDonut(getWords(0));