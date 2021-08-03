$(document).ready(function(){

    // Event when click in submit sup
    jQuery("body").on("click",".sup",function(){
        ajxDeleteLink(jQuery(".idLink").val())
    });
    
    // Function to delete Link
    function ajxDeleteLink(idLink) {
        jsonData = {idLink: idLink};
        serializedData = JSON.stringify(jsonData);
        jQuery.ajax({
            type: 'POST', 
            url: "ajxDeleteLink.php", 
            dataType: 'json', 
            data: "data=" + serializedData,
            success: function(data) {
                ajxDeleteLinkDone();
            }        
        });      
    }

    // Redirect to main page
    function ajxDeleteLinkDone() { 
        document.location.href="index.php";
    }
});
