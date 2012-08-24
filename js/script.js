$(function(){
    $("#taskInput").delay(400).animate({top:-80}, 500);
    $("#taskInput").hover(
        function(){
            $(this).stop().animate({top:0}, 200);            
        },
        function(){
            //if textbox is active, stop sliding it back up
            if(document.activeElement.id !== 'mainTask'){
                $(this).stop().animate({top:-80}, 200);        
            }
        }
    );    
    
})