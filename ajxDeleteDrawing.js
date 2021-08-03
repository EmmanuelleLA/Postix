$(document).ready(function(){

    // Event when click in submit sup
    jQuery("body").on("click",".sup",function(){
        ajxDeleteDrawing(jQuery(".idDrawing").val())
    });
    
    // Function to delete Drawing
    function ajxDeleteDrawing(idDrawing) {
        jsonData = {idDrawing: idDrawing};
        serializedData = JSON.stringify(jsonData);
        jQuery.ajax({
            type: 'POST', 
            url: "ajxDeleteDrawing.php", 
            dataType: 'json', 
            data: "data=" + serializedData,
            success: function(data) {
                ajxDeleteDrawingDone();
            }        
        });      
    }

    // Redirect to main page
    function ajxDeleteDrawingDone() { 
        document.location.href="index.php";
    }
});
