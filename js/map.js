// SVG for usage bubbles

var map= d3.select("#mapVisualisation")
  .append('svg')
  .attr("width", widthMap)
  .attr("height", widthMap/3); //previously 2*height_usage/2

var projection = d3.geoRobinson()
            .center([0, 10])  //previously [0, 41]
            .scale(widthMap/8) //previously scale(width/2.2)
            .translate([widthMap/ 2, widthMap/3/2])
        	.precision(0.1);

var path = d3.geoPath()
               .projection(projection);

var worldMap=map.append("g")
	.attr("class", "world")
	.attr("id","countries")
  	.attr('width', width)
  	.attr('height', width/3);

d3.json("data/world.json", function(error, worldData) {
            worldMap.selectAll(".world")
                    .data(worldData.features)
                    .enter().append("path")
                    .attr("class", function(d){ return d.properties.ISO3_CODE; })
                    .attr("d", path)
  					        .on("click", clicked);
        

});

var centered;

function clicked(d) {
	// source: https://bl.ocks.org/mbostock/2206590
  	var x, y, k;

  	if (d && centered !== d) {
    	var centroid = path.centroid(d);
    	x = centroid[0];
    	y = centroid[1];
    	k = 4;
    	centered = d;
  	} else {
    	x = width / 2;
    	y = width /3 / 2;
    	k = 1;
    	centered = null;
  	}

 	worldMap.selectAll("path")
      	.classed("active", centered && function(d) { return d === centered; });
 	

    //source:https://stackoverflow.com/questions/27460534/keep-d3-objects-size-constant-on-map-while-zoom-in-out
  	worldMap.transition()
      	.duration(1000)
      	.attr("transform", "translate(" + width / 2 + "," + width/3 / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      	.style("stroke-width", 1.5 / k + "px");

    worldMap.selectAll("circle")
        .transition()
      	.duration(1000)
        .attr("r", function(d) {
            return scale(d.value)/k
        })
		.attr("stroke-width",3/k);
}