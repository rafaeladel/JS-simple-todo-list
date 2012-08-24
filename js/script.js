$(function(){
    $("#taskInput").delay(400).animate({top:-80}, 500);
    $("#taskInput").hover(
        function(){
            $(this).stop().animate({top:0}, 200);            
        },
        function(){
            if(document.activeElement.id !== 'mainTask'){
                $(this).stop().animate({top:-80}, 200);        
            }
        }
    );    
    
})