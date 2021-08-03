$(document).ready(function(){

    /*==============================================================================
        jQuery events
    ==============================================================================*/
    ajxSelectLinks();
    //==============================================================================


    /*==============================
	JCanvas functions
    ==============================*/
    //Creates a new Link based on the data sent from php
    function newLink(id, title, link, posX, posY) {
        posX -= 0;
        posY -= 0;
        jQuery('#mainCanvas')
        // Draws the content
        .drawText({
            fillStyle: 'rgba(0, 0, 0, 1)',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: false,
            groups: ["link" + id + "Group"],
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
            fillStyle: 'rgba(0, 0, 0, 1)',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: false,
            groups: ["link" + id + "Group"],
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
            name: "link" + id + "Rect",
            // Hide id link
            data:{ idLink: id, isVisible: 1},
            strokeStyle: "rgba(0, 0, 0, 1)",
            strokeWidth: 4,
            x: posX, y: posY,
            width: jQuery('#mainCanvas').measureText("link" + id + "Content").width + 10,
            height: jQuery('#mainCanvas').measureText("link" + id + "Content").height + 30 + jQuery('#mainCanvas').measureText("link" + id + "Title").height,
            cornerRadius: 10,
            // Create event to update or see the LinkName
            click: function(layer) {
                ajxUpdateDelete(layer.data.idLink, layer.data.isVisible);
                inVerseType(layer.data.idLink);
            
            },// Create event to update or see the LinkName
            touchend: function(layer) {
                ajxUpdateDelete(layer.data.idLink, layer.data.isVisible);
                inVerseType(layer.data.idLink);
            }
        }).drawLayer();
    }

    function newLinkDeleted(id, title, link, posX, posY) {
        posX -= 0;
        posY -= 0;
        jQuery('#mainCanvas')
        // Draws the content
        .drawText({
            fillStyle: 'rgba(0, 0, 0, 0.5)',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: false,
            groups: ["link" + id + "Group"],
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
            fillStyle: 'rgba(0, 0, 0, 0.5)',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: false,
            groups: ["link" + id + "Group"],
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
            name: "link" + id + "Rect",
            // Hide id link
            data:{ idLink: id,  isVisible: 0},
            strokeStyle: "rgba(0, 0, 0, 0.5)",
            strokeWidth: 4,
            x: posX, y: posY,
            width: jQuery('#mainCanvas').measureText("link" + id + "Content").width + 10,
            height: jQuery('#mainCanvas').measureText("link" + id + "Content").height + 30 + jQuery('#mainCanvas').measureText("link" + id + "Title").height,
            cornerRadius: 10,
            // Create event to update or see the LinkName
            click: function(layer) {
                ajxUpdateDelete(layer.data.idLink, layer.data.isVisible);
                inVerseType(layer.data.idLink);
            },// Create event to update or see the LinkName
            touchend: function(layer) {
                ajxUpdateDelete(layer.data.idLink, layer.data.isVisible);
                inVerseType(layer.data.idLink);                
            }
        }).drawLayer();
    }

    function inVerseType(id){
        var layerRect = jQuery('#mainCanvas').getLayer("link" + id + "Rect");
        var layerTitle = jQuery('#mainCanvas').getLayer("link" + id + "Title");
        var layerContent = jQuery('#mainCanvas').getLayer("link" + id + "Content");
        if(layerRect.data.isVisible){
            jQuery('#mainCanvas').removeLayerGroup("link" + id + "Group").drawLayers();
            newLinkDeleted(layerRect.data.idLink, layerTitle.text, layerContent.text, layerRect.x, layerRect.y);
        }else{
            jQuery('#mainCanvas').removeLayerGroup("link" + id + "Group").drawLayers();
            newLink(layerRect.data.idLink, layerTitle.text, layerContent.text, layerRect.x, layerRect.y);
        }
    }

    /*==============================
        JS functions
    ==============================*/

    // Get Link from server
    function ajxSelectLinks() {
        serializedData = JSON.stringify({unDelete: true});
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
                if(val.isVisible == 1)
                    newLink(val.idLink, val.title, val.link, val.posX, val.posY);
                else    
                    newLinkDeleted(val.idLink, val.title, val.link, val.posX, val.posY);
            }
        }
    }

    // Send to server the new postion of a Link
    function ajxUpdateDelete(id, isVisible){
        serializedData = JSON.stringify({id : id, isVisible: isVisible, typePostit: "link"});
        jQuery.ajax({type: 'POST', url: "ajxUnDelete.php", dataType: 'json', data: "data=" + serializedData
        });
    }


    // Known if my var is declared
    function defined(myVar) {
        return (typeof myVar != 'undefined') ;
    }

});