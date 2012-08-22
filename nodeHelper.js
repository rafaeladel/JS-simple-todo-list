var initNodeHelper = function() {
	Node.prototype.createElements = {			
			checkbox : function(){
				var CBElement = document.createElement("input");
				CBElement.type= "checkbox";	
				return CBElement;
			},			
		
			button : function(btnID){
				var newBtn = document.createElement("a");
				newBtn.id = btnID;
				newBtn.innerHTML = btnID.charAt(0).toUpperCase() + btnID.slice(1);
				newBtn.className = "dynamicButton";
				if(arguments[1]){
					newBtn.style.display = arguments[1];
				}
				
				return newBtn;
			}	
	}
	
	Node.prototype.appendChildren = function (){
		for(i=0 ; i < arguments.length ; i++){
			var docFrag = document.createDocumentFragment();
			docFrag.appendChild(arguments[i]);
			this.appendChild(docFrag);			
		}
	}
}