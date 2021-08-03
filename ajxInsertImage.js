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
        var posX = jQuery(".posX").val();
        var posY = jQuery(".posY").val();
        var size = jQuery("#sizeBar").val();
        var color = jQuery(".selectedBorderImg.borderImg").next().html();
        ajaxInsertImage(title, posX, posY, size, color);
    });

    function ajaxInsertImage(title, posX, posY, size, color) {
        // Function upload en cliquand sur le boutton Upload
        var formData = new FormData();               
        formData.append('file', jQuery("#uploadImage")[0].files[0]);     
        formData.append('title', title);   
        formData.append('posX', posX);   
        formData.append('posY', posY);   
        formData.append('size', size);   
        formData.append('borderColor', color);   
        jQuery.ajax({
            url: 'ajxUploadImage.php', // point to server-side PHP script 
            dataType: 'json',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false, 
            data: formData,              
            type: 'post',
            success: function(data){
                ajxInsertImageDone();
            }
        });
    }
    
    // Redirect in main page
    function ajxInsertImageDone() { 
        document.location.href="index.php";
    }
});