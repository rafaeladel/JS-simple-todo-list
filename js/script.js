$(function(){
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
				var MTLabel = $("#mainTaskInput").val(),
					getOut = false ;
				$(".wholeTask").each(function(){
					if(MTLabel == $(this).find(".mainTaskLabel").text()){
						$(this).effect('highlight', {}, 3000);					
						Util.showError("Task already exists.");
						getOut = true;
						return false;
					}
				});
				if(getOut) return false;
				
				$(this).parent().fadeOut(100, function(){
					$(this).siblings().fadeIn(100).find("input").val("").focus();
				});	
				
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
			if($("#mainCatInput").val() == "all"){
				Util.showError("Specify a category.");
				$("#mainCatInput").effect('highlight', {}, 3000);
				return false;
			};
			MainUtil.add();					
			$(this).parent().fadeOut(100, function(){
				$(this).siblings().fadeIn(100).find("input").val("").focus();
			});
			//alert(JSON.stringify(MainUtil.totalTasksInfo.tasksCat));
			Util.calcTaskInfo(true,true);				
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
	
	$("#tasksWrapper").on("click", ".mainTaskWrapper .mainEdit", function(){
		$(this).parents().eq(2).fadeOut(50, function(){
			$(this).siblings(".mainEditDialogue").fadeIn(50);
		});
		MainUtil.configEditMain($(this).parents().eq(2));
	});
	
	$("#tasksWrapper").on("click", ".mainEditDialogue .mainSaveEdit", function(){
		MainUtil.editMain($(this).parent());		
	});
	
	$("#tasksWrapper").on("click", ".mainEditDialogue .mainCancelEdit", function(){
		$(this).parent().fadeOut(50, function(){
			$(this).siblings(".mainTaskWrapper").fadeIn(50);
		});
	});
	
	$("#tasksWrapper").on("click", ".subTask .subEdit", function(){
		$(this).parents().eq(2).fadeOut(50 , function(){
			$(this).siblings(".subEditDialogue").fadeIn(50);
		});
		SubUtil.configEditSub($(this).parents().eq(2));
	});
	
	$("#tasksWrapper").on("click", ".subEditDialogue .subSaveEdit",function(){
		SubUtil.editSub($(this).parent());
	});
	
	$("#tasksWrapper").on("click", ".subEditDialogue .subCancelEdit" , function(){
		$(this).parent().fadeOut(50 , function(){
			$(this).siblings(".subTask").fadeIn(50);
		});
	});
	
	$("#tasksWrapper").on("click", ".subTask .subDelete", function(){
		SubUtil.deleteSub($(this).parents().eq(3));		
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



