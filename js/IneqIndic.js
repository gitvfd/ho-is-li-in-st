function ineqindic (selectedIndic,ISO,allIsoIndicIneq){

	//size inequality country squares
	var sizeSquare=15;

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
      .attr("height", width/2 )
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
	    .text("Least unequal");
	
	ineqIndic.append("text")
		.attr("class","tempBox")
	    .attr("x", 0.25*marginRight)
	    .attr("y", width/2 - marginBottom/2)
	    .attr("dy", ".35em")
	    .attr("text-anchor", "start")
	    .style("font", "300 italic 1vw TheSerif")
	    .style("fill","#78869f" )
	    .text("Most unequal");

	ineqIndic.append("image")
		.attr("class","tempBox")
		.attr("x",0.5*marginRight)
		.attr("y",2*marginTop)
		.attr("width",(2*width/3 - marginBottom/2-2*marginTop)/8)
		.attr("height",width/2 - marginBottom/2-2*marginTop)
		.attr("xlink:href", "icons/arrow2.svg");


    //Prepare data
    var ineqData=[];
    allIsoIndicIneq.forEach(function(d){
		var refParent;
		relationshipList.forEach(function(f){
			if(d.variable==f.variable){refParent=f.parents;}
				
		})
		if((refParent!=d.variable))
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


    //define if inequalities are available for selected country
   var listIneqIndiCou=[];

    var listineqCountry = ineqData.filter(function(d){return d.ISO==ISO});
	
	listineqCountry.forEach(function(d){
		var toPush=d.typeIneq;

		listIneqIndiCou.forEach(function(k){
			if(d.typeIneq==k){
				toPush="not";
			}
		})
		if (toPush!="not"&& toPush!="average")
			listIneqIndiCou.push(toPush)
	})

	//Define Scales
	var ordinalScale = d3.scaleBand()
		.domain(listIneqIndi)
		//.range([3*marginLeft,width-marginRight]);
		.range([3*marginLeft+width/2-listIneqIndi.length*width/16,width/2+listIneqIndi.length*width/16]);

	var linearScale = d3.scaleLinear()
		.domain([0,1])
		.range([width/2-marginBottom,3*marginTop]);





	//Add line selected country
	var line = d3.line()
    	.x(function(d, i) { return ordinalScale(d.typeIneq) + sizeSquare/2; }) // set the x values for the line generator
    	.y(function(d) { 
		    	return linearScale(d.normalized) + sizeSquare/4;
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
			return ordinalScale(d.typeIneq)-3;
				else
			return ordinalScale(d.typeIneq);
	    })
	    .attr("y", function(d) {
			if(ISO==d.ISO)
	    	return linearScale(d.normalized);
	    		else
	    	return linearScale(d.normalized);
	    })
		.attr("height",function(d){
			if(ISO==d.ISO)
				return sizeSquare/3;
			else
				return sizeSquare/3;
		})
		.attr("width",function(d){
			if(ISO==d.ISO)
				return sizeSquare+6;
			else
				return sizeSquare;
		})
		.attr("fill",function (d){
			var tempFill=listIneqIndiCou.indexOf(d.typeIneq)
			if (tempFill==-1)
				return "#b7b7b7";
			else if(ISO==d.ISO)
				return "#476991";
			else
				return colorScale(indicatorDim);
		})
		.style('opacity',function (d){
			if(ISO==d.ISO)
				return 1;
			else
				return 0.25;
		})
		.on("mouseover",function(d){
	    	d3.select(this)
				.style("opacity",0.5);

			var xPosition = d3.event.pageX+20;
			var yPosition = d3.event.pageY+15;

			if (yPosition>window.innerHeight-200)
				yPosition=yPosition-100;

			var indicName;
			var indicMeasure;
			indicatorList.forEach(function(k){
				var refParent;
				relationshipList.forEach(function(f){
					if(d.variable==f.variable){refParent=f.parents;}
						
				})
				if(refParent==k.code){
					indicName=k.Indicator;
					indicMeasure=k.Measure;

				}
			})

			var countryName;
			correspondanceISO.forEach(function(k){

				if(d.ISO==k.ISO){
					countryName=k.country;}

			})

		     d3.select("#countryName")
		        .text(countryName);


		     d3.select("#indicatorName")
		        .text(indicName);
		        
		        
		    d3.select("#indicatorValue")
		        .text(f(d.value));


		    d3.select("#indicatorMeasure")
		        .text(d.desc);

			d3.select("#avgIndicTooltip")
		        .style("left", xPosition + "px")
		        .style("top", yPosition + "px") ;

			d3.select("#avgIndicTooltip").classed("hidden", false);
	    })
	    .on("mouseout",function(d){
				d3.select(this)
					.style("opacity",  function (d){
						if(ISO==d.ISO)
							return 1;
						else
							return 0.25;
					})
	            
	            //Hide the tooltip
				d3.select("#avgIndicTooltip").classed("hidden", true);	            

		})
			.on("click",function(d){
				//document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value=d.ISO;
				document.getElementById("country_dropdown").value=d.ISO;
				displayIneq(d.ISO);
			});


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
		.attr("height",30)
		.attr("xlink:href", function(d){
				var key=d;
				var url="icons/"+key+".svg";
	    		return url;	
	    })
		.on("mouseover",function(d){

			var xPosition = d3.event.pageX+20;
			var yPosition = d3.event.pageY+15;

			if (yPosition>window.innerHeight-200)
				yPosition=yPosition-100;
					
			var ineqName;
			var ineqDef;
			var ineqMessage;
			inequalityList.forEach(function(k){
				if(d==k.typeIneq){
					ineqName=k.nameIneq
					ineqDef=k.def;
					ineqMessage=k.keyMessage;

				}
			})


		    d3.select("#inequalityType")
		        .text(ineqName);


		    d3.select("#inequalityDef")
		        .text(ineqDef);


		    d3.select("#inequalityMessage")
		        .text(ineqMessage);

			
		        
			d3.select("#tooltipIneqIcons")
		        .style("left", xPosition + "px")
		        .style("top", yPosition + "px") ;

			d3.select("#tooltipIneqIcons").classed("hidden", false);
		})
		.on("mouseout",function(d){
				d3.select("#tooltipIneqIcons").classed("hidden", true);	
		});


}