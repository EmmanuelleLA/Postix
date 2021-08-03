$(document).ready(function(){


    /*==============================================================================
        jQuery events
    ==============================================================================*/
    drawBackground();
    ajxSelectPostits();
    window.setInterval(ajxSelectPostits, 3000);
    //==============================================================================


    /*==============================================================================
        DECL
    ==============================================================================*/
    var lastClickedTime = 0;
    //==============================================================================


    /*==============================
	JCanvas functions
    ==============================*/
    //Creates a new Postit based on the data sent from php
    function newPostix(id, title, content, posX, posY, borderColor, size) {
        // String to Int
        posX -= 0;
        posY -= 0;
        jQuery('#mainCanvas')
        // Draws the content
        .drawText({
            fillStyle: 'black',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: true,
            groups: ["postit" + id + "Group"],
            dragGroups: ["postit" + id + "Group"],
            name: "postit" + id + "Content",
            fontSize: '10pt',
            text: content,
            x: posX, y: posY + 20,
            align: 'center',
            respectAlign: true,
            maxWidth: 130
        })
        //Draws the Title
        .drawText({
            fillStyle: 'black',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: true,
            groups: ["postit" + id + "Group"],
            dragGroups: ["postit" + id + "Group"],
            name: "postit" + id + "Title",
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
            groups: ["postit" + id + "Group"],
            dragGroups: ["postit" + id + "Group"],
            name: "postit" + id + "Rect",
            // Hide id Postit
            data:{ idPostit: id },
            strokeStyle: borderColor,
            strokeWidth: 4,
            x: posX, y: posY,
            width: 150,
            height: jQuery('#mainCanvas').measureText("postit" + id + "Content").height + 30 + jQuery('#mainCanvas').measureText("postit" + id + "Content").height,
            cornerRadius: 10,
            // Create events for move postit
            dragstop: function(layer) {
                ajxUpdatePostitPosition(layer.data.idPostit, layer.x, layer.y);
            },
            // Create event to update the content
            click: function(layer) {
                if(isTimeCorrect()){
                    ajxUpdatePostit(layer.data.idPostit);
                }
            },// Create event to update the content
            touchend: function(layer) {
                if(isTimeCorrect()){
                    ajxUpdatePostit(layer.data.idPostit);
                }
            }
        });
    }
    
    // Display a Background for the canvas
    function drawBackground(){
        jQuery('#mainCanvas').drawRect({
            layer: true,
            x: 0, y: 0,
            width: getWidth()+2000, height:  getHeight()+3000,
            // Create event to create a new postit to this postion
            click: function(layer) {
                // Get mouse postion
                if(isTimeCorrect()){
                    var mouseX = event.pageX - document.querySelector("#mainCanvas").getBoundingClientRect().left;
                    var mouseY = event.pageY - document.querySelector("#mainCanvas").getBoundingClientRect().top;
                    mouseX = Math.round(mouseX);
                    mouseY = Math.round(mouseY);
                    ajxRedirectInsert(mouseX, mouseY);
                }
            },
            touchend: function(layer) {
                // Get mouse postion
                if(isTimeCorrect()){
                    var mouseX = event.pageX - document.querySelector("#mainCanvas").getBoundingClientRect().left;
                    var mouseY = event.pageY - document.querySelector("#mainCanvas").getBoundingClientRect().top;
                    mouseX = Math.round(mouseX);
                    mouseY = Math.round(mouseY);
                    ajxRedirectInsert(mouseX, mouseY);
                }
            }
        });
    }

    //Moves Postix to the right location
    function movePostix(id, posX, posY) {
        // String to Int
        posX -= 0;
        posY -= 0;
        // Update poitions of Content
        jQuery('#mainCanvas').animateLayer("postit" + id + "Content", {
            x: posX, y: posY + 20
        });	
        // Update poitions of title
        jQuery('#mainCanvas').animateLayer("postit" + id + "Title", {
            x: posX, y: posY - jQuery('#mainCanvas').measureText("postit" + id + "Content").height / 2
        });	
        // Update poitions of Form
        jQuery('#mainCanvas').animateLayer("postit" + id + "Rect", {
            x: posX, y: posY
        });
    }

    // delete the postix in canvas
    function deletePostix(idPostit){
        jQuery('#mainCanvas').removeLayerGroup("postit" + idPostit + "Group").drawLayers();
    }

    /*==============================
        JS functions
    ==============================*/

    // Get postit from server
    function ajxSelectPostits() {
        serializedData = JSON.stringify({});
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
                var layerRect = jQuery('#mainCanvas').getLayer("postit" + val.idPostit + "Rect");
                var layerTitle = jQuery('#mainCanvas').getLayer("postit" + val.idPostit + "Title");
                var layerContent = jQuery('#mainCanvas').getLayer("postit" + val.idPostit + "Content");
                val.isVisible -= 0;
                // Check if postit exist
                if(defined(layerRect) && defined(layerTitle) && defined(layerContent)){
                    // If posX is different, change the position same for pos.Y
                    if(layerRect.x != val.posX || layerRect.y != val.posY)
                        movePostix(val.idPostit, val.posX, val.posY);
                    // Update title if is different
                    if(layerTitle.text != val.title)
                        layerTitle.text = val.title;
                    // Update content if is different
                    if(layerContent.text != val.content)
                        layerContent.text = val.content;
                    // Remove layer from canvas
                    if(val.isVisible == 0)
                        deletePostix(val.idPostit);
                }
                //If it never existed create the Postit
                else if(val.isVisible == 1)
                    newPostix(val.idPostit, val.title, val.content, val.posX, val.posY, val.borderColor, val.size);
                jQuery('#mainCanvas').drawLayers();
            }
        }
    }

    // Send to server the new postion of a postit
    function ajxUpdatePostitPosition(idPostit, posX, posY){
        serializedData = JSON.stringify({idPostit : idPostit, posX: posX, posY: posY});
        jQuery.ajax({type: 'POST', url: "ajxUpdatePostit.php", dataType: 'json', data: "data=" + serializedData
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

    // Redirect to webUpdatePostit.php sending the id Postit
    function ajxUpdatePostit(idPostit){
        document.location.href="webUpdatePostit.php?idPostit="+idPostit;
    }

    // Redirect to webInsertPostit.php sending the mouse postion
    function ajxRedirectInsert(posX, posY){
        document.location.href="webInsert.php?posX="+posX+"&posY="+posY;
    }
    
    // Get the canvas height
    function getHeight() { 
        return document.getElementById('mainCanvas').getAttribute("height");
    }
    
    // Get the canvas width
    function getWidth() {  
        return document.getElementById('mainCanvas').getAttribute("width");
    }

    // Known if my var is declared
    function defined(myVar) {
        if (typeof myVar != 'undefined') return true;
        return false;
    }

});