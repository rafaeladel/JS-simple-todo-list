/*$(function(){
    var mainTaskPanel = $("#InputPanel"),
        mtCounter = 0;
    mainTaskPanel.delay(400).animate({top:-80}, 500);
    mainTaskPanel.hover(
        function(){
            $(this).stop().animate({top:0}, 200);            
        },
        function(){
            //if textbox is active, stop sliding it back up
            if(document.activeElement.id !== 'mainTaskInput'){
                $(this).delay(500).stop().animate({top:-80}, 200);        
            }
        }
    );
        
    $("#mainTaskInput").blur(function(){
        if(document.activeElement.id !== 'InputPanel'){
            $(this).parent().parent().animate({top:-80}, 200);
            console.log(document.activeElement);
        } else {
            console.log("test");
        }
    })
        
    $("#addMain").click(function(){
        var wtContainer = $("<div class='wholeTask'>"),
            mtContainer = $("<div class='mainTask'>"),
            mtCheckbox = $("<input type='checkbox' name='mainTask" + (++mtCounter) + "'>"),
            mtLabel = $("<label for='mainTask" + mtCounter +"'>"),
            mtUndo = $("<button data-btn='mainUndo'>Undo</button>"),
            mtDelete = $("<button data-btn='mainDelete'>Delete</button>"),
            mtDivide = $("<button data-btn='mainDivide'>Divide</button>"),
            mtText = $("#mainTaskInput").val();
            
        mtLabel.text(mtText);
        mtContainer.append(mtCheckbox, mtLabel, mtUndo, mtDelete, mtDivide);
        wtContainer.append(mtContainer);
        $("#wholetasksWrapper").append(wtContainer);
        mainTaskPanel.fadeOut(300, function(){
            $(this).css({top:-80}).show(300);
        })        
    })
    
})*/

$(function(){   
    
    $("#prioritySelect").selectbox();
    
})