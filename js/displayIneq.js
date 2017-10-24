function displayIneq(ISO){
	var selectedIndic= document.getElementById("indic_dropdown").options[document.getElementById("indic_dropdown").selectedIndex].value;
	var ISO= document.getElementById("country_dropdown").options[document.getElementById("country_dropdown").selectedIndex].value;

	var isoIndicIneq=[];
	var allIsoIndicIneq=[];
	var IsoIneq=[];

	datatot.forEach(function(d){
		if((d.variable1==selectedIndic) && (d.ISO!="OECD")&& (d.value!=""))
			allIsoIndicIneq.push(d);
	})


	datatot.forEach(function(d){
		if((d.variable1==selectedIndic) && (d.ISO==ISO)&& (d.value!=""))
			isoIndicIneq.push(d);
	})


	datatot.forEach(function(d){
		if( ((d.ISO==ISO) && (d.value!="")) && ((d.ISO==ISO) && (d.typeIneq !=="average")))
			IsoIneq.push(d);
	})

	var listVariable=[];
	var listIneq=[];

	IsoIneq.forEach(function(d){
		var toPush=d.variable1;

		listVariable.forEach(function(k){
			if(d.variable1==k){
				toPush="not";
			}
		})
		if (toPush!="not")
			listVariable.push(toPush)
	})

//	console.log(listVariable)

	IsoIneq.forEach(function(d){
		var toPush=d.typeIneq;

		listIneq.forEach(function(k){
			if(d.typeIneq==k){
				toPush="not";
			}
		})
		if (toPush!="not"&& toPush!="average")
			listIneq.push(toPush)
	})


	//update Country Name
	var countrySel;
	correspondanceISO.forEach(function(d){
		if(ISO==d.ISO)
			countrySel=d.country;

	})
	document.getElementsByClassName("pickedCountry")[0].innerHTML=countrySel;
	document.getElementsByClassName("pickedCountry")[1].innerHTML=countrySel;

	// Draw Heatmap and inequality card
	distriIndicViz(selectedIndic,ISO);
	heatMap(listIneq,listVariable,IsoIneq);
	ineqindic(selectedIndic,ISO,allIsoIndicIneq);
}


