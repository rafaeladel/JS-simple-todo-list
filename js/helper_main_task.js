var MainUtil = {
	mainTaskInfo : [],	
	totalTasksInfo : {
		tasksNames : [],
		tasksPriority : {
			"urgent" : 0,
			"normal" : 0,
			"low" : 0
		},
		tasksCat : { "all" : 0 }
	},
	mainCatArr : [],
	setTaskInfo : function(name, category, priority, date){
		switch(priority){
			case 0: priority = "low"; break;
			case 1: priority = "normal"; break;
			case 2: priority = "urgent"; break;
		}
		this.mainTaskInfo[name] = {
			label : name,
			category: category,
			priority: priority,
			date: date,
			subTasks : []
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
									<div class="mainHolder"></div>\
									<div class="subTrigger opened"></div>\
									<div class="checkButton"></div>\
									<div class="optTrigger"></div>\
									<div class="addSubButton"></div>\
									<div class="dateInfo"></div>\
									<div class="mainOptions">\
										<ul>\
											<li class="mainInfo">Details</li>\
											<li class="mainEdit">Edit</li>\
											<li class="mainDelete">Delete</li>\
										</ul>\
									</div>\
								</div>\
								<div class="subTaskAdd">\
									<input type="text" name="subTask" class="subTaskInput" placemainHolder="Enter a new sub task">\
									<div name="priority" class="prioritySelectSub">\
										<div class="prioritySubSlider"></div>\
										<p>Normal</p>\
									</div>\
									<button class="addSub">Done</button>\
									<button class="cancelSub">Cancel</button>\
								</div>\
								<div class="subTaskWrapper clearfix">\
									<div class="remainingSub"></div>\
									<div class="completedSub"></div>\
								</div>\
							</div>');
							
							
		this.totalTasksInfo.tasksNames.push(MTLabel);
		
		//setting label
		MTContents.find(".mainTaskLabel").text(MTLabel);		
		
		//setting category	
		if(MTCategory == ""){
			MTCategory = "uncategorized";
		}
		MTContents.data('cat', MTCategory);		
		if(this.totalTasksInfo.tasksCat.hasOwnProperty(MTCategory)){
			++this.totalTasksInfo.tasksCat[MTCategory];						
		} else {
			$("#categories ul").append("<li>" + MTCategory +"</li>");
			this.totalTasksInfo.tasksCat[MTCategory] = 1;
			++this.totalTasksInfo.tasksCat["all"];
			this.mainCatArr = $.map(MainUtil.totalTasksInfo.tasksCat, function(value, index){return index;});
		}		
		$("#mainCatInput").autocomplete("option", "source",this.mainCatArr);
		
		//setting priority marker color
		if(MTPriority == 2){ 
			this.totalTasksInfo.tasksPriority["urgent"]++;			
			MTContents.data('priority', 'urgent').find(".mainMarker").css("background-color", "red");
		} else if(MTPriority == 1){
			this.totalTasksInfo.tasksPriority["normal"]++;
			MTContents.data('priority', 'normal').find(".mainMarker").css("background-color", "black");
		} else if(MTPriority == 0){
			this.totalTasksInfo.tasksPriority["low"]++;
			MTContents.data('priority', 'low').find(".mainMarker").css("background-color", "blue");
		}		
		
		this.setTaskInfo(MTLabel, MTCategory, MTPriority, Util.getCurrentTime(true));
		
		MTContents.find(".mainTaskWrapper .dateInfo").text("Added: " + this.mainTaskInfo[MTLabel].date);		
		$("#tasksWrapper").prepend(MTContents);
		this.initialize(MTContents);
		$("#tasksWrapper").sortable({
			axis: "y",			
			revert:"true",
			tolerance: "pointer",			
			handle: ".mainHolder",
			opacity : 0.7,
			containment: "#tasksWrapper",
			start : function(event, ui){
				$("#tasksWrapper").find(".subTaskWrapper").each(function(){
					if($(this).is(":visible")){
						$(this).data("sortTriggered",true).slideUp(100);
					} else {
						$(this).data("sortTriggered",false);
					}
				});
			},
			stop : function(event, ui){
				$("#tasksWrapper").find(".subTaskWrapper").each(function(){
					if((!$(this).is(":visible")) && ($(this).data("sortTriggered") == true)){
						$(this).slideDown(100);
					}
				});
			}
		});			
		MTContents.slideDown(100);			
	},
	initialize : function(el){
		el.hide();
		el.find(".prioritySubSlider").slider({
			min: 0,
			max: 2,
			step:1,		
			orientation:"horizontal",
			create : function(event,ui){
				ui.value = 0 ;
				$(this).siblings().text("Low");
			},
			slide : function(event, ui){
				if(ui.value == 0){
					$(this).siblings().text("Low");
				} else if(ui.value == 1){
					$(this).siblings().text("Medium");
				} else if(ui.value == 2){
					$(this).siblings().text("Urgent");
				}
			}
		});
	}, 
	deleteMain : function(task){
		var taskLabel = task.find(".mainTaskLabel").text(),
			taskPrio = this.mainTaskInfo[task.find(".mainTaskLabel").text()].priority,
			taskCat = this.mainTaskInfo[task.find(".mainTaskLabel").text()].category,
			taskIndex = $.inArray(taskLabel, this.totalTasksInfo.tasksNames);
		
		this.totalTasksInfo.tasksNames.splice(taskIndex, 1);
		switch(taskPrio){
			case "low":	--this.totalTasksInfo.tasksPriority["low"];
			case "normal": --this.totalTasksInfo.tasksPriority["normal"];
			case "urgent": --this.totalTasksInfo.tasksPriority["urgent"];
		}
		--this.totalTasksInfo.tasksCat[taskCat];
		delete this.mainTaskInfo[taskLabel];		
		task.remove();
		Util.calcTaskInfo(true, true);
	}
};