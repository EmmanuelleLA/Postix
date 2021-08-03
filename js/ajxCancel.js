$(document).ready(function(){
    /*==============================================================================
        jQuery events
    ==============================================================================*/
    // Event to go back if clicked in submit cancel
    jQuery("body").on("click", ".negate", function(){
        document.location.href="index.php";
    });
});
