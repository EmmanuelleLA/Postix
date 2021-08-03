$(document).ready(function(){


    /*==============================================================================
        jQuery events
    ==============================================================================*/
    ajxSelectFiles();
    window.setInterval(ajxSelectFiles, 3000);
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
    //Creates a new File based on the data sent from php
    function newFile(id, title, fileName, posX, posY, extFile, borderColor) {
        posX -= 0;
        posY -= 0;
        jQuery('#mainCanvas')
        //Draws the Icon
        .drawImage({
            source: 'medias/' + extFile,
            layer: true,
            groups: ["file" + id + "Group"],
            dragGroups: ["file" + id + "Group"],
            name: "file" + id + "Image",
            x: posX, y:posY+20, 
            width: 50, height:50
        })
        //Draws the Title
        .drawText({
            fillStyle: 'black',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: true,
            groups: ["file" + id + "Group"],
            dragGroups: ["file" + id + "Group"],
            name: "file" + id + "Title",
            fontStyle: 'bold',
            fontSize: '15pt',
            text: title,
            x: posX, y: posY - (jQuery('#mainCanvas').getLayer("file" + id + "Image").height / 2),
            align: 'center',
            respectAlign: true,
            maxWidth: 110
        })
        //Draws the File form
        .drawRect({
            layer: true,
            groups: ["file" + id + "Group"],
            dragGroups: ["file" + id + "Group"],
            name: "file" + id + "Rect",
            data:{idFile: id, nameFile: fileName},
            strokeStyle: borderColor,
            strokeWidth: 4,
            x: posX, y: posY,
            width: 120,
            height: jQuery('#mainCanvas').getLayer("file" + id + "Image").height + 30 + jQuery('#mainCanvas').measureText("file" + id + "Title").height,
            cornerRadius: 10,
            dragstart: function(layer) {
                dragStart = true;
            },
            dragstop: function(layer) {
                ajxUpdateFilePosition(layer.data.idFile, layer.x, layer.y);
            },
            // Create event to update or see the fileName
            click: function(layer) {
                if(isTimeCorrect())
                    ajxUpdateFile(layer.data.idFile);
                else
                    setTimeout(ajxRedirectFile, 300, layer.data.nameFile);

            },// Create event to update or see the fileName
            touchend: function(layer) {
                if(isTimeCorrect())
                    ajxUpdateFile(layer.data.idFile);
                else
                    setTimeout(ajxRedirectFile, 300, layer.data.nameFile);

            }
        });
    }

    //Moves Postix to the right location
    function moveFile(id, posX, posY) {
        posX -= 0;
        posY -= 0;
        jQuery('#mainCanvas').animateLayer("file" + id + "Title", {
            x: posX, y: posY - jQuery('#mainCanvas').getLayer("file" + id + "Image").height / 2
        });	
        jQuery('#mainCanvas').animateLayer("file" + id + "Image", {
            x: posX, y: posY+20
        });	
        jQuery('#mainCanvas').animateLayer("file" + id + "Rect", {
            x: posX, y: posY
        });
    }

    // delete the postix in canvas
    function deletePostix(idFile){
        jQuery('#mainCanvas').removeLayerGroup("file" + idFile + "Group").drawLayers();
    }

    /*==============================
        JS functions
    ==============================*/

    // Get File from server
    function ajxSelectFiles() {
        serializedData = JSON.stringify({});
        jQuery.ajax({type: 'POST', url: "ajxSelectFile.php", dataType: 'json', data: "data=" + serializedData,
            success: function(data) {
                ajxSelectFilesDone(data);
            }
        });
    }
    // Display the file receive from server
    function ajxSelectFilesDone(data) {
        for (var val of data) {
            //If the id, posX and posY are recieved, creates Layers
            if(defined(val.idFile) && defined(val.posX) && defined(val.posY)){
                var layerRect = jQuery('#mainCanvas').getLayer("file" + val.idFile + "Rect");
                var layerTitle = jQuery('#mainCanvas').getLayer("file" + val.idFile + "Title");
                var layerImage = jQuery('#mainCanvas').getLayer("file" + val.idFile + "Image");
                val.isVisible -= 0;
                // Check if File exist
                if(defined(layerRect) && defined(layerTitle) && defined(layerImage)){
                    // If posX is different, change the position same for pos.Y
                    if(layerRect.x != val.posX || layerRect.y != val.posY)
                        moveFile(val.idFile, val.posX, val.posY);
                    // Update title if is different
                    if(layerTitle.text != val.title)
                        layerTitle.text = val.title;
                    // Remove layer from canvas
                    if(val.isVisible == 0)
                        deletePostix(val.idFile);
                }
                //If it never existed create the File
                else if(val.isVisible == 1)
                    newFile(val.idFile, val.title, val.fileName, val.posX, val.posY, val.extFile, val.borderColor);
                jQuery('#mainCanvas').drawLayers();
            }
        }
    }

    // Send to server the new postion of a File
    function ajxUpdateFilePosition(idFile, posX, posY){
        serializedData = JSON.stringify({idFile : idFile, posX: posX, posY: posY});
        jQuery.ajax({type: 'POST', url: "ajxUpdateFile.php", dataType: 'json', data: "data=" + serializedData
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

    // Redirect to webUpdateFile.php sending the id file
    function ajxUpdateFile(idFile){
        document.location.href="webUpdateFile.php?idFile="+idFile;
    }

    function ajxRedirectFile(fileName){
        if(boolMainPage && !dragStart){
            boolMainPage = false;
            document.location.href = "up/" + fileName;
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