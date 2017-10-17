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
		    .attr("xlink:href", function(d){
					var key=key=d;
					var url="icons/"+key+".svg";
		    		return url;	
		    })
		.on("mouseover",function(d){
			document.getElementById("tooltipIneqIcons").innerHTML="Definition";
		})
		.on("mouseout",function(d){
			document.getElementById("tooltipIneqIcons").innerHTML="";
		});;


	var variableIcons = heatmap.selectAll("g.variable")
		.data(listVariable)
		.enter()
		.append("g")
		.attr("class","varIcons")
		.attr("transform",function(d,i){
			return "translate("+ (marginLeft + gridSize + scaleIndic(d) * gridSize ) + ","+ 0+ ")"
		})
		.on("mouseover",function(d){
			document.getElementById("tooltipVarIcons").innerHTML=d;
		})
		.on("mouseout",function(d){
			document.getElementById("tooltipVarIcons").innerHTML="";
		});

	variableIcons.append("image")
			.attr("x",0.1*gridSize)
			.attr("y",0.1*gridSize)
			.attr("width",0.8*gridSize)
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
			document.getElementById("tooltipHeatValue").innerHTML=parseFloat(d.normalized);
		}).on("mouseout",function(d){
			document.getElementById("tooltipHeatValue").innerHTML='';
		});
             

//	console.log(listIneq)
}