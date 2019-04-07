var width = 300;
var height = 300;
var svgwidth = 350;
var svgheight = 350;
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
        .value(function(d) { return d.size1; });

    var donutPath = svg1.selectAll('path')
        .data(pie(words)) //Enter the data
        .enter()
        .append("g")
        .on("mouseover", function(d) {
            //console.log("wepy")
            let g = d3.select(this).append("g").attr("class","text-group") //Each element of the donut chart create a next "textgroup" for accessibility

	    g.append("text")
                .attr("class", "name-text")
                .text(d.data.text)
                .attr('text-anchor', 'middle')
	    g.append("text")
		.attr("class","name-text")
		.text(d.data.pct)
		.attr("text-anchor","middle")
		.attr("y",20);

        })
        .on("mouseout", function(d) {
            d3.select(this)
                .select(".text-group").remove(); //Delete the entire text group made above ^^^
        })
	.on("click", function(d) {
	    show(d.data.text);
	})
        .append('path')

    donutPath.attr('d', arc) //The arc
        .attr('fill', function(d,i) {
            return d.data.color
        })
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
