function updateMap(indicator){


	worldMap.selectAll("circle").remove();
 	

	var indicatorDim;
	indicatorList.forEach(function(d){
		if(indicator==d.code)
			indicatorDim=d.Dimension;
	})

 	var data_indic=[];


	datatot.forEach(function(d){
		if((d.variable==indicator) && (d.ISO!="OECD") && (d.value!="")){
			data_indic.push(d);
		}
	})

   data_indic.forEach(function(d){
    	centroid.forEach(function(k){
    		if(k.ISO3==d.ISO){
    			d.lat= k.latitude;
    			d.lon= k.longitude;
    		}
    	})
    })


   distriData=data_indic; //update data for distribution Chart

	var minIndic = d3.min(data_indic.map(function(d) {return parseFloat(d.value);} ));
	var maxIndic = d3.max(data_indic.map(function(d) {return parseFloat(d.value);} ));

	scale.domain([minIndic,maxIndic]).range([3,Math.pow(widthMap,9/20)]);

    worldMap.selectAll("circle")
	    .data(data_indic.sort(function(a,b) { return +b.value - +a.value; }))
	    .enter()
	    .append("circle")
	    .attr("cx", function(d) {
			return projection([d.lon,d.lat])[0];
	    })
	    .attr("cy", function(d) {
	    	return projection([d.lon,d.lat])[1];
	    })
		.attr("r",function(d){
			return scale(d.value);
		})
		.attr("fill",function (d){return colorScale(indicatorDim)})
		.attr("fill-opacity",0.8)
		.attr("stroke","#fff")
		.attr("stroke-width",3)
		.on("mouseover",function(d){
	    	d3.select(this)
				.attr("opacity",0.5);

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
		        .text(d.value);


		    d3.select("#indicatorMeasure")
		        .text(indicMeasure);

			d3.select("#avgIndicTooltip")
		        .style("left", xPosition + "px")
		        .style("top", yPosition + "px") ;

			d3.select("#avgIndicTooltip").classed("hidden", false);
	    })
	    .on("mouseout",function(d){
				d3.select(this)
					.attr("opacity",  1)
	            
	            //Hide the tooltip
				d3.select("#avgIndicTooltip").classed("hidden", true);	            

		})
		.on("click",function(d){displayIneq(d.ISO)});

    //d3.select("#mapVisualisation").select("svg")
}

