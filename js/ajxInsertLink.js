$(document).ready(function(){
    /*==============================================================================
        jQuery events
    ==============================================================================*/
    // Event to senf the new to server if clicked in submit send
    jQuery("body").on("click", ".borderImg", function() {
        colorSelected = jQuery(this).next().html();
        jQuery(".selectedBorderImg.borderImg").toggleClass("selectedBorderImg");
        jQuery(this).toggleClass("selectedBorderImg");
    });
    jQuery("body").on("click",".btnSend",function(){
        var title = jQuery(".title").val();
        var link = jQuery(".link").val();
        var posX = jQuery(".posX").val();
        var posY = jQuery(".posY").val();
        var size = jQuery("#sizeBar").val();
        var color = jQuery(".selectedBorderImg.borderImg").next().html();

        ajxInsertLink(title, link, posX, posY, size, color);
    });

    // Send different infirmation to insert in server
    function ajxInsertLink(title, content, posX, posY, size, color) {
        jsonData = {title: title, content: content, posX: posX, posY: posY, size: size, borderColor: color};
        serializedData = JSON.stringify(jsonData);
        jQuery.ajax({
            type: 'POST', 
            url: "ajxInsertLink.php", 
            dataType: 'json', 
            data: "data=" + serializedData,    
            success: function(data) {
                ajxInsertLinkDone();
            }   
        });
    }
    
    // Redirect in main page
    function ajxInsertLinkDone() { 
        document.location.href="index.php";
    }
});

