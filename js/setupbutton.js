function setupButtons() {
    d3.select('#toolbar')
      .selectAll('.button')
      .on('click', function () {
        // Remove active class from all buttons
        d3.selectAll('.button').classed('active', false);
        // Find the button just clicked
        var button = d3.select(this);

        // Set it as the active button
        button.classed('active', true);

        // Get the id of the button
        var buttonId = button.attr('id');
		if (buttonId== "comparison"){ 
            document.getElementById("indic_sel").style.visibility = 'visible';  
            document.getElementById("countryCard").style.display = 'none';          
            document.getElementById("inequalityCard").style.display = 'block';  
		}else if (buttonId== "heatmap"){ 
            document.getElementById("indic_sel").style.visibility = 'hidden';  
            document.getElementById("inequalityCard").style.display = 'none';          
            document.getElementById("countryCard").style.display = 'block';  
        }
		
        // Toggle the bubble chart based on
        // the currently clicked button.
        //draw(buttonId);
      });

    d3.select('#shareLink')
    .on('click', function () {
        // Remove active class from all buttons
        d3.select('#shareContainer').style('visibility', "visible")
    });

    d3.select('#closeShare')
    .on('click', function () {
        // Remove active class from all buttons
        d3.select('#shareContainer').style('visibility', "hidden")
    });

    d3.select('#downloadLink')
    .on('click', function () {
        // Remove active class from all buttons
        window.open("", '_blank');
    });

    d3.select('#helpLink')
    .on('click', function () {
        // Remove active class from all buttons
        window.open("mailto:wellbeing@oecd.org");
    });

  }  