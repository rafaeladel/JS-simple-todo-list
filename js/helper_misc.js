var Util = {					
	showError : function(msg){		
		$("#errorMSG").slideDown(200).find("p").text(msg);
		$("#errorMSG #closeMSG").click(function(){
			$("#errorMSG").fadeOut(100);
		});
	},
	hideError : function(){
		$("#errorMSG").fadeOut(100);
	},
	calcTaskInfo : function(update){
		var urgentCount = 0 , normalCount = 0, lowCount = 0;
		if(update == true){
			$("#tasksWrapper .wholeTask").each(function(){
				var currentTask = $(this);
				if(currentTask.attr("data-priority") == "urgent"){
					urgentCount++;
				}else if(currentTask.attr("data-priority") == "normal"){
					normalCount++;
				}else if(currentTask.attr("data-priority") == "low"){
					lowCount++;
				}
			});
			MainUtil.totalTasksInfo.tasksPriority["urgent"] = urgentCount;
			MainUtil.totalTasksInfo.tasksPriority["normal"] = normalCount;
			MainUtil.totalTasksInfo.tasksPriority["low"] = lowCount;
		}
		$("#mainTaskInfo").text("All:"+ $("#tasksWrapper .wholeTask").length + " [ Urgent:" + MainUtil.totalTasksInfo.tasksPriority["urgent"] + " | Normal:"+ MainUtil.totalTasksInfo.tasksPriority["normal"] + " | Low:" + MainUtil.totalTasksInfo.tasksPriority["low"] + " ]");
		$("#completedTaskInfo").text("All:" + $("#completedTasks .wholeTask").length);
	}	
}