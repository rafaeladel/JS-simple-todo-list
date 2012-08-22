function Subtask(){

    var subtaskArr = [];	

    this.add = function(evt){					
        var input = document.createElement("input"), 
            submit = document.createElements.button("submit"),
            container = document.createElement("div"),
            aWholeTask = evt.target.parentNode.parentNode,
            that = this;		

        container.style.marginLeft = "40px";
        input.id = "subtaskInput";
        input.type = "text";

        container.id = "subtaskContainer" ;

        submit.id = "submitSub";
        container.appendChildren(input,submit);				
        aWholeTask.appendChild(container);
        input.focus();		

        input.addEventListener("keydown" , function(evt){
            if(evt.keyCode == 13){
                that.processCurrent(evt);				
            }
        });

    };

    this.processCurrent = function(evt){
        var cInput = evt.target.parentNode.firstChild;	

        if(cInput.value == ""){
            alert("You have to write something.");
            cInput.focus();
            return;
        }

        for(j in subtaskArr){
            if(subtaskArr[j] == cInput.value){
                alert("you have entered this subtask before.");
                cInput.value = "";
                cInput.focus();
                return;
            }
        }				

        var cContainer = evt.target.parentNode,
            cSubmit = cContainer.childNodes[1],
            deleteSub = document.createElements.button("deleteSub"),
            undoSub = document.createElements.button("undoSub");	
            deleteSub.innerHTML = "Delete";		
            undoSub.innerHTML = "Undo";


        cInput.type = "checkbox";				
        var cLabel = document.createElement("label");
        cLabel.htmlFor = cInput.id ;

        cLabel.appendChild(document.createTextNode(cInput.value));
        subtaskArr.push(cLabel.innerHTML);
        cSubmit.style.display = "none";
        cContainer.appendChildren(cLabel, undoSub, deleteSub);

        deleteSub.addEventListener("click" , function(evt){
            subtaskArr.splice(subtaskArr.indexOf(cInput.value) , 1);
            cContainer.parentNode.lastChild.firstChild.focus();
            cContainer.parentNode.removeChild(cContainer);			
        });

        cInput.addEventListener("click" , function(evt){
            cInput.disabled = true;
            cLabel.style.textDecoration = "line-through";
            cContainer.parentNode.lastChild.firstChild.focus();
        });

        undoSub.addEventListener("click", function(evt){
            cInput.disabled = false;
            cInput.checked = false;
            cLabel.style.textDecoration = "none";
            var mainTask = cContainer.parentNode.firstChild ; 
            mainTask.childNodes[0].disabled = false;		
            mainTask.childNodes[0].checked = false;
            mainTask.childNodes[1].style.textDecoration = "none";
            mainTask.lastChild.style.display = "none";
            cContainer.parentNode.lastChild.firstChild.focus();	
        });

        this.add(evt);				
    };	

};	