var MainUtil = {
	tasksArr : [],
	catArr : ["all"],
	add : function(selectedVal){		
		
		var MTLabel = $("#mainTaskInput").val(),  //task label	
			MTCategory = $("#mainCatInput").val(), //task category 
			MTPriority = $("#prioritySlider").slider("value"),  //task priority		
			MTContents = $('<div class="wholeTask">\
								<div class="mainTaskWrapper clearfix">\
									<div class="mainMarker"></div>\
									<label class="mainTaskLabel"></label>\
									<div class="holder"></div>\
									<div class="subTrigger"></div>\
									<div class="checkButton"></div>\
									<div class="optTrigger"></div>\
									<div class="mainOptions">\
										<ul>\
											<li id="mainInfo">Details</li>\
											<li id="mainDivide">Divide</li>\
											<li id="mainEdit">Edit</li>\
											<li id="mainDelete">Delete</li>\
										</ul>\
									</div>\
								</div>\
							</div>');
							
							
		this.tasksArr.push(MTLabel);
		
		//setting label
		MTContents.find(".mainTaskLabel").text(MTLabel);		
		
		//setting category	
		if(MTCategory == ""){
			MTCategory = "uncategorized";
		}
		MTContents.attr('data-cat', MTCategory);
		if(this.catArr.indexOf(MTCategory) == -1){
			this.catArr.push(MTCategory);
			$("#categories ul").append("<li>" + MTCategory +"</li>");
		}
		$("#mainCatInput").autocomplete("option", "source",this.catArr);
		
		//setting priority marker color
		if(MTPriority == 2){ 
			MTContents.find(".mainMarker").css("background-color", "red");
		} else if(MTPriority == 1){
			MTContents.find(".mainMarker").css("background-color", "black");
		} else if(MTPriority == 0){
			MTContents.find(".mainMarker").css("background-color", "blue");
		}		
		
		MTContents.hide();
		$("#tasksWrapper").prepend(MTContents);	
		MTContents.slideDown(100);
		
		
	}
};