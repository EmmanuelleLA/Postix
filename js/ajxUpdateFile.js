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
        var idFile = jQuery(".idFile").val();
        var title = jQuery(".title").val();
        var size = jQuery("#sizeBar").val();
        var color = jQuery(".selectedBorderImg.borderImg").next().html();

        ajxUpdateFile(idFile, title, size, color);
    });

    // Function update File with 
    function ajxUpdateFile(idFile, title, size, borderColor) {
        jsonData = {idFile: idFile, title: title, size: size, borderColor: borderColor};
        serializedData = JSON.stringify(jsonData);
        jQuery.ajax({
            type: 'POST', 
            url: "ajxUpdateFile.php", 
            dataType: 'json', 
            data: "data=" + serializedData,
            success: function(data) {
                ajxUpdateFileDone();
            }        
        });       
    }
    
    // Redirect to main page
    function ajxUpdateFileDone() { 
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