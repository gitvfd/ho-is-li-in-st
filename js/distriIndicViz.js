

function distriIndicViz(selectedIndic,ISO){

	distributionIndic.selectAll("*").remove();
	

 	var data_indic=[];
	datatot.forEach(function(d){
		if((d.variable==selectedIndic) && (d.ISO!="OECD") && (d.value!="")){
			data_indic.push(d);
		}
	})

	var indicatorDim;
	indicatorList.forEach(function(d){
		if(selectedIndic==d.code)
			indicatorDim=d.Dimension;
	})

	var minIndic = d3.min(data_indic.map(function(d) {return (parseFloat(d.value));} ));
	var maxIndic = d3.max(data_indic.map(function(d) {return (parseFloat(d.value));} ))

	//////////////////////////////////////////////////////////
	///// Revert Scales to properly display inequalities /////
	//////////////////////////////////////////////////////////

	var distriScale=d3.scaleLinear().domain([minIndic,maxIndic]).range([marginLeft,width-marginRight]);
	
	distributionIndic
      .attr("width", width )
      .attr("height", 30 )
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
		    .attr("cy", function(d) {
		    	return 15;
		    })
			.attr("r",function(d){
				if(d.ISO==ISO)
					return 10;
				else
					return 6;
			})
			.attr("fill",function (d){
				if(ISO==d.ISO)
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
					.attr("r",function(d){
						if(d.ISO==ISO)
							return 12;
						else
							return 12;
					});



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
			})

		var pickedindicatorText;
		indicatorList.forEach(function(d){
			if(selectedIndic==d.code)
				pickedindicatorText=d.Indicator;
			})
			document.getElementById('pickedindicator').innerHTML=pickedindicatorText;
}