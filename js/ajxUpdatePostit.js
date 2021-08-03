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
        var idPostit = jQuery(".idPostit").val();
        var title = jQuery(".title").val();
        var content = jQuery(".content").val();
        var size = jQuery("#sizeBar").val();
        var color = jQuery(".selectedBorderImg.borderImg").next().html();

        ajxUpdatePostit(idPostit, title, content, size, color);
    });

    // Function update postit with content
    function ajxUpdatePostit(idPostit, title, content, size, borderColor) {
        jsonData = {idPostit: idPostit, title: title, content: content, size: size, borderColor: borderColor};
        serializedData = JSON.stringify(jsonData);
        jQuery.ajax({
            type: 'POST', 
            url: "ajxUpdatePostit.php", 
            dataType: 'json', 
            data: "data=" + serializedData,
            success: function(data) {
                ajxUpdatePostitDone();
            }        
        });       
    }
    
    // Redirect to main page
    function ajxUpdatePostitDone() { 
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