$(function(){
	Object.defineProperty(MainUtil.totalTasksInfo.tasksCat, "all" , { value:0, writable:true, enumerable:false});	
	//mainTask Addition animation
	$("#mainNext, #mainTaskInput").on('click keypress', function(evt){
		if(evt.type == "click" || evt.type =="keypress"){
			if((evt.type =="click" && evt.target.id == "mainNext") ||
				(evt.which == 13 && evt.target.id=="mainTaskInput")){			
				//if textbox is empty
				if($("#mainTaskInput").val() == ""){
					$("#mainTaskInput").stop().effect('highlight' ,{}, 1000).focus();
					return false;
				}
				
				//if task already exists
				var MTLabel = $("#mainTaskInput").val();
				if($.inArray(MTLabel, MainUtil.totalTasksInfo.tasksNames) != -1){			
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
		if((evt.type =="click" && evt.target.id == "addMain") || (evt.which == 13 && evt.target.id=="mainCatInput")){	
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
						}else if ($(this).data("cat") != currentTag.text()){
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
		
	});
	
	$("#taskPool").on("mouseover", ".wholeTask", function(){
		$(this).find(".dateInfo").css("display","inline-block");
	});
	
	$("#taskPool").on("mouseout", ".wholeTask", function(){
		$(this).find(".dateInfo").css("display","none");
	});	
	
	$("#tasksWrapper").on('click', '.mainTaskWrapper .checkButton , .addSubButton' , function(){
		if($(this).hasClass('checkButton')){
			$(this).parent().siblings(".subTaskWrapper").find(".remainingSub").children().each(function(){
				$(this).find(".checkButton").trigger("click");
			});
			var currentTask = $(this).parent().parent();
			currentTask.prependTo($("#completedTasks"));
			Util.calcTaskInfo(true);
			currentTask.find(".dateInfo").text("Completed " + Util.getCurrentTime(true));
			currentTask.find($(".optTrigger , .addSubButton, .holder")).hide();						
		} else if($(this).hasClass('addSubButton')){
			$(this).parent().siblings('.subTaskAdd').slideDown(100).find(".subTaskInput").focus();		
		}		
	});
	
	//sub tasks checking and unchecking	
	$("#tasksWrapper").on("click",".remainingSub .checkButton, .completedSub .checkButton", function(evt){
		var test = Util.clickOnCheck(evt);		
	});
	
	
	
	$("#tasksWrapper").on('click' , '.subTaskAdd .cancelSub', function(){
		$(this).parent().slideUp(100);
	});

	$("#tasksWrapper").on("click keypress", ".addSub" , function(evt){		
		if($(this).siblings(".subTaskInput").val() == ""){
			$(this).siblings(".subTaskInput").stop().effect('highlight' ,{}, 1000);
			return false;
		}
		var STLabel = $(this).siblings(".subTaskInput").val(),
			MTLabel = $(this).parent().siblings(".mainTaskWrapper").find(".mainTaskLabel").text();
		if($.inArray(STLabel, MainUtil.mainTaskInfo[MTLabel].subTasks) != -1){
			$(this).parent().siblings(".subTaskWrapper").find(".subTask").each(function(){
				if($(this).find(".subTaskLabel").text() == STLabel){
					$(this).effect('highlight' , {} , 1000);
				}
			});
			$(this).siblings(".subTaskInput").focus();
			Util.showError("Sub Task already exists!");					
			return false;				
		}
		SubUtil.add($(this));
		if($(this).parent().siblings(".subTaskWrapper").find(".remainingSub").children().length == 1){
			$(this).parent().siblings(".subTaskWrapper").show();
		}			
		$(this).parent().fadeOut(100);
		$(this).siblings(".subTaskInput").val("");
	});
	
	$("#tasksWrapper").on("mousedown", ".mainTaskWrapper .optTrigger", function(evt){		
		Util.bindMenu(evt,"main");
	});

	$("#tasksWrapper").on("mousedown", ".remainingSub .subTask .optTrigger", function(evt){
		Util.bindMenu(evt,"sub");
	});

	$("html").on("mousedown",function(evt){
		if($(evt.target).parent().parent().hasClass("mainOptions") || $(evt.target).parent().parent().hasClass("subOptions")) return false;
		$(".optTrigger").siblings(".mainOptions").hide();
		$(".optTrigger").siblings(".subOptions").hide();
		$(".optTrigger").removeClass("active");
	});
	
	$("#tasksWrapper").on("click", ".mainTaskWrapper .mainDelete", function(){
		MainUtil.deleteMain($(this).parents().eq(3));
	});
	
	$("#tasksWrapper").on("click", ".subTask .subDelete", function(){
		SubUtil.deleteSub($(this).parents().eq(2));
	});
	
	$("#completedTasks").on('click', '.mainTaskWrapper .checkButton',function(){
		var currentTask = $(this).parent().parent();
		currentTask.prependTo($("#tasksWrapper"));
		Util.calcTaskInfo(true);
		currentTask.find(".dateInfo").text("Added " + MainUtil.mainTaskInfo[$(this).siblings(".mainTaskLabel").text()].date);
		currentTask.find($(".mainTaskWrapper .optTrigger ,.mainTaskWrapper .addSubButton, .mainHolder")).show();				
	});

	$("#completedTasks").on("click", ".remainingSub .checkButton, .completedSub .checkButton", function(evt){
		Util.clickOnCheck(evt);	
		
		$(this).parents().eq(2).siblings(".mainTaskWrapper").find(".checkButton").trigger("click");
	});
	
})



