var SubUtil = {
	add: function(el){
		var STLabel = el.siblings('.subTaskInput').val(),
			STPriority = el.siblings('.prioritySelectSub').find('.prioritySubSlider').slider('value'),
			parentTaskLabel = el.parent().siblings(".mainTaskWrapper").find(".mainTaskLabel").text();
			STContents = $('<div class="subContainer">\
								<div class="subTask">\
									<div class="subMarker"></div>\
									<label class="subTaskLabel"></label>\
									<div class="subHolder"></div>\
									<div class="subOptions">\
										<ul>\
											<li class="subEdit">Edit</li>\
											<li class="subDelete">Delete</li>\
										</ul>\
									</div>\
									<div class="checkButton"></div>\
									<div class="optTrigger"></div>\
								</div>\
								<div class="subEditDialogue">\
									<input type="text" class="subInputEdit">\
									<div class="subPrioEdit">\
										<div class="subPrioEditSlider"></div>\
										<p>test</p>\
									</div>\
									<button class="subCancelEdit">Cancel</button>\
									<button class="subSaveEdit">Save</button>\
								</div>\
							</div>');	
		
		STContents.find('.subTaskLabel').text(STLabel);
		MainUtil.mainTaskInfo[parentTaskLabel].subTasks.push(STLabel);
		
		if(STPriority == 2){
			STContents.data("subPriority", "urgent").find(".subMarker").css("background","red");
		} else if(STPriority == 1){
			STContents.data("subPriority", "normal").find(".subMarker").css("background","black");
		} else if(STPriority == 0){
			STContents.data("subPriority", "low").find(".subMarker").css("background","blue");
		}
		
		el.parent().siblings(".mainTaskWrapper").find(".subTrigger").show();
		
		STContents.hide();
		el.parent().siblings(".subTaskWrapper").find(".remainingSub").prepend(STContents);

		$(".remainingSub").sortable({
			axis: "y",		
			tolerance: "pointer",			
			handle: ".subHolder",
			opacity : 0.7,
			containment: STContents.parent()				
		});
		$(".subPrioEditSlider").slider({
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
		STContents.slideDown(100);
	},
	configEditSub: function(task){
		var subLabel = task.find(".subTaskLabel").text(),
			subPrio = task.parent().data("subPriority"),
			editDialogue = task.siblings(".subEditDialogue"),
			dialogueText = editDialogue.find(".subInputEdit"),
			dialoguePrio = editDialogue.find(".subPrioEditSlider");
		
		dialogueText.val(subLabel);
		switch (subPrio){
			case "urgent": dialoguePrio.slider("value", 2); break;
			case "normal": dialoguePrio.slider("value", 1); break;
			case "low": dialoguePrio.slider("value", 0); break;
		}
	},
	editSub : function(dialogue){
		var newLabel = dialogue.find(".subInputEdit").val(),
			newPrio = dialogue.find(".subPrioEditSlider").slider("value")
			targetTask = dialogue.siblings(".subTask"),
			oldLabel = targetTask.find(".subTaskLabel"),			
			oldPrio = targetTask.parent().data("subPriority"),
			parentTask = targetTask.parents().eq(2).siblings(".mainTaskWrapper"),
			parentLabel = parentTask.find(".mainTaskLabel").text(),
			oldLabelIndex = $.inArray(oldLabel, MainUtil.mainTaskInfo[parentLabel].subTasks);
		
		var getOut = false;
		parentTask.siblings(".subTaskWrapper").find(".subContainer").each(function(){
			if($(this).find(".subTask").find(".subTaskLabel").text() == newLabel 
				&& dialogue[0] != $(this).find(".subEditDialogue")[0]){
				$(this).effect('highlight', {}, 3000);					
				Util.showError("Sub Task already exists.");
				getOut = true;
				return false;
			}
		});
		if(getOut){
			return false;
		}
		
		oldLabel.text(newLabel);
		MainUtil.mainTaskInfo[parentLabel].subTasks.splice(oldLabelIndex, 1 , newLabel);
		
		switch(newPrio){
			case 2 : targetTask.parent().data("subPriority", "urgent").end().
						find(".subMarker").css("background","red"); break;
			case 1 : targetTask.parent().data("subPriority", "normal").end().
						find(".subMarker").css("background","black"); break;
			case 0 : targetTask.parent().data("subPriority", "low").end().
						find(".subMarker").css("background","blue"); break;
		}
		
		dialogue.fadeOut(50, function(){
			$(this).siblings(".subTask").fadeIn(50);
		});		
	},
	deleteSub : function(task){
		var taskName = task.find(".subTaskLabel").text(),
			parentTask = task.parent().parent().siblings(".mainTaskWrapper").find(".mainTaskLabel").text(),
			taskIndex = $.inArray(taskName, MainUtil.mainTaskInfo[parentTask].subTasks);
		MainUtil.mainTaskInfo[parentTask].subTasks.splice(taskIndex,1);
		if(MainUtil.mainTaskInfo[parentTask].subTasks.length < 1){
			task.parents().eq(2).find(".mainTaskWrapper").find(".subTrigger").click().hide();			
		}
		console.log(MainUtil.mainTaskInfo[parentTask].subTasks);		
		task.remove();		
	}
}