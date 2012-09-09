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
											<li class="mainEdit">Edit</li>\
											<li class="mainDelete">Delete</li>\
										</ul>\
									</div>\
								</div>\
								<div class="mainEditDialogue">\
									<input type="text" class="mainInputEdit">\
									<input type="text" class="taskCatEdit">\
									<div class="mainPrioEdit">\
										<div class="mainPrioEditSlider"></div>\
										<p>test</p>\
									</div>\
									<button class="mainSaveEdit">Save</button>\
									<button class="mainCancelEdit">Cancel</button>\
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

		//here
		if(MainUtil.totalTasksInfo.tasksCat.hasOwnProperty(MTCategory)){
			++MainUtil.totalTasksInfo.tasksCat[MTCategory];						
		} else {
			$("#categories ul").append("<li>" + MTCategory +"</li>");
			MainUtil.totalTasksInfo.tasksCat[MTCategory] = 1;
			++MainUtil.totalTasksInfo.tasksCat["all"];
			MainUtil.mainCatArr = $.map(MainUtil.totalTasksInfo.tasksCat, function(value, index){return index;});			
		}	
		
		//setting priority marker color
		if(MTPriority == 2){ 
			MTContents.data('priority', 'urgent').find(".mainMarker").css("background-color", "red");
		} else if(MTPriority == 1){
			MTContents.data('priority', 'normal').find(".mainMarker").css("background-color", "black");
		} else if(MTPriority == 0){
			MTContents.data('priority', 'low').find(".mainMarker").css("background-color", "blue");
		}		
		
		this.setTaskInfo(MTLabel, MTCategory, MTPriority, Util.getCurrentTime(true));		
		MTContents.find(".mainTaskWrapper .dateInfo").text("Added: " + this.mainTaskInfo[MTLabel].date);		
		
		$("#tasksWrapper").prepend(MTContents);
		this.initialize(MTContents);	
		
		Util.calcTaskInfo(true, true);		
		$("#mainCatInput").autocomplete("option", "source",this.mainCatArr);
		
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
		$(".mainPrioEditSlider").slider({
			min: 0,
			max: 2,
			step:1,		
			orientation:"horizontal",			
			change : function(event, ui){
				if(ui.value == 0){
					$(this).siblings().text("Low").css("color","blue");
				} else if(ui.value == 1){
					$(this).siblings().text("Medium").css("color","black");
				} else if(ui.value == 2){
					$(this).siblings().text("Urgent").css("color","red");
				}
			},
			slide : function(event, ui){
				if(ui.value == 0){
					$(this).siblings().text("Low").css("color","blue");
				} else if(ui.value == 1){
					$(this).siblings().text("Medium").css("color","black");
				} else if(ui.value == 2){
					$(this).siblings().text("Urgent").css("color","red");
				}
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
	configEditMain : function(task){
		var taskLabel = task.find(".mainTaskLabel").text(),
			taskCat = this.mainTaskInfo[taskLabel].category,
			taskPrio = this.mainTaskInfo[taskLabel].priority,
			taskPrioVal = "";
			taskEdit = task.siblings(".mainEditDialogue");
			
		switch(taskPrio){
			case "urgent" : taskPrioVal = 2; break;
			case "normal" :taskPrioVal = 1; break;
			case "low" : taskPrioVal = 0; break;
		}		
		taskEdit.find(".mainPrioEditSlider").slider("value", taskPrioVal);
		taskEdit.find(".mainInputEdit").val(taskLabel);
		taskEdit.find(".taskCatEdit").val(taskCat);
	},
	editMain : function(dialogue){
		var newLabel = dialogue.find(".mainInputEdit").val(),
			newCat = dialogue.find(".taskCatEdit").val(),
			newPrio = dialogue.find(".mainPrioEditSlider").slider("value"),
			targetTask = dialogue.siblings(".mainTaskWrapper"),
			oldTaskLabel = targetTask.find(".mainTaskLabel").text(),
			oldCat = this.mainTaskInfo[oldTaskLabel].category,
			oldPrio = this.mainTaskInfo[oldTaskLabel].priority;	
		
		var getOut = false;
		$(".wholeTask").each(function(){
			if(newLabel == $(this).find(".mainTaskLabel").text() 
				&& (dialogue[0] != $(this).find(".mainEditDialogue")[0] && newCat == $(this).data("cat"))){
				$(this).effect('highlight', {}, 3000);					
				Util.showError("Task already exists.");
				getOut = true;
				return false;
			}
		});
		
		if(getOut) return false;
		
		//editing label
		this.totalTasksInfo.tasksNames.splice($.inArray(this.totalTasksInfo.tasksNames),1,newLabel);
		targetTask.find(".mainTaskLabel").text(newLabel);
		
		//editing priority
		if(newPrio == 2){
			targetTask.parent().data("priority", "urgent").end()
					.find(".mainMarker").css("backgroundColor","red");			
		} else if(newPrio == 1){
			targetTask.parent().data("priority", "normal").end()
					.find(".mainMarker").css("backgroundColor","black");
		} else if(newPrio == 0){
			targetTask.parent().data("priority", "low").end()
					.find(".mainMarker").css("backgroundColor","blue");
		}
		
		if(newCat==""){
			newCat = "uncategorized";
		}
		targetTask.parent().data("cat", newCat);
		--this.totalTasksInfo.tasksCat[oldCat];
		
		//here
		if(MainUtil.totalTasksInfo.tasksCat.hasOwnProperty(newCat)){
			++MainUtil.totalTasksInfo.tasksCat[newCat];						
		} else {			
			$("#categories ul").append("<li>" + newCat +"</li>");
			MainUtil.totalTasksInfo.tasksCat[newCat] = 1;
			++MainUtil.totalTasksInfo.tasksCat["all"];
			MainUtil.mainCatArr = $.map(MainUtil.totalTasksInfo.tasksCat, function(value, index){return index;});			
		}
			//alert(JSON.stringify(MainUtil.totalTasksInfo.tasksCat));
		Util.calcTaskInfo(true, true);
		targetTask.find(".dateInfo").text("Edited: " + Util.getCurrentTime(true));
		
		delete this.mainTaskInfo[oldTaskLabel];
		this.setTaskInfo(newLabel, newCat, targetTask.parent().data("priority"), Util.getCurrentTime(true));
		dialogue.fadeOut(50, function(){
			$(this).siblings(".mainTaskWrapper").fadeIn(50);
		});
	},
	deleteMain : function(task){
		var taskLabel = task.find(".mainTaskLabel").text(),
			taskPrio = this.mainTaskInfo[taskLabel].priority,
			taskCat = this.mainTaskInfo[taskLabel].category,
			taskIndex = $.inArray(taskLabel, this.totalTasksInfo.tasksNames);
		
		this.totalTasksInfo.tasksNames.splice(taskIndex, 1);
		switch(taskPrio){
			case "low":	--this.totalTasksInfo.tasksPriority["low"];
			case "normal": --this.totalTasksInfo.tasksPriority["normal"];
			case "urgent": --this.totalTasksInfo.tasksPriority["urgent"];
		}		
		--this.totalTasksInfo.tasksCat[taskCat];
		delete this.mainTaskInfo[taskLabel];
		Util.calcTaskInfo(true, true);		
		task.remove();
		//alert(JSON.stringify(MainUtil.totalTasksInfo.tasksCat));		
	}
};