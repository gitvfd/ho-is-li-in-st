function heatMap(listIneq,listVariable,IsoIneq){
	heatmap.selectAll("*").remove()


	gridSize = Math.floor((width-marginLeft -marginRight) /(listVariable.length+2));
      
    var colorScale = d3.scaleLinear()//.scaleSequential(d3.interpolateReds)
          .domain([0, 1])
          .range(["#f7f7f7", "#F8282E"]);


	listVariable=listVariable.sort(function(a,b){return a.localeCompare(b);});
	var scaleIndic=d3.scalePoint().domain(listVariable).range([0,listVariable.length]);
	var scaleIneq=d3.scalePoint().domain(listIneq).range([0,listIneq.length]);


	heatmap
      .attr("width", width )
      .attr("height", 1.25*listIneq.length*width /listVariable.length )
      .append("g")
      .attr("transform", "translate(" + marginLeft + "," + 0 + ")");

	var ineqIcons = heatmap.selectAll("g.ineq")
		.data(listIneq)
		.enter()
		.append("g")
		.attr("class","ineqIcons")
		.attr("transform",function(d){
			return "translate("+marginLeft+ ","+ (gridSize + scaleIneq(d) * gridSize )+ ")"
		});

	ineqIcons.append("image")
		.attr("x",0.1*gridSize)
		.attr("y",0.1*gridSize)
		.attr("width",0.8*gridSize)
		.attr("height",0.8*gridSize)
	    .attr("xlink:href", function(d){
				var key=key=d;
				var url="icons/"+key+".svg";
	    		return url;	
	    })
		.on("mouseover",function(d){
				var xPosition = d3.event.pageX+20;
				var yPosition = d3.event.pageY+15;

				if (yPosition>window.innerHeight-200)
					yPosition=yPosition-100;



			    d3.select("#inequalityType")
			        .text(d);


			    d3.select("#inequalityDef")
			        .text("Definition");

				d3.select("#tooltipIneqIcons")
			        .style("left", xPosition + "px")
			        .style("top", yPosition + "px") ;

				d3.select("#tooltipIneqIcons").classed("hidden", false);


		})
		.on("mouseout",function(d){
		    //Hide the tooltip
			d3.select("#tooltipVarIcons").classed("hidden", true);	       
		});


	var variableIcons = heatmap.selectAll("g.variable")
		.data(listVariable)
		.enter()
		.append("g")
		.attr("class","varIcons")
		.attr("transform",function(d,i){
			return "translate("+ (marginLeft + gridSize + scaleIndic(d) * gridSize ) + ","+ 0+ ")"
		});

	variableIcons.append("image")
			.attr("x",0.1*gridSize)
			.attr("y",0.1*gridSize)
			.attr("width",0.8*gridSize)
			.attr("height",0.8*gridSize)
		    .attr("xlink:href", function(d){
		    	var test="";
		    		dimensionList.forEach(function(k){
		    			var test2=d.substr(0, 2);

		    			if(k.code==test2) 
		    				test= k.Dimension;
		    		})
					var key=test.replace(/ /g,"");
					var url="icons/"+key+".png";
		    		return url;	
		    })
			.on("mouseover",function(d){
					var xPosition = d3.event.pageX+20;
					var yPosition = d3.event.pageY+15;

					if (yPosition>window.innerHeight-200)
						yPosition=yPosition-100;

					var indicName;
					var indicMeas;
					indicatorList.forEach(function(k){
						if(d==k.code){
							indicName=k.Indicator;
							indicMeas=k.Measure;

						}
					})

				    d3.select("#heatIndicatorName")
				        .text(indicName);


				    d3.select("#heatIndicatorDef")
				        .text(indicMeas);

					d3.select("#tooltipVarIcons")
				        .style("left", xPosition + "px")
				        .style("top", yPosition + "px") ;

					d3.select("#tooltipVarIcons").classed("hidden", false);


			})
			.on("mouseout",function(d){
			    //Hide the tooltip
				d3.select("#tooltipVarIcons").classed("hidden", true);	       
			});

		    
	/**   var timeLabels = svg.selectAll(".timeLabel")
      .data(times)
      .enter().append("text")
        .text(function(d) { return d; })
        .attr("x", function(d, i) { return i * gridSize; })
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + gridSize / 2 + ", -6)")
        .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

	**/

	var cards = heatmap.selectAll(".ineq")
          .data(IsoIneq);

	cards.append("title");              
	cards.enter().append("rect")
	  	.attr("x", function(d) { return marginLeft + gridSize +(scaleIndic(d.variable1) * gridSize); })
	  	.attr("y", function(d) { return gridSize +(scaleIneq(d.typeIneq ) * gridSize);})
	  	.attr("rx", 4)
	  	.attr("ry", 4)
	  	.attr("class", function(d){return d.typeIneq})
	  	.attr("width", gridSize)
	  	.attr("height", gridSize)
	  	.style("fill", function(d){return colorScale(parseFloat(d.normalized))})
		.on("mouseover",function(d){
			d3.select(this).style("opacity",0.5)//.attr("width",gridSize*1.2).attr("height",gridSize*1.2)
			//document.getElementById("tooltipHeatValue").innerHTML=parseFloat(d.normalized);


				var xPosition = d3.event.pageX+20;
				var yPosition = d3.event.pageY+15;

				if (yPosition>window.innerHeight-200)
					yPosition=yPosition-100;

				var indicName;
				indicatorList.forEach(function(k){
					if(d.variable==k.code)
						indicName=k.Indicator;
				})

				var indicMeasure;
				indicatorList.forEach(function(k){
					if(d.variable==k.code)
						indicMeasure=k.Measure;
				})

				var indicName;
				dimensionList.forEach(function(k){

					if(d.variable==k.code){
						indicName=k.Indicator;}

				})


			     d3.select("#heatIneqType")
			        .text(d.typeIneq);
			        
			        
			    d3.select("#heatIndName")
			        .text(indicName);


			    d3.select("#heatValue")
			        .text(parseFloat(d.value));

				d3.select("#tooltipHeatValue")
			        .style("left", xPosition + "px")
			        .style("top", yPosition + "px") ;

				d3.select("#tooltipHeatValue").classed("hidden", false);


		}).on("mouseout",function(d){

			d3.select(this).style("opacity",1)//.attr("width",gridSize).attr("height",gridSize)
			//document.getElementById("tooltipHeatValue").innerHTML='';

		    //Hide the tooltip
			d3.select("#tooltipHeatValue").classed("hidden", true);	       
		});






////////////
// LEGEND //  
////////////

//Append a defs (for definition) element to your SVG
var defs = heatmap.append("defs");

//Append a linearGradient element to the defs and give it a unique id
var linearGradient = defs.append("linearGradient")
    .attr("id", "linear-gradient");

//Set the color for the start (0%)
linearGradient.append("stop") 
    .attr("offset", "0%")   
    .attr("stop-color", "#f7f7f7"); //light blue

//Set the color for the end (100%)
linearGradient.append("stop") 
    .attr("offset", "100%")   
    .attr("stop-color", "#F8282E"); //dark blue
//Draw the rectangle and fill with gradient

heatmap.append("rect")
	.attr("width", 0.6*width)
	.attr("height", gridSize/2)
      .attr("x", 0.2*width)
      .attr("y", 1.25*listIneq.length*width /listVariable.length -gridSize/2 )
	.style("fill", "url(#linear-gradient)");

//Append title
heatmap.append("text")
	.attr("class", "legendTitle")
	.attr("x", 0.2*width)
	.attr("y", 1.25*listIneq.length*width /listVariable.length - gridSize/2 - 5)
	.style("text-anchor", "middle")
	.text("Most inequal");

heatmap.append("text")
	.attr("class", "legendTitle")
	.attr("x", 0.8*width)
	.attr("y", 1.25*listIneq.length*width /listVariable.length - gridSize/2 - 5)
	.style("text-anchor", "middle")
	.text("Least inequal");
}