$(document).ready(function(){


    /*==============================================================================
        jQuery events
    ==============================================================================*/
    ajxSelectImages();
    window.setInterval(ajxSelectImages, 3000);
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
    //Creates a new Image based on the data sent from php
    function newImage(id, title, imageName, posX, posY, borderColor, size) {
        posX -= 0;
        posY -= 0;
        jQuery('#mainCanvas')
        //Draws the Icon
        .drawImage({
            source: 'up/' + imageName,
            layer: true,
            groups: ["image" + id + "Group"],
            dragGroups: ["image" + id + "Group"],
            name: "image" + id + "Image",
            x: posX, y:posY+20, 
            width: 50, height:50
        })
        //Draws the Title
        .drawText({
            fillStyle: 'black',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: true,
            groups: ["image" + id + "Group"],
            dragGroups: ["image" + id + "Group"],
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
            dragGroups: ["image" + id + "Group"],
            name: "image" + id + "Rect",
            data:{idImage: id, nameImage: imageName},
            strokeStyle: borderColor,
            strokeWidth: 4,
            x: posX, y: posY,
            width: 120,
            height: jQuery('#mainCanvas').getLayer("image" + id + "Image").height + 30 + jQuery('#mainCanvas').measureText("image" + id + "Title").height,
            cornerRadius: 10,
            dragstart: function(layer) {
                dragStart = true;
            },
            dragstop: function(layer) {
                ajxUpdateImagePosition(layer.data.idImage, layer.x, layer.y);
            },
            // Create event to update or see the ImageName
            click: function(layer) {
                if(isTimeCorrect())
                    ajxUpdateImage(layer.data.idImage);
                else
                    setTimeout(ajxRedirectImage, 300, layer.data.nameImage);

            },// Create event to update or see the ImageName
            touchend: function(layer) {
                if(isTimeCorrect())
                    ajxUpdateImage(layer.data.idImage);
                else
                    setTimeout(ajxRedirectImage, 300, layer.data.nameImage);

            }
        });
    }

    //Moves Postix to the right location
    function moveImage(id, posX, posY) {
        posX -= 0;
        posY -= 0;
        jQuery('#mainCanvas').animateLayer("image" + id + "Title", {
            x: posX, y: posY - jQuery('#mainCanvas').getLayer("image" + id + "Image").height / 2
        });	
        jQuery('#mainCanvas').animateLayer("image" + id + "Image", {
            x: posX, y: posY+20
        });	
        jQuery('#mainCanvas').animateLayer("image" + id + "Rect", {
            x: posX, y: posY
        });
    }

    // delete the postix in canvas
    function deletePostix(idImage){
        jQuery('#mainCanvas').removeLayerGroup("image" + idImage + "Group").drawLayers();
    }

    /*==============================
        JS functions
    ==============================*/

    // Get Image from server
    function ajxSelectImages() {
        serializedData = JSON.stringify({});
        jQuery.ajax({type: 'POST', url: "ajxSelectImage.php", dataType: 'json', data: "data=" + serializedData,
            success: function(data) {
                ajxSelectImagesDone(data);
            }
        });
    }
    // Display the Image receive from server
    function ajxSelectImagesDone(data) {
        for (var val of data) {
            //If the id, posX and posY are recieved, creates Layers
            if(defined(val.idImage) && defined(val.posX) && defined(val.posY)){
                var layerRect = jQuery('#mainCanvas').getLayer("image" + val.idImage + "Rect");
                var layerTitle = jQuery('#mainCanvas').getLayer("image" + val.idImage + "Title");
                var layerImage = jQuery('#mainCanvas').getLayer("image" + val.idImage + "Image");
                val.isVisible -= 0;
                // Check if image exist
                if(defined(layerRect) && defined(layerTitle) && defined(layerImage)){
                    // If posX is different, change the position same for pos.Y
                    if(layerRect.x != val.posX || layerRect.y != val.posY)
                        moveImage(val.idImage, val.posX, val.posY);
                    // Update title if is different
                    if(layerTitle.text != val.title)
                        layerTitle.text = val.title;
                    // Remove layer from canvas
                    if(val.isVisible == 0)
                        deletePostix(val.idImage);
                }
                //If it never existed create the Image
                else if(val.isVisible == 1)
                    newImage(val.idImage, val.title, val.imageName, val.posX, val.posY, val.borderColor, val.size);
                jQuery('#mainCanvas').drawLayers();
            }
        }
    }

    // Send to server the new postion of a Image
    function ajxUpdateImagePosition(idImage, posX, posY){
        serializedData = JSON.stringify({idImage : idImage, posX: posX, posY: posY});
        jQuery.ajax({type: 'POST', url: "ajxUpdateImage.php", dataType: 'json', data: "data=" + serializedData
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

    // Redirect to webUpdateImage.php sending the id Image
    function ajxUpdateImage(idImage){
        document.location.href="webUpdateImage.php?idImage="+idImage;
    }

    function ajxRedirectImage(imageName){
        if(boolMainPage && !dragStart){
            boolMainPage = false;
            document.location.href = "up/" + imageName;
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