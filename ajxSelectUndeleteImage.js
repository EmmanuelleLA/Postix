$(document).ready(function(){
    /*==============================================================================
        jQuery events
    ==============================================================================*/
    ajxSelectImages();

    //==============================================================================


    /*==============================
	JCanvas functions
    ==============================*/
    //Creates a new Image based on the data sent from php
    function newImage(id, title, imageName, posX, posY) {
        posX -= 0;
        posY -= 0;
        jQuery('#mainCanvas')
        //Draws the Icon
        .drawImage({
            source: 'up/' + imageName,
            layer: true,
            groups: ["image" + id + "Group"],
            name: "image" + id + "Image",
            x: posX, y:posY+20, 
            width: 50, height:50
        })
        //Draws the Title
        .drawText({
            fillStyle: 'rgba(0, 0, 0, 1)',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: false,
            groups: ["image" + id + "Group"],
            name: "image" + id + "Title",
            fontStyle: 'bold',
            fontSize: '15pt',
            text: title,
            x: posX, y: posY - (jQuery('#mainCanvas').getLayer("image" + id + "Image").height / 2),
            align: 'center',
            respectAlign: true,
            maxWidth: 110
        })
        //Draws the Image form
        .drawRect({
            layer: true,
            groups: ["image" + id + "Group"],
            name: "image" + id + "Rect",
            data:{idImage: id, isVisible: 1, nameImage: imageName},
            strokeStyle: "rgba(0, 0, 0, 1)",
            strokeWidth: 4,
            x: posX, y: posY,
            width: 120,
            height: jQuery('#mainCanvas').getLayer("image" + id + "Image").height + 30 + jQuery('#mainCanvas').measureText("image" + id + "Title").height,
            cornerRadius: 10,
            click: function(layer) {
                ajxUpdateDeleteImage(layer.data.idImage, layer.data.isVisible);
                inVerseTypeImage(layer.data.idImage);

            },// Create event to update or see the ImageName
            touchend: function(layer) {
                ajxUpdateDeleteImage(layer.data.idImage, layer.data.isVisible);
                inVerseTypeImage(layer.data.idImage);
            }
        }).drawLayer();
    }
    function newImageDeleted(id, title, imageName, posX, posY) {
        posX -= 0;
        posY -= 0;
        jQuery('#mainCanvas')
        //Draws the Icon
        .drawImage({
            source: 'up/' + imageName,
            layer: true,
            groups: ["image" + id + "Group"],
            name: "image" + id + "Image",
            x: posX, y:posY+20, 
            width: 50, height:50
        })
        //Draws the Title
        .drawText({
            fillStyle: 'rgba(0, 0, 0, 0.5)',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: false,
            groups: ["image" + id + "Group"],
            name: "image" + id + "Title",
            fontStyle: 'bold',
            fontSize: '15pt',
            text: title,
            x: posX, y: posY - (jQuery('#mainCanvas').getLayer("image" + id + "Image").height / 2),
            align: 'center',
            respectAlign: true,
            maxWidth: 110
        })
        //Draws the Image form
        .drawRect({
            layer: true,
            groups: ["image" + id + "Group"],
            name: "image" + id + "Rect",
            data:{idImage: id, isVisible: 0, nameImage: imageName},
            strokeStyle: "rgba(0, 0, 0, 0.5)",
            strokeWidth: 4,
            x: posX, y: posY,
            width: 120,
            height: jQuery('#mainCanvas').getLayer("image" + id + "Image").height + 30 + jQuery('#mainCanvas').measureText("image" + id + "Title").height,
            cornerRadius: 10,
            click: function(layer) {
                ajxUpdateDeleteImage(layer.data.idImage, layer.data.isVisible);
                inVerseTypeImage(layer.data.idImage);

            },// Create event to update or see the ImageName
            touchend: function(layer) {
                ajxUpdateDeleteImage(layer.data.idImage, layer.data.isVisible);
                inVerseTypeImage(layer.data.idImage);
            }
        }).drawLayer();
    }
    function inVerseTypeImage(id){
        var layerRect = jQuery('#mainCanvas').getLayer("image" + id + "Rect");
        var layerTitle = jQuery('#mainCanvas').getLayer("image" + id + "Title");
        if(layerRect.data.isVisible){
            jQuery('#mainCanvas').removeLayerGroup("image" + id + "Group").drawLayers();
            newImageDeleted(layerRect.data.idImage, layerTitle.text, layerRect.data.nameImage, layerRect.x, layerRect.y);
        }else{
            jQuery('#mainCanvas').removeLayerGroup("image" + id + "Group").drawLayers();
            newImage(layerRect.data.idImage, layerTitle.text, layerRect.data.nameImage, layerRect.x, layerRect.y);
        }
    }
    /*==============================
        JS functions
    ==============================*/

    // Get Image from server
    function ajxSelectImages() {
        serializedData = JSON.stringify({unDelete: true});
        jQuery.ajax({type: 'POST', url: "ajxSelectImage.php", dataType: 'json', data: "data=" + serializedData,
            success: function(data) {
                ajxSelectImagesDone(data);
            }
        });
    }
    // Display the Image receive from server
    function ajxSelectImagesDone(data) {
        for (var val of data) {
            if(definedImage(val.idImage) && definedImage(val.posX) && definedImage(val.posY)){
                if(val.isVisible == 1)
                    newImage(val.idImage, val.title, val.imageName, val.posX, val.posY);
                else
                    newImageDeleted(val.idImage, val.title, val.imageName, val.posX, val.posY);
            }
        }
    }

    // Send to server the new postion of a Image
   function ajxUpdateDeleteImage(id, isVisible){
        serializedData = JSON.stringify({id : id, isVisible: isVisible, typePostit: "image"});
        jQuery.ajax({type: 'POST', url: "ajxUnDelete.php", dataType: 'json', data: "data=" + serializedData
        });
    }

    // Known if my var is declared
    function definedImage(myVar) {
        if (typeof myVar != 'undefined') 
            return true;
        return false;
    }

});