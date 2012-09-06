var Util = {						
	showError : function(msg){
		$("#errorMSG #closeMSG").click(function(){
			$("#errorMSG").stop().fadeOut(100);			
		});
		$("#errorMSG").find("p").text(msg).end().stop().slideDown(200).delay(3000).slideUp(100);		
	},
	calcTaskInfo : function(update){
		var urgentCount = 0 , normalCount = 0, lowCount = 0;
		if(update == true){
			$("#tasksWrapper .wholeTask").each(function(){
				var currentTask = $(this);
				if(currentTask.data("priority") == "urgent"){
					urgentCount++;
				}else if(currentTask.data("priority") == "normal"){
					normalCount++;
				}else if(currentTask.data("priority") == "low"){
					lowCount++;
				}
			});
			MainUtil.totalTasksInfo.tasksPriority["urgent"] = urgentCount;
			MainUtil.totalTasksInfo.tasksPriority["normal"] = normalCount;
			MainUtil.totalTasksInfo.tasksPriority["low"] = lowCount;
		}
		$("#mainTaskInfo").text("All:"+ $("#tasksWrapper .wholeTask").length + " [ Urgent:" + MainUtil.totalTasksInfo.tasksPriority["urgent"] + " | Normal:"+ MainUtil.totalTasksInfo.tasksPriority["normal"] + " | Low:" + MainUtil.totalTasksInfo.tasksPriority["low"] + " ]");
		$("#completedTaskInfo").text("All:" + $("#completedTasks .wholeTask").length);
	},
	getCurrentTime : function(format){
		var now = new Date(),			
			monthArr = ['Jan','Feb','Mar','Apr','May', 'June','July','Aug','Sep', 'Oct','Nov','Dec'],
			currentM = monthArr[now.getMonth()],
			currentD = now.getDate() < 10 ? "0" + now.getDate() : now.getDate(),
			currentY = now.getFullYear();
			
		var hour = now.getHours(),
			meridiem = hour < 12 ? "am" : "pm",
			processedHour = hour > 12 ? hour - 12 : hour,
			currentHr = processedHour == 0 ? 12 : processedHour;

		var minute = now.getMinutes(),
			currentMnt = minute < 10 ? "0" + minute : minute;

		var currentTime = currentM + " " + currentD + ", " + currentY + " at " + currentHr + ":" + currentMnt + meridiem;
		
		if(format == true){
			return currentTime;	
		} else {
			return now.getTime();
		}
	},
	clickOnCheck : function(evt){
		var targetDiv =""
		if($(evt.target).parent().hasClass("remainingSub")){
			targetDiv = ".completedSub";
		} else if($(evt.target).parent().hasClass("completedSub")){
			targetDiv = ".remainingSub";
		}

		$(evt.target).parent()
				.fadeOut(200)
					.parent()
						.siblings(targetDiv)
						.prepend($(evt.target).parent())
						.end()
					.end()
				.find(".optTrigger, .subHolder").toggle()
				.end()
			.fadeIn(100);
	},
	bindMenu : function(evt, section){
		var menuRank = "",
			menuAccomb = "";
		switch(section){
			case "main" : menuRank = ".mainOptions"; menuAccomb = ".subOptions"; break;
			case "sub" : menuRank = ".subOptions"; menuAccomb = ".mainOptions"; break;
		}
		$(menuRank).not($(evt.target).siblings(menuRank)).hide();
		$(".optTrigger").not($(evt.target)).removeClass("active");
		$(menuAccomb).hide();
		$(evt.target).siblings(menuRank).toggle();
		$(evt.target).toggleClass("active");
		evt.stopPropagation();
	}
}