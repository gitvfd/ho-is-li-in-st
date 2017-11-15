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
	    .text("Perform better");

	ineqIndic.append("text")
		.attr("class","tempBox")
	    .attr("x", 1.0*marginRight)
	    .attr("y", width/4+ 0.8*marginBottom)
	    .attr("dy", ".35em")
	    .attr("text-anchor", "start")
	    .style("font", "300 italic 0.8vw TheSerif")
	    .style("fill","#78869f" )
	    .text("Equality in");


	ineqIndic.append("text")
		.attr("class","tempBox")
	    .attr("x", 1.0*marginRight)
	    .attr("y", width/4+ 1.2*marginBottom)
	    .attr("dy", ".35em")
	    .attr("text-anchor", "start")
	    .style("font", "300 italic 0.8vw TheSerif")
	    .style("fill","#78869f" )
	    .text("well-being");


	ineqIndic.append("text")
		.attr("class","tempBox")
	    .attr("x", 0.25*marginRight)
	    .attr("y", width/2 - marginBottom/2)
	    .attr("dy", ".35em")
	    .attr("text-anchor", "start")
	    .style("font", "300 italic 1vw TheSerif")
	    .style("fill","#78869f" )
	    .text("Perform worse");

	ineqIndic.append("image")
		.attr("class","tempBox")
		.attr("x",0.1*marginRight)
		.attr("y",2.5*marginTop)
		.attr("width",(2*width/3 - marginBottom/2-2*marginTop)/8)
		.attr("height",width/3)
		.attr("xlink:href", "icons/arrow2.svg")
		/**.on("mouseover",function(){

			var xPosition = d3.event.pageX+20;
			var yPosition = d3.event.pageY+15;

			if (yPosition>window.innerHeight-200)
				yPosition=yPosition-100;

			d3.select("#tooltipScaleExplanation")
		        .style("left", xPosition + "px")
		        .style("top", yPosition + "px") ;

			d3.select("#tooltipScaleExplanation").classed("hidden", false);
	    })
	    .on("mouseout",function(d){
	            
	            //Hide the tooltip
				d3.select("#tooltipScaleExplanation").classed("hidden", true);	            

		});**/


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

console.log(listIneqIndi.length)
	//Define Scales
	var interval= (width-4*marginLeft)/8;
	var markOne,markTwo;

	if(listIneqIndi.length==1){markOne=3;markTwo=4;}
	else if(listIneqIndi.length==2){markOne=3;markTwo=3;}
	else if(listIneqIndi.length==3){markOne=2;markTwo=3;}
	else if(listIneqIndi.length==4){markOne=2;markTwo=2;}
	else if(listIneqIndi.length==5){markOne=1;markTwo=2;}
	else if(listIneqIndi.length==6){markOne=1;markTwo=1;}
	else if(listIneqIndi.length==7){markOne=1;markTwo=0;}
	else if(listIneqIndi.length==8){markOne=0;markTwo=0;}


	var ordinalScale = d3.scaleBand()
		.domain(listIneqIndi)
		.range([3*marginLeft +markOne * interval,width-marginRight-markTwo * interval]);
		//.range([3*marginLeft+width/2-listIneqIndi.length*width/16,width/2+listIneqIndi.length*width/16]);

	var linearScale = d3.scaleLinear()
		.domain([0,1])
		.range([width/2-marginBottom,3*marginTop]);






ineqIndic.append("line")
		.attr("class","line")
	    .attr("x1", 0.1*width)
	    .attr("x2", 0.9* width)
	    .attr("y1", linearScale(0.5))
	    .attr("y2", linearScale(0.5))
    	.style("stroke", colorScale(indicatorDim))
    	.style("stroke-width","1px")
        .style("stroke-dasharray", ("5, 5"))  
    	.style("fill","none");
	



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
    	.style("stroke-width","0.25px")
        .style("stroke-dasharray", ("2, 2"))  
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
			return ordinalScale(d.typeIneq);
	    })
	    .attr("y", function(d) {
	    	return linearScale(d.normalized)-sizeSquare/6;
	    })
		.attr("height",function(d){
				return sizeSquare/3;
		})
		.attr("width",function(d){
				return sizeSquare;
		})
		.attr("fill",function (d){
			var tempFill=listIneqIndiCou.indexOf(d.typeIneq)
			if (tempFill==-1)
				return "#b7b7b7";
			else
				return colorScale(indicatorDim);
		})
		.style('opacity',function (d){
				return 0.25;
		})
		.on("mouseover",function(d){
	    	d3.select(this)
				.style("opacity",0.85);

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
		        .text("");


		    d3.select("#indicatorMeasure")
		        .text(d.desc);

			d3.select("#avgIndicTooltip")
		        .style("left", xPosition + "px")
		        .style("top", yPosition + "px") ;

			d3.select("#avgIndicTooltip").classed("hidden", false);
	    })
	    .on("mouseout",function(d){
				d3.select(this)
					.style("opacity",0.25)
	            
	            //Hide the tooltip
				d3.select("#avgIndicTooltip").classed("hidden", true);	            

		})
			.on("click",function(d){
				//document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value=d.ISO;
				document.getElementById("country_dropdown").value=d.ISO;
				displayIneq(d.ISO);
			});




	//Draw country values for this inequality Type
	ineqIndic.selectAll()
	    .data(ineqData.filter(function(d){return ISO==d.ISO}))
	    .enter()
	    .append("rect")
	    .attr("class",function(d) {
			return d.ISO +" "+d.typeIneq;
	    })
	    .attr("x", function(d) {
			return ordinalScale(d.typeIneq)-4;
	    })
	    .attr("y", function(d) {
	    	return linearScale(d.normalized)-sizeSquare/4;
	    })
		.attr("height",function(d){
				return sizeSquare/2;
		})
		.attr("width",function(d){
				return sizeSquare+8;
		})
		.attr("fill",function (d){
				return "#476991";
		})
		.style('opacity',function (d){
				return 1;
		})
		.on("mouseover",function(d){
	    	//d3.select(this)
			//	.style("opacity",0.5);

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
		        .text("");


		    d3.select("#indicatorMeasure")
		        .text(d.desc);

			d3.select("#avgIndicTooltip")
		        .style("left", xPosition + "px")
		        .style("top", yPosition + "px") ;

			d3.select("#avgIndicTooltip").classed("hidden", false);
	    })
	    .on("mouseout",function(d){
				//d3.select(this)
				//	.style("opacity", 1)
	            
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