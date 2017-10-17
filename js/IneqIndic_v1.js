function ineqindic (selectedIndic,ISO,allIsoIndicIneq){

	//size inequality country squares
	var sizeSquare=10;

	//remove previous chart
	ineqIndic.selectAll("*").remove();

	//define dimension of indicator
	var indicatorDim;
	indicatorList.forEach(function(d){
		if(selectedIndic==d.code)
			indicatorDim=d.Dimension;
	})

	
	//Add new svg 
	ineqIndic
      .attr("width", width )
      .attr("height", 2*width/3 )
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");
      

    //add info text


	ineqIndic.append("text")
		.attr("class","tempBox")
	    .attr("x", 0.25*marginRight)
	    .attr("y", 2*marginTop)
	    .attr("dy", ".35em")
	    .attr("text-anchor", "start")
	    .style("font", "300 italic 1vw TheSerif")
	    .style("fill","#78869f" )
	    .text("Most inequal");
	
	ineqIndic.append("text")
		.attr("class","tempBox")
	    .attr("x", 0.25*marginRight)
	    .attr("y", 2*width/3 - marginBottom/2)
	    .attr("dy", ".35em")
	    .attr("text-anchor", "start")
	    .style("font", "300 italic 1vw TheSerif")
	    .style("fill","#78869f" )
	    .text("Least inequal");

	ineqIndic.append("image")
		.attr("class","tempBox")
		.attr("x",0.5*marginRight)
		.attr("y",2*marginTop)
		//.attr("width",2*marginRight)
		.attr("height",2*width/3 - marginBottom/2-2*marginTop)
		.attr("xlink:href", "icons/arrow2.svg");


    //Prepare data
    var ineqData=[];
    allIsoIndicIneq.forEach(function(d){
		if((d.variable1!=d.variable))
			ineqData.push(d);
	})

    //define which type of inequalities are available
    var listIneqIndi=[];
	ineqData.forEach(function(d){
		var toPush=d.typeIneq;

		listIneqIndi.forEach(function(k){
			if(d.typeIneq==k){
				toPush="not";
			}
		})
		if (toPush!="not"&& toPush!="average")
			listIneqIndi.push(toPush)
	})

	//Define Scales
	var ordinalScale = d3.scaleBand()
		.domain(listIneqIndi)
		.range([3*marginLeft,width-marginRight]);

	var linearScale = d3.scaleLinear()
		.domain([0,1])
		.range([2*width/3-marginBottom,3*marginTop]);





	//Add line selected country
	var line = d3.line()
    	.x(function(d, i) { return ordinalScale(d.typeIneq) + sizeSquare/2; }) // set the x values for the line generator
    	.y(function(d) { 
		    	return linearScale(d.normalized) + sizeSquare/2;
		}) // set the y values for the line generator 
    	//.curve(d3.curveMonotoneX);
    	.curve(d3.curveLinear)
	
	ineqIndic.append("path")
    	.datum(ineqData.filter(function(d) { return d.ISO == ISO })) 
    	.attr("class", "line") // Assign a class for styling 
    	.attr("d", line)
    	.style("stroke", colorScale(indicatorDim))
    	.style("stroke-width","0.5px")
        .style("stroke-dasharray", ("6, 3"))  
    	.style("fill","none");


	//Draw country values for this inequality Type
	ineqIndic.selectAll()
	    .data(ineqData)
	    .enter()
	    .append("rect")
	    .attr("class",function(d) {
			return d.ISO +" "+d.typeIneq;
	    })
	    .attr("x", function(d) {
			if(ISO==d.ISO)
			return ordinalScale(d.typeIneq)-2;
				else
			return ordinalScale(d.typeIneq);
	    })
	    .attr("y", function(d) {
			if(ISO==d.ISO)
	    	return linearScale(d.normalized)-2;
	    		else
	    	return linearScale(d.normalized);
	    })
		.attr("height",function(d){
			if(ISO==d.ISO)
				return sizeSquare+4;
			else
				return sizeSquare;
		})
		.attr("width",function(d){
			if(ISO==d.ISO)
				return sizeSquare+4;
			else
				return sizeSquare;
		})
		.attr("fill",function (d){
			if(ISO==d.ISO)
				return "#4A4A4A";
			else
				return colorScale(indicatorDim);
		})
		.style('opacity',function (d){
			if(ISO==d.ISO)
				return 1;
			else
				return 0.25;
		})


	var ineqIcons = ineqIndic.selectAll("g.ineq")
		.data(listIneqIndi)
		.enter()
		.append("g")
		.attr("class","ineqIcons")
		.attr("transform",function(d){
			return "translate("+ordinalScale(d)+ ","+ (marginTop)+ ")"
		});


	ineqIcons.append("image")
		.attr("x",-10)
		.attr("y",0)
		.attr("width",30)
		.attr("xlink:href", function(d){
				var key=d;
				var url="icons/"+key+".svg";
	    		return url;	
	    })
		.on("mouseover",function(d){
			document.getElementById("tooltipIneqIcons").innerHTML="Definition";
		})
		.on("mouseout",function(d){
			document.getElementById("tooltipIneqIcons").innerHTML="";
		});



}