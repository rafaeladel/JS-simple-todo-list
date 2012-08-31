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
			MainUtil.priorityArr["urgent"] = urgentCount;
			MainUtil.priorityArr["normal"] = normalCount;
			MainUtil.priorityArr["low"] = lowCount;
		}
		$("#mainTaskInfo").text("All:"+ $("#tasksWrapper .wholeTask").length + " [ Urgent:" + MainUtil.priorityArr["urgent"] + " | Normal:"+ MainUtil.priorityArr["normal"] + " | Low:" + MainUtil.priorityArr["low"] + " ]");
		$("#completedTaskInfo").text("All:" + $("#completedTasks .wholeTask").length);
	}	
}