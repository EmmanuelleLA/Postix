$(document).ready(function(){


    /*==============================================================================
        jQuery events
    ==============================================================================*/
    ajxSelectLinks();
    window.setInterval(ajxSelectLinks, 3000);
    if(boolMainPage == false)
        document.location.href="index.php";
    //==============================================================================


    /*==============================================================================
        DECL
    ==============================================================================*/
    var lastClickedTime = 0;
    var boolMainPage = true;
    var dragStart = false;
    //==============================================================================


    /*==============================
	JCanvas functions
    ==============================*/
    //Creates a new Link based on the data sent from php
    function newLink(id, title, link, posX, posY, borderColor, size) {
        posX -= 0;
        posY -= 0;
        jQuery('#mainCanvas')
        // Draws the content
        .drawText({
            fillStyle: 'blue',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: true,
            groups: ["link" + id + "Group"],
            dragGroups: ["link" + id + "Group"],
            name: "link" + id + "Content",
            fontSize: '10pt',
            text: link,
            x: posX, y: posY + 20,
            align: 'center',
            respectAlign: true,
            maxWidth: 100
        })
        //Draws the Title
        .drawText({
            fillStyle: 'black',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: true,
            groups: ["link" + id + "Group"],
            dragGroups: ["link" + id + "Group"],
            name: "link" + id + "Title",
            fontStyle: 'bold',
            fontSize: '15pt',
            text: title,
            x: posX, y: posY - (jQuery('#mainCanvas').measureText("link" + id + "Content").height / 2),
            align: 'center',
            respectAlign: true,
            maxWidth: 130
        })
        //Draws the link form
        .drawRect({
            layer: true,
            groups: ["link" + id + "Group"],
            dragGroups: ["link" + id + "Group"],
            name: "link" + id + "Rect",
            // Hide id link
            data:{ idLink: id, link: link},
            strokeStyle: borderColor,
            strokeWidth: 4,
            x: posX, y: posY,
            width: jQuery('#mainCanvas').measureText("link" + id + "Content").width + 10,
            height: jQuery('#mainCanvas').measureText("link" + id + "Content").height + 30 + jQuery('#mainCanvas').measureText("link" + id + "Title").height,
            cornerRadius: 10,
            dragstart: function(layer) {
                dragStart = true;
            },
            dragstop: function(layer) {
                ajxUpdateLinkPosition(layer.data.idLink, layer.x, layer.y);
            },
            // Create event to update or see the LinkName
            click: function(layer) {
                if(isTimeCorrect())
                    ajxUpdateLink(layer.data.idLink);
                else
                    setTimeout(ajxRedirectLink, 300, layer.data.link);

            },// Create event to update or see the LinkName
            touchend: function(layer) {
                if(isTimeCorrect())
                    ajxUpdateLink(layer.data.idLink);
                else
                    setTimeout(ajxRedirectLink, 300, layer.data.link);
            }
        });
    }
    //Moves Postix to the right location
    function moveLink(id, posX, posY) {
        // String to Int
        posX -= 0;
        posY -= 0;
        // Update poitions of Content
        jQuery('#mainCanvas').animateLayer("link" + id + "Content", {
            x: posX, y: posY + 20
        });	
        // Update poitions of title
        jQuery('#mainCanvas').animateLayer("link" + id + "Title", {
            x: posX, y: posY - (jQuery('#mainCanvas').measureText("link" + id + "Content").height / 2),

        });	
        // Update poitions of Form
        jQuery('#mainCanvas').animateLayer("link" + id + "Rect", {
            x: posX, y: posY
        });
    }

    // delete the postix in canvas
    function deletePostix(idLink){
        jQuery('#mainCanvas').removeLayerGroup("link" + idLink + "Group").drawLayers();
    }

    /*==============================
        JS functions
    ==============================*/

    // Get Link from server
    function ajxSelectLinks() {
        serializedData = JSON.stringify({});
        jQuery.ajax({type: 'POST', url: "ajxSelectLink.php", dataType: 'json', data: "data=" + serializedData,
            success: function(data) {
                ajxSelectLinksDone(data);
            }
        });
    }
    // Display the Link receive from server
    function ajxSelectLinksDone(data) {
        for (var val of data) {
            //If the id, posX and posY are recieved, creates Layers
            if(defined(val.idLink) && defined(val.posX) && defined(val.posY)){
                var layerRect = jQuery('#mainCanvas').getLayer("link" + val.idLink + "Rect");
                var layerTitle = jQuery('#mainCanvas').getLayer("link" + val.idLink + "Title");
                var layerContent = jQuery('#mainCanvas').getLayer("link" + val.idLink + "Content");
                val.isVisible -= 0;
                // Check if Link exist
                if(defined(layerRect) && defined(layerTitle) && defined(layerContent)){
                    // If posX is different, change the position same for pos.Y
                    if(layerRect.x != val.posX || layerRect.y != val.posY)
                        moveLink(val.idLink, val.posX, val.posY);
                    // Update title if is different
                    if(layerTitle.text != val.title)
                        layerTitle.text = val.title;
                    // Remove layer from canvas
                    if(val.isVisible == 0)
                        deletePostix(val.idLink);
                }
                //If it never existed create the Link
                else if(val.isVisible == 1)
                    newLink(val.idLink, val.title, val.link, val.posX, val.posY, val.borderColor, val.size);
                jQuery('#mainCanvas').drawLayers();
            }
        }
    }

    // Send to server the new postion of a Link
    function ajxUpdateLinkPosition(idLink, posX, posY){
        serializedData = JSON.stringify({idLink : idLink, posX: posX, posY: posY});
        jQuery.ajax({type: 'POST', url: "ajxUpdateLink.php", dataType: 'json', data: "data=" + serializedData
        });
    }

    // Check if time dblClick is correct
    function isTimeCorrect() {
        // Get Current time
        let timeNow = new Date();
        if (timeNow.getSeconds() - lastClickedTime < 0.2){
            return true;
        }
        lastClickedTime = timeNow.getSeconds();
        return false;
    }

    // Redirect to link sending the id id
    function ajxUpdateLink(idLink){
        document.location.href="webUpdateLink.php?idLink="+idLink;
    }

    function ajxRedirectLink(link){
        if(boolMainPage && !dragStart){
            boolMainPage = false;
            document.location.href=link;
        }else
            dragStart = false;
    }

    // Known if my var is declared
    function defined(myVar) {
        if (typeof myVar != 'undefined') 
            return true;
        return false;
    }

});