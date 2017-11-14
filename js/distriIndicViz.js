

function distriIndicViz(selectedIndic,ISO){

	distributionIndic.selectAll("*").remove();
	

 	var data_indic=[];
	datatot.forEach(function(d){
		if((d.variable==selectedIndic) && (d.ISO!="OECD") && (d.value!="")){
			data_indic.push(d);
		}
	})

	var indicatorDim;
	var scaleOrient;
	indicatorList.forEach(function(d){
		if(selectedIndic==d.code){

			indicatorDim=d.Dimension;
			scaleOrient=d.Scale
		}
	})
	var minIndic = d3.min(data_indic.map(function(d) {return (parseFloat(d.value));} ));
	var maxIndic = d3.max(data_indic.map(function(d) {return (parseFloat(d.value));} ))

	//////////////////////////////////////////////////////////
	///// Revert Scales to properly display inequalities /////
	//////////////////////////////////////////////////////////
	if (scaleOrient=="Pos")
		var distriScale=d3.scaleLinear().domain([minIndic,maxIndic]).range([marginLeft,width-marginRight]);
	else
		var distriScale=d3.scaleLinear().domain([maxIndic,minIndic]).range([marginLeft,width-marginRight]);
	
	distributionIndic
      .attr("width", width )
      .attr("height", 40 )
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");

	distributionIndic.selectAll("circle")
		    .data(data_indic)
		    .enter()
		    .append("circle")
		    .attr("class",function(d) {
				return d.ISO;
		    })
		    .attr("cx", function(d) {
					return distriScale(d.value);
		    })
		    .attr("cy", 15)
			.attr("r", 6)
			.attr("fill",function (d){return colorScale(indicatorDim);})
			.style('opacity', 0.25)
			.on("mouseover",function(d){
		    	d3.select(this)
					.attr("r",12);



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
			        .text(indicMeasure);

				d3.select("#avgIndicTooltip")
			        .style("left", xPosition + "px")
			        .style("top", yPosition + "px") ;

				d3.select("#avgIndicTooltip").classed("hidden", false);
		    })
		    .on("mouseout",function(d){
		    	d3.select(this)
					.attr("r",function(d){
						if(d.ISO==ISO)
							return 10;
						else
							return 6;
					});
		            
		            //Hide the tooltip
					d3.select("#avgIndicTooltip").classed("hidden", true);	            

			})
			.on("click",function(d){
				//document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value=d.ISO;
				document.getElementById("country_dropdown").value=d.ISO;
				
				displayIneq(d.ISO);
			});
			
		distributionIndic.selectAll()
		    .data(data_indic.filter(function(d){return ISO==d.ISO}))
		    .enter()
		    .append("circle")
		    .attr("class",function(d) {
				return d.ISO;
		    })
		    .attr("cx", function(d) {
					return distriScale(d.value);
		    })
		    .attr("cy", 15)
			.attr("r",10)
			.attr("fill", "#476991")
			.style('opacity',1)
			.on("mouseover",function(d){
		    	d3.select(this)
					.attr("r", 12);



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
			        .text(indicMeasure);

				d3.select("#avgIndicTooltip")
			        .style("left", xPosition + "px")
			        .style("top", yPosition + "px") ;

				d3.select("#avgIndicTooltip").classed("hidden", false);
		    })
		    .on("mouseout",function(d){
		    	d3.select(this)
					.attr("r",function(d){
						if(d.ISO==ISO)
							return 10;
						else
							return 6;
					});
		            
		            //Hide the tooltip
					d3.select("#avgIndicTooltip").classed("hidden", true);	            

			})
			.on("click",function(d){
				//document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value=d.ISO;
				document.getElementById("country_dropdown").value=d.ISO;
				
				displayIneq(d.ISO);
			})


		var pickedindicatorText;
		indicatorList.forEach(function(d){
			if(selectedIndic==d.code)
				pickedindicatorText=d.Indicator;
			})
			document.getElementById('pickedindicator').innerHTML=pickedindicatorText;

	distributionIndic.append("text")
	.attr("x",width-marginRight/2)
	.attr("y",37.5)
	.attr("class","legend")
	.attr("text-anchor","end")
	.text("Top Performer")

	distributionIndic.append("text")
	.attr("x",marginLeft/2)
	.attr("y",37.5)
	.attr("class","legend")
	.attr("text-anchor","start")
	.text("Bottom Performer");
}