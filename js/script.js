$(function(){   
    var test="";
    $("#prioritySelect").selectbox("disable");
	$(".prioritySelectSub").selectbox();
	$("#prioritySlider").slider({
		min: 0,
		max: 2,
		step:1,		
		orientation:"horizontal",
		create : function(event,ui){
			ui.value = 0 ;
			$(this).siblings().text("Low").css("color","blue");
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
	$(".subTaskWrapper").hide();
	
	$(".subTrigger").toggle(
		function(){
			$(".subTaskWrapper").slideDown(100);
		},
		function(){
			$(".subTaskWrapper").slideUp(100);
		}
	);
	
	$("#mainCatInput").autocomplete({
		source: MainUtil.catArr,
		autoFocus: true
	});
	
	$("#mainTaskInput").focus();
	
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
				if(MainUtil.tasksArr.indexOf(MTLabel) != -1){			
					$(".wholeTask").each(function(){
						var taskLabel = $(this).find(".mainTaskLabel").text();
						if(taskLabel == MTLabel){
							$(this).effect('highlight', {}, 3000);
						}				
					});			
					Util.showError("Task already exists!");			
					return false;
				}
				
				//if everything is ok 
				$(this).parent().fadeOut(100, function(){
					$(this).siblings().fadeIn(100).find("input").val("").focus();
				});	
				Util.hideError();
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
					MainUtil.add(test);					
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
			}
		}
	});
})



