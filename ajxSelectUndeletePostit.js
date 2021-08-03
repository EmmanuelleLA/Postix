$(document).ready(function(){
    /*==============================================================================
        jQuery events
    ==============================================================================*/
    ajxSelectPostits();
    //==============================================================================

    /*==============================
	JCanvas functions
    ==============================*/
    //Creates a new Postit based on the data sent from php
    function newPostitDeleted(id, title, content, posX, posY) {
        // String to Int
        posX -= 0;
        posY -= 0;
        jQuery('#mainCanvas')
        // Draws the content
        .drawText({
            fillStyle: 'rgba(0, 0, 0, 0.5)',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: false,
            name: "postit" + id + "Content",
            groups: ["postit" + id + "Group"],
            fontSize: '10pt',
            text: content,
            x: posX, y: posY + 20,
            align: 'center',
            respectAlign: true,
            maxWidth: 130
        })
        //Draws the Title
        .drawText({
            fillStyle: 'rgba(0, 0, 0, 0.5)',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: false,
            name: "postit" + id + "Title",
            groups: ["postit" + id + "Group"],
            fontStyle: 'bold',
            fontSize: '15pt',
            text: title,
            x: posX, y: posY - (jQuery('#mainCanvas').measureText("postit" + id + "Content").height / 2),
            align: 'center',
            respectAlign: true,
            maxWidth: 130
        })
        //Draws the Postit form
        .drawRect({
            layer: true,
            name: "postit" + id + "Rect",
            groups: ["postit" + id + "Group"],
            // Hide id Postit
            data:{ idPostit: id, isVisible: 0},
            draggable: false,
            strokeStyle: 'rgba(0, 0, 0, 0.5)',
            strokeWidth: 4,
            x: posX, y: posY,
            width: 150,
            height: jQuery('#mainCanvas').measureText("postit" + id + "Content").height + 30 + jQuery('#mainCanvas').measureText("postit" + id + "Content").height,
            cornerRadius: 10,
            // Create event to update the content
            click: function(layer) {
                ajxUpdateDelete(layer.data.idPostit, layer.data.isVisible);
                inVerseType(layer.data.idPostit);
            },// Create event to update the content
            touchend: function(layer) {
                ajxUpdateDelete(layer.data.idPostit, layer.data.isVisible);
                inVerseType(layer.data.idPostit);
            }
        }).drawLayer();
    }

    //Creates a new Postit based on the data sent from php
    function newPostix(id, title, content, posX, posY) {
        // String to Int
        posX -= 0;
        posY -= 0;
        jQuery('#mainCanvas')
        // Draws the content
        .drawText({
            fillStyle: 'rgba(0, 0, 0, 1)',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: true,
            name: "postit" + id + "Content",
            groups: ["postit" + id + "Group"],
            fontSize: '10pt',
            text: content,
            x: posX, y: posY + 20,
            align: 'center',
            respectAlign: true,
            maxWidth: 130
        })
        //Draws the Title
        .drawText({
            fillStyle: 'rgba(0, 0, 0, 1)',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: false,
            name: "postit" + id + "Title",
            groups: ["postit" + id + "Group"],
            fontStyle: 'bold',
            fontSize: '15pt',
            text: title,
            x: posX, y: posY - (jQuery('#mainCanvas').measureText("postit" + id + "Content").height / 2),
            align: 'center',
            respectAlign: true,
            maxWidth: 130
        })
        //Draws the Postit form
        .drawRect({
            layer: true,
            name: "postit" + id + "Rect",
            groups: ["postit" + id + "Group"],
            // Hide id Postit
            data:{ idPostit: id, isVisible: 1},
            draggable: false,
            strokeStyle: 'rgba(0, 0, 0, 1)',
            strokeWidth: 4,
            x: posX, y: posY,
            width: 150,
            height: jQuery('#mainCanvas').measureText("postit" + id + "Content").height + 30 + jQuery('#mainCanvas').measureText("postit" + id + "Content").height,
            cornerRadius: 10,
            // Create event to update the content
            click: function(layer) {
                ajxUpdateDelete(layer.data.idPostit, layer.data.isVisible);
                inVerseType(layer.data.idPostit);
            },// Create event to update the content
            touchend: function(layer) {
                ajxUpdateDelete(layer.data.idPostit, layer.data.isVisible);
                inVerseType(layer.data.idPostit);
            }
        }).drawLayer();
    }
    
    function inVerseType(id){
        var layerRect = jQuery('#mainCanvas').getLayer("postit" + id + "Rect");
        var layerTitle = jQuery('#mainCanvas').getLayer("postit" + id + "Title");
        var layerContent = jQuery('#mainCanvas').getLayer("postit" + id + "Content");
        if(layerRect.data.isVisible){
            jQuery('#mainCanvas').removeLayerGroup("postit" + id + "Group").drawLayers();
            newPostitDeleted(layerRect.data.idPostit, layerTitle.text, layerContent.text, layerRect.x, layerRect.y);
        }else{
            jQuery('#mainCanvas').removeLayerGroup("postit" + id + "Group").drawLayers();
            newPostix(layerRect.data.idPostit, layerTitle.text, layerContent.text, layerRect.x, layerRect.y);
        }
        // jQuery('#mainCanvas').drawLayers();
    }
    /*==============================
        JS functions
    ==============================*/

    // Get postit from server
    function ajxSelectPostits() {
        serializedData = JSON.stringify({unDelete: true});
        jQuery.ajax({type: 'POST', url: "ajxSelectPostit.php", dataType: 'json', data: "data=" + serializedData,
            success: function(data) {
                ajxSelectPostitsDone(data);
            }
        });
    }
    // Display the postit receive from server
    function ajxSelectPostitsDone(data) {
        for (var val of data) {
            //If the id, posX and posY are recieved, creates Layers
            if(defined(val.idPostit) && defined(val.posX) && defined(val.posY)){
                if(val.isVisible == 1)
                    newPostix(val.idPostit, val.title, val.content, val.posX, val.posY);
                else
                    newPostitDeleted(val.idPostit, val.title, val.content, val.posX, val.posY);    
            }
        }
    }

    // Send to server the new postion of a postit
    function ajxUpdateDelete(id, isVisible){
        serializedData = JSON.stringify({id : id, isVisible: isVisible, typePostit: "postit"});
        jQuery.ajax({type: 'POST', url: "ajxUnDelete.php", dataType: 'json', data: "data=" + serializedData
        });
    }

    // Known if my var is declared
    function defined(myVar) {
        if (typeof myVar != 'undefined') return true;
        return false;
    }

});