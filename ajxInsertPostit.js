$(document).ready(function(){
    /*==============================================================================
        jQuery events
    ==============================================================================*/
    jQuery("body").on("click", ".borderImg", function() {
        colorSelected = jQuery(this).next().html();
        jQuery(".selectedBorderImg.borderImg").toggleClass("selectedBorderImg");
        jQuery(this).toggleClass("selectedBorderImg");
    });
    
    // Event to senf the new to server if clicked in submit send
    jQuery("body").on("click",".btnSend",function(){
        var title = jQuery(".title").val();
        var content = jQuery(".content").val();
        var posX = jQuery(".posX").val();
        var posY = jQuery(".posY").val();
        var size = jQuery("#sizeBar").val();
        var color = jQuery(".selectedBorderImg.borderImg").next().html();

        ajxInsertPostit(title, content, size, posX, posY, color);
    });

    // Send different infirmation to insert in server
    function ajxInsertPostit(title, content, size, posX, posY, color) {
        jsonData = {title: title, content: content, size: size, posX: posX, posY: posY, borderColor: color};
        serializedData = JSON.stringify(jsonData);
        jQuery.ajax({
            type: 'POST', 
            url: "ajxInsertPostit.php", 
            dataType: 'json', 
            data: "data=" + serializedData,    
            success: function(data) {
                ajxInsertPostitDone();
            }   
        });
    }
    
    // Redirect in main page
    function ajxInsertPostitDone() { 
        document.location.href="index.php";
    }
});