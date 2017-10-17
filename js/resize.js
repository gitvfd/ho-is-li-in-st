/** SET main variables for the visualisation**/
d3.select(window).on('resize', resize);

function resize() {
    // adjust things when the window size changes
    width = document.getElementById('page').offsetWidth;
    height = width /3;

    // update projection
    projection
        .translate([width/ 2, width/3/2])
        .scale(width/8);

    // resize the map container
    d3.select("#mapVisualisation").select("svg")
        .attr("width",width)
        .attr("height",height);


    // resize the map
    d3.select("#mapVisualisation").selectAll('path').attr('d', path);
}

