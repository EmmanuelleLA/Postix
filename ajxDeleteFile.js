$(document).ready(function(){

    // Event when click in submit sup
    jQuery("body").on("click",".sup",function(){
        ajxDeleteFile(jQuery(".idFile").val())
    });
    
    // Function to delete File
    function ajxDeleteFile(idFile) {
        jsonData = {idFile: idFile};
        serializedData = JSON.stringify(jsonData);
        jQuery.ajax({
            type: 'POST', 
            url: "ajxDeleteFile.php", 
            dataType: 'json', 
            data: "data=" + serializedData,
            success: function(data) {
                ajxDeleteFileDone();
            }        
        });      
    }

    // Redirect to main page
    function ajxDeleteFileDone() { 
        document.location.href="index.php";
    }
});
