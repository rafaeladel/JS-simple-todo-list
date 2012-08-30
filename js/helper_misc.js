var Util = {
	showError : function(msg){		
		$("#errorMSG").slideDown(200).find("p").text(msg);
		$("#errorMSG #closeMSG").click(function(){
			$("#errorMSG").fadeOut(100);
		});
	},
	hideError : function(){
		$("#errorMSG").fadeOut(100);
	}
}