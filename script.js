//I've changed HTML id's so this won't work i guess

window.onload = function(){
    var textBox = document.getElementById("taskInput"),
        submitBtn = document.getElementById("submitMain"),
        taskPool = document.getElementById("todoTask"),
        resetBtn = document.getElementById("reset"),
        subtaskArr = [],
        taskArr = [],
        i = 1 ;

    initNodeHelper();
    //initTaskHelper();

    submitBtn.disabled = true;
    resetBtn.disabled = true;

    textBox.addEventListener("keydown" ,function(){		
        if(textBox.value === ""){
                submitBtn.disabled = true;
        } else {
                submitBtn.disabled = false;
        }
    }, true);
		
    submitBtn.addEventListener("click", addTask);
    textBox.addEventListener("keydown", function(evt){
            if(evt.keyCode == 13){
                    addTask();
            }
    });

    resetBtn.addEventListener("click", function(){
            while(taskPool.hasChildNodes()){
                    taskPool.removeChild(taskPool.firstChild);
            }
            taskArr.splice(0,taskArr.length);
            resetBtn.disabled = true;

    });
    
    function addTask(){
        for(j in taskArr){
                if(taskArr[j] == textBox.value){
                        alert("You have entered this task before.");
                        textBox.value = "";
                        textBox.focus();
                        submitBtn.disabled = true;
                        return ;
                }
        }	


        var task = document.createElement("input"); 
        task.id = "task" + i;
        task.type = "checkbox";	

        var taskLabel = document.createElement("label"); 
        taskLabel.htmlFor = "task" + i;
        taskLabel.appendChild(document.createTextNode(textBox.value));

        var deleteBtn = document.createElements.button("delete");
        var undoBtn = document.createElements.button("undo", "none");
        var divideBtn = document.createElements.button("divide");

        var taskContainer = document.createElement("div"); 


        taskContainer.appendChildren(task, taskLabel, deleteBtn, divideBtn, undoBtn);		

        var aWholeTask = document.createElement("div");
        aWholeTask.id = "wholeTask";
        aWholeTask.appendChild(taskContainer);
        taskPool.appendChild(aWholeTask);		

        aWholeTask.addEventListener("click", function(evt){			

                if(evt.target.type == "checkbox" && evt.target.id == task.id){
                        evt.target.disabled = true;	
                        taskLabel.style.textDecoration = "line-through";
                        undoBtn.style.display = "inline";
                        divideBtn.style.display = "none";

                        for(k = 1 ; k < evt.target.parentNode.parentNode.childNodes.length - 1 ; k++){
                                evt.target.parentNode.parentNode.childNodes[k].childNodes[0].checked = true;
                                evt.target.parentNode.parentNode.childNodes[k].childNodes[0].disabled = true;
                                evt.target.parentNode.parentNode.childNodes[k].childNodes[2].style.textDecoration = "line-through";
                        }
                }			

                if(evt.target.id == "delete"){
                        taskArr.splice(taskArr.indexOf(taskLabel.innerHTML),1);
                        taskPool.removeChild(aWholeTask);	
                        if(taskArr.length == 0){
                                resetBtn.disabled = true;
                        }
                        --i;
                }

                if(evt.target.id == "undo"){
                        task.disabled = false;
                        task.checked = false;
                        taskLabel.style.textDecoration = "none";
                        undoBtn.style.display = "none";
                        if(divideBtn.style.display == "none" && aWholeTask.childNodes.length == 1){
                                divideBtn.style.display = "inline";
                        }
                        for(k = 1 ; k < evt.target.parentNode.parentNode.childNodes.length - 1 ; k++){
                               evt.target.parentNode.parentNode.childNodes[k].childNodes[3].style.display = "none";
                        }
                }								

                if(evt.target.id == "divide"){	
                        subtaskArr[evt.target.parentNode.parentNode.id] = new Subtask(evt);
                        subtaskArr[evt.target.parentNode.parentNode.id].add(evt);			
                        evt.target.style.display = "none";
                }


                if(evt.target.id == "submitSub"){
                        subtaskArr[evt.target.parentNode.parentNode.id].processCurrent(evt);						
                }			
        });



        taskArr.push(textBox.value);
        ++i;		
        textBox.value = "";
        textBox.focus();
        submitBtn.disabled = true;
        resetBtn.disabled = false;
    }	

}

