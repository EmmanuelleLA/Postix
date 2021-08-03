$(document).ready(function(){

    // Event when click in submit sup
    jQuery("body").on("click",".sup",function(){
        ajxDeletePostit(jQuery(".idPostit").val())
    });
    
    // Function to delete postit
    function ajxDeletePostit(idPostit) {
        jsonData = {idPostit: idPostit};
        serializedData = JSON.stringify(jsonData);
        jQuery.ajax({
            type: 'POST', 
            url: "ajxDeletePostit.php", 
            dataType: 'json', 
            data: "data=" + serializedData,
            success: function(data) {
                ajxDeletePostitDone();
            }        
        });      
    }

    // Redirect to main page
    function ajxDeletePostitDone() { 
        document.location.href="index.php";
    }
});
