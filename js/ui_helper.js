$(function(){
    var test="";
	$(".prioritySelectSub").slider();
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
		source: MainUtil.totalTasksInfo.tasksCat,
		autoFocus: true
	});		
	
	var icons = {
		header: "ui-icon-circle-arrow-e",
		headerSelected: "ui-icon-circle-arrow-s"
	};
	$("#taskPool").accordion({
		icons: icons,		
		autoHeight:false	
	});
	
	$("#mainTaskInput").focus();
});