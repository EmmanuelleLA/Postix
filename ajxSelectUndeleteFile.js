$(document).ready(function(){
    /*==============================================================================
        jQuery events
    ==============================================================================*/
    ajxSelectFiles();
    //==============================================================================

    /*==============================
	JCanvas functions
    ==============================*/
    //Creates a new File based on the data sent from php
    function newFile(id, title, posX, posY, extFile) {
        posX -= 0;
        posY -= 0;
        jQuery('#mainCanvas')
        //Draws the Icon
        .drawImage({
            source: 'medias/' + extFile,
            layer: true,
            draggable: false,
            groups: ["file" + id + "Group"],
            name: "file" + id + "Image",
            x: posX, y:posY+20, 
            width: 50, height:50
        })
        //Draws the Title
        .drawText({
            fillStyle: 'rgba(0, 0, 0, 1)',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: false,
            groups: ["file" + id + "Group"],
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
            name: "file" + id + "Rect",
            draggable: false,
            data:{idFile: id, isVisible: 1, extFile: extFile},
            strokeStyle: 'rgba(0, 0, 0, 1)',
            strokeWidth: 4,
            x: posX, y: posY,
            width: 120,
            height: jQuery('#mainCanvas').getLayer("file" + id + "Image").height + 30 + jQuery('#mainCanvas').measureText("file" + id + "Title").height,
            cornerRadius: 10,
            // Create event to update or see the fileName
            click: function(layer) {
                ajxUpdateDelete(layer.data.idFile, layer.data.isVisible);
                inVerseType(layer.data.idFile);
            },// Create event to update or see the fileName
            touchend: function(layer) {
                ajxUpdateDelete(layer.data.idFile, layer.data.isVisible);
                inVerseType(layer.data.idFile);
            }
        }).drawLayer();
    }
    function newFileDeleted(id, title, posX, posY, extFile) {
        posX -= 0;
        posY -= 0;
        jQuery('#mainCanvas')
        //Draws the Icon
        .drawImage({
            source: 'medias/' + extFile,
            layer: true,
            draggable: false,
            groups: ["file" + id + "Group"],
            name: "file" + id + "Image",
            x: posX, y:posY+20, 
            width: 50, height:50
        })
        //Draws the Title
        .drawText({
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: false,
            groups: ["file" + id + "Group"],
            name: "file" + id + "Title",
            fontStyle: 'bold',
            fontSize: '15pt',
            text: title,
            x: posX, y: posY - (jQuery('#mainCanvas').getLayer("file" + id + "Image").height / 2),
            align: 'center',
            respectAlign: true,
            fillStyle: 'rgba(0, 0, 0, 0.5)',
            maxWidth: 110
        })
        //Draws the File form
        .drawRect({
            layer: true,
            groups: ["file" + id + "Group"],
            name: "file" + id + "Rect",
            draggable: false,
            data:{idFile: id, isVisible: 0, extFile: extFile},
            strokeWidth: 4,
            x: posX, y: posY,
            width: 120,
            height: jQuery('#mainCanvas').getLayer("file" + id + "Image").height + 30 + jQuery('#mainCanvas').measureText("file" + id + "Title").height,
            cornerRadius: 10,
            strokeStyle: 'rgba(0, 0, 0, 0.5)',
            // Create event to update or see the fileName
            click: function(layer) {
                ajxUpdateDelete(layer.data.idFile, layer.data.isVisible);
                inVerseType(layer.data.idFile);
            },// Create event to update or see the fileName
            touchend: function(layer) {
                ajxUpdateDelete(layer.data.idFile, layer.data.isVisible);
                inVerseType(layer.data.idFile);
            }
        }).drawLayer();
    }

    function inVerseType(id){
        var layerRect = jQuery('#mainCanvas').getLayer("file" + id + "Rect");
        var layerTitle = jQuery('#mainCanvas').getLayer("file" + id + "Title");
        if(layerRect.data.isVisible){
            jQuery('#mainCanvas').removeLayerGroup("file" + id + "Group").drawLayers();
            newFileDeleted(id, layerTitle.text, layerRect.x, layerRect.y, layerRect.data.extFile);
        }else{
            jQuery('#mainCanvas').removeLayerGroup("file" + id + "Group").drawLayers();
            newFile(id, layerTitle.text, layerRect.x, layerRect.y, layerRect.data.extFile);
        }
    }

    /*==============================
        JS functions
    ==============================*/

    // Get File from server
    function ajxSelectFiles() {
        serializedData = JSON.stringify({unDelete: true});
        jQuery.ajax({type: 'POST', url: "ajxSelectFile.php", dataType: 'json', data: "data=" + serializedData,
            success: function(data) {
                ajxSelectFilesDone(data);
            }
        });
    }
    // Display the file receive from server
    function ajxSelectFilesDone(data) {
        for (var val of data) {
            if(defined(val.idFile) && defined(val.posX) && defined(val.posY)){
                //If the id, posX and posY are recieved, creates Layers
                if(val.isVisible == 1)
                    newFile(val.idFile, val.title, val.posX, val.posY, val.extFile);
                else
                    newFileDeleted(val.idFile, val.title, val.posX, val.posY, val.extFile);    
            }
        }
    }

    // Send to server the new postion of a postit
    function ajxUpdateDelete(id, isVisible){
        serializedData = JSON.stringify({id : id, isVisible: isVisible, typePostit: "file"});
        jQuery.ajax({type: 'POST', url: "ajxUnDelete.php", dataType: 'json', data: "data=" + serializedData
        });
    }
    
    // Known if my var is declared
    function defined(myVar) {
        if (typeof myVar != 'undefined') 
            return true;
        return false;
    }

});