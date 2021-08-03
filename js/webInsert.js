$(document).ready(function(){

    jQuery("body").on("click",".btnPostit",function(){
        posX = jQuery(".posX").val();
        posY = jQuery(".posY").val();
        document.location.href="webInsertPostit.php?posX="+posX+"&posY="+posY;
       
    });

    jQuery("body").on("click",".btnLink",function(){
        posX = jQuery(".posX").val();
        posY = jQuery(".posY").val();
        document.location.href="webInsertLink.php?posX="+posX+"&posY="+posY;

    });

    jQuery("body").on("click",".btnFile",function(){
        posX = jQuery(".posX").val();
        posY = jQuery(".posY").val();
        document.location.href="webInsertFile.php?posX="+posX+"&posY="+posY;
    });

    jQuery("body").on("click",".btnImage",function(){
        posX = jQuery(".posX").val();
        posY = jQuery(".posY").val();
        document.location.href="webInsertImage.php?posX="+posX+"&posY="+posY;
    });

    jQuery("body").on("click",".btnDrawing",function(){
        posX = jQuery(".posX").val();
        posY = jQuery(".posY").val();
        document.location.href="webInsertDrawing.php?posX="+posX+"&posY="+posY;
    });    

    jQuery("body").on("click",".btnUndelete",function(){
        document.location.href="webUndelete.php";
    });

});
