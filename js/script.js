$(function(){
	//mainTask Addition animation
	$("#mainNext, #mainTaskInput").on('click keypress', function(evt){
		if(evt.type == "click" || evt.type =="keypress"){
			if((evt.type =="click" && evt.target.id == "mainNext") ||
				(evt.which == 13 && evt.target.id=="mainTaskInput")){			
				//if textbox is empty
				if($("#mainTaskInput").val() == ""){
					$("#mainTaskInput").stop().effect('highlight' ,{}, 1000);
					return false;
				}
				
				//if task already exists
				var MTLabel = $("#mainTaskInput").val();
				if(MainUtil.totalTasksInfo.tasksNames.indexOf(MTLabel) != -1){			
					$(".wholeTask").each(function(){
						var taskLabel = $(this).find(".mainTaskLabel").text();
						if(taskLabel == MTLabel){
							$(this).effect('highlight', {}, 3000);
						}				
					});			
					Util.showError("Task already exists!");			
					return false;
				} else {			
					//if everything is ok 
					$(this).parent().fadeOut(100, function(){
						$(this).siblings().fadeIn(100).find("input").val("").focus();
					});	
					Util.hideError();
				}
			}
		}
	});
		
	$("#backMain").click(function(){
		$(this).parent().fadeOut(100, function(){
			$(this).siblings().fadeIn(100);
		});
	});

	$("#addMain, #mainCatInput").on('click keypress', function(evt){	
		if(evt.type == "click" || evt.type =="keypress"){
			if((evt.type =="click" && evt.target.id == "addMain") ||
				(evt.which == 13 && evt.target.id=="mainCatInput")){	
					MainUtil.add();					
					$(this).parent().fadeOut(100, function(){
						$(this).siblings().fadeIn(100).find("input").val("").focus();
					});
					
					//Setting Tags functionality 
					$("#categories li").each(function(){
						var currentTag = $(this);						
						$(this).on('click' , function(){
							var oldTag = $("#categories li.selected");	
							$(".wholeTask").each(function(){
								if(currentTag.is(":first-child")){
									$(this).show();
								}else if ($(this).attr("data-cat") != currentTag.text()){
									$(this).hide();
								} else {
									$(this).show();
								}
							});
							oldTag.removeClass("selected");
							currentTag.addClass("selected");
						});
					});	
					Util.calcTaskInfo(false);
					
			}
		}
	});

	$("#tasksWrapper").on('click', '.mainTaskWrapper .checkButton' , function(){
		var currentTask = $(this).parent().parent();
		currentTask.prependTo($("#completedTasks"));
		Util.calcTaskInfo(true);
		currentTask.find($(".optTrigger , .addSubButton, .holder")).hide();
		$(this).css('opacity','1.0');
	});
	
	$("#completedTasks").on('click', '.mainTaskWrapper .checkButton',function(){
		var currentTask = $(this).parent().parent();
		currentTask.prependTo($("#tasksWrapper"));
		Util.calcTaskInfo(true);
		currentTask.find($(".optTrigger , .addSubButton, .holder")).show();
		/* $(this).hover(
			function(){
				$(this).css('opacity','1.0');
			},
			function(){
				$(this).css('opacity','0.2');
			}
		); */
		$(this).css('opacity','0.2');
	});
})



