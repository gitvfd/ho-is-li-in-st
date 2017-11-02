function normalize() {
	var temp=[]
	var min,max;
	var logic=0;
	
	relationshipList.forEach(function(d){
		temp=datatot.filter(function(v) { return v.variable == d.variable; })

		min = d3.min(temp.map(function(k) {return (parseFloat(k.value));} ));
		max = d3.max(temp.map(function(l) {return (parseFloat(l.value));} ));

		//////////////////////////////////////////////////////////
		///// Revert Scales to properly display inequalities /////
		//////////////////////////////////////////////////////////

		var scalePos=d3.scaleLinear().domain([min,max]).range([0,1]);
		var scaleNeg=d3.scaleLinear().domain([max,min]).range([0,1]);

 //&& (n.typeIneq!="vertical")
		datatot.forEach(function(n){
			if(n.typeIneq=="vertical" || n.typeIneq=="deprivation"){
				if((n.variable == d.variable) && (d.value!="") )
					n.normalized=scaleNeg(parseFloat(n.value))
			}
			else{
				if((n.variable == d.variable) && (d.value!="") )
					n.normalized=scalePos(parseFloat(n.value))
			}
			/**else
				n.normalized=scaleNeg(parseFloat(n.value))
			if(n.normalized>=1)
				console.log (n.normalized)**/
			
		});

	})

displayIneq("AUS");
}