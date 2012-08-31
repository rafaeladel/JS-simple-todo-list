var MainUtil = {
	singleTaskInfo : [],	
	totalTasksInfo : {
		tasksNames : [],
		tasksPriority : {
			"urgent" : 0,
			"normal" : 0,
			"low" : 0
		},
		tasksCat : ["all"]
	},
	priorityArr: {'urgent':0, 'normal':0, 'low':0},	
	setTaskInfo : function(name, category, priority, date){			
		this.singleTaskInfo[name] = {
			label : name,
			category: category,
			priority: priority,
			date: "today"
		}				
	},
	add : function(){	
		var MTLabel = $("#mainTaskInput").val(),  //task label	
			MTCategory = $("#mainCatInput").val().toLowerCase(), //task category 
			MTPriority = $("#prioritySlider").slider("value"),  //task priority		
			MTContents = $('<div class="wholeTask">\
								<div class="mainTaskWrapper clearfix">\
									<div class="mainMarker"></div>\
									<label class="mainTaskLabel"></label>\
									<div class="holder"></div>\
									<div class="subTrigger"></div>\
									<div class="checkButton"></div>\
									<div class="optTrigger"></div>\
									<div class="addSubButton"></div>\
									<div class="dateInfo">Added at : 26/6/1990</div>\
									<div class="mainOptions">\
										<ul>\
											<li id="mainInfo">Details</li>\
											<li id="mainEdit">Edit</li>\
											<li id="mainDelete">Delete</li>\
										</ul>\
									</div>\
								</div>\
							</div>');
							
							
		this.totalTasksInfo.tasksNames.push(MTLabel);
		
		//setting label
		MTContents.find(".mainTaskLabel").text(MTLabel);		
		
		//setting category	
		if(MTCategory == ""){
			MTCategory = "uncategorized";
		}
		MTContents.attr('data-cat', MTCategory);
		if($.inArray(MTCategory,this.totalTasksInfo.tasksCat) == -1){
			this.totalTasksInfo.tasksCat.push(MTCategory);
			$("#categories ul").append("<li>" + MTCategory +"</li>");
		}
		$("#mainCatInput").autocomplete("option", "source",this.totalTasksInfo.tasksCat);
		
		//setting priority marker color
		if(MTPriority == 2){ 
			this.totalTasksInfo.tasksPriority["urgent"]++;			
			MTContents.attr('data-priority', 'urgent').find(".mainMarker").css("background-color", "red");
		} else if(MTPriority == 1){
			this.totalTasksInfo.tasksPriority["normal"]++;
			MTContents.attr('data-priority', 'normal').find(".mainMarker").css("background-color", "black");
		} else if(MTPriority == 0){
			this.totalTasksInfo.tasksPriority["low"]++;
			MTContents.attr('data-priority', 'low').find(".mainMarker").css("background-color", "blue");
		}		
		
		MTContents.hide();
		$("#tasksWrapper").prepend(MTContents);	
		MTContents.slideDown(100);	
		$("#tasksWrapper").sortable({
			axis: "y",
			scroll: "true",
			scrollSpeed : 10,
			scrollSensitivity: 10,
			handle: $(".holder"),
			opacity : 0.7			
		});	
	}
};