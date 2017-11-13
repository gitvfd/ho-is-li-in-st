function normalize() {
	var temp=[]
	var min,max;
	var logic=0;
	
	relationshipList.forEach(function(d){

		if(d.ineqType!="average" && d.ineqType!="depr"  && d.ineqType!="ver_ineq" ){
			temp=datatot.filter(function(v) { return v.variable == d.variable; })

			//temp2 only allows to get the same scale across indicators . TO have less gathered data go back to "temp" to calculate min and max
			temp2=datatot.filter(function(v) { return v.variable.substr(0, 5) == d.variable.substr(0, 5); })


			min2 = d3.min(temp2.map(function(k) {return (parseFloat(k.norm1));} ));
			max2 = d3.max(temp2.map(function(l) {return (parseFloat(l.norm2));} ));
			var maxMinMax=d3.max([Math.abs(min2),Math.abs(max2)])
			//////////////////////////////////////////////////////////
			///// Revert Scales to properly display inequalities /////
			//////////////////////////////////////////////////////////

			var scalePosBelow=d3.scaleLinear().domain([-maxMinMax,0]).range([0,0.5]);
			var scalePosOver=d3.scaleLinear().domain([0,maxMinMax]).range([0.5,1]);
			//var scaleNeg=d3.scaleLinear().domain([max,min]).range([0,0.5]);

	 //&& (n.typeIneq!="vertical")
			datatot.forEach(function(n){
					if((n.variable == d.variable) && (d.norm1!="") ){
						if(n.value<0)
							n.normalized=scalePosBelow(parseFloat(n.norm1))
						if(n.value>=0)
							n.normalized=scalePosOver(parseFloat(n.norm1))
					}

			});
				/**else
					n.normalized=scaleNeg(parseFloat(n.value))
				if(n.normalized>=1)
					console.log (n.normalized)**/
				
			//});
		} else{

			temp=datatot.filter(function(v) { return v.variable == d.variable; })
			min = d3.min(temp.map(function(k) {return (parseFloat(k.value));} ));
			max = d3.max(temp.map(function(l) {return (parseFloat(l.value));} ));
			var scaleNeg=d3.scaleLinear().domain([max,min]).range([0,0.5]);

			datatot.forEach(function(n){
				if(n.typeIneq=="vertical" || n.typeIneq=="deprivation"){
					if((n.variable == d.variable) && (d.value!="") )
						n.normalized=scaleNeg(parseFloat(n.value))
				}
				
			})

		}
	})

displayIneq("AUS");
}