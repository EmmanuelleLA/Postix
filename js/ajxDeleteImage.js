$(document).ready(function(){

    // Event when click in submit sup
    jQuery("body").on("click",".sup",function(){
        ajxDeleteImage(jQuery(".idImage").val())
    });
    
    // Function to delete Image
    function ajxDeleteImage(idImage) {
        jsonData = {idImage: idImage};
        serializedData = JSON.stringify(jsonData);
        jQuery.ajax({
            type: 'POST', 
            url: "ajxDeleteImage.php", 
            dataType: 'json', 
            data: "data=" + serializedData,
            success: function(data) {
                ajxDeleteImageDone();
            }        
        });      
    }

    // Redirect to main page
    function ajxDeleteImageDone() { 
        document.location.href="index.php";
    }
});
