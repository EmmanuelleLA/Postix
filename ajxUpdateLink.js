$(document).ready(function(){
    /*==============================
        JS functions
    ==============================*/
    selectColor();

    jQuery("body").on("click", ".borderImg", function() {
        jQuery(".selectedBorderImg.borderImg").toggleClass("selectedBorderImg");
        jQuery(this).toggleClass("selectedBorderImg");
    });

    jQuery("body").on("click",".send",function(){
        var idLink = jQuery(".idLink").val();
        var title = jQuery(".title").val();
        var content = jQuery(".content").val();
        var size = jQuery("#sizeBar").val();
        var color = jQuery(".selectedBorderImg.borderImg").next().html();

        ajxUpdateLink(idLink, title, content, color, size);
    });

    // Function update Link with 
    function ajxUpdateLink(idLink, title, content, borderColor, size) {
        jsonData = {idLink: idLink, title: title, content: content, borderColor: borderColor, size: size};
        serializedData = JSON.stringify(jsonData);
        jQuery.ajax({
            type: 'POST', 
            url: "ajxUpdateLink.php", 
            dataType: 'json', 
            data: "data=" + serializedData,
            success: function(data) {
                ajxUpdateLinkDone();
            }        
        });       
    }
    
    // Redirect to main page
    function ajxUpdateLinkDone() { 
        document.location.href="index.php";
    }

    function selectColor(){
        var lastColor = jQuery(".borderColor").val();
        var tabColor = document.getElementsByClassName('borderImg');
        for (var i = 0; i < tabColor.length; i++) {
            if(jQuery(tabColor[i]).next().html() == lastColor)
                jQuery(tabColor[i]).toggleClass("selectedBorderImg");
          }
    }
});