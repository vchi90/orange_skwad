var cloudwidth = 750;
var cloudheight = 525;

//Create the svg element
var svg0 = d3.select('.svgcontainer').append('svg')
    .attr("width",cloudwidth)
    .attr("height", cloudheight)
    .append("g")
    .attr("transform",`translate(${cloudwidth/2},${cloudheight/2})`); //The cloud initially is centered at 0,0 top left, but we want to center on canvas

function draw(wordlist) {
    var cloud = svg0.selectAll("g text").
	   data(wordlist, function(d) { return d.text; });
    cloud.enter()
    //Format how the words look
        .append("text")
        .style("font-family", "Comic Sans MS")
        .style("fill", function(d, i) { return d.color; })
        .attr("text-anchor", "middle")
        .attr('font-size', function(d) { return d.size; })
	.text(function(d) { return d.text; })
        //Event listener for the individual svg elements of the words
        .on("click", function(d) {
	        show(d.text); //Call the show again, but with the new words
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

var show = function(prompt) {
    //Add to the chain of words shown
    let chain = document.getElementById("chain");
    let p = chain.children[0];
	let t = chain.children[1];
	p.innerHTML += t.innerHTML.length>0 ? t.innerHTML + ` <i class="fas fa-arrow-right"></i> ` : t.innerHTML;
    t.innerHTML = `${capitalize(prompt)}`;

    d3.json('/static/data.json').then(function(data) {
        let words = getWords(data,prompt)
        //Draw the cloud
        d3.layout.cloud().size([cloudwidth, cloudheight])
                .words(words)
                .padding(5)
                .rotate(function() { return Math.floor(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
        draw(words);

        //Draw the donut
        updateDonut(words);
    })
}

function capitalize(str)
{
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}
show('america');

var searchog = ()=>{
	src = document.getElementById("search");
	txt = src.value;
	d3.json('/static/data.json').then(function(data) {
		if(txt in data){
			let p = chain.children[0];
			let t = chain.children[1];
			p.innerHTML = "";
			t.innerHTML = "";
			show(txt);
		}else
			shaek();
	});
};

document.getElementById("searchgo").addEventListener("click", searchog);
document.getElementById("search").addEventListener("keypress", (e)=>{
//	console.log(e);
	if(e.key==="Enter")
		searchog();
});

var shaek = ()=>{
	console.log("shake")
	let frames =0;
	let c = document.getElementById("form");
	let vel=6;
	var shake = ()=>{
		if(frames<27)
			id=window.requestAnimationFrame(shake);
		else
			c.setAttribute("x",25);
		c.setAttribute("x",+c.getAttribute("x")+vel);
		vel-=(+c.getAttribute("x")-25)*.5;
		frames++;
		console.log(frames + ": " + c.getAttribute("x"));
	};
	shake();
};
