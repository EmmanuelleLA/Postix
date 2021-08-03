$(document).ready(function(){

    /*==============================================================================
        jQuery events
    ==============================================================================*/
    ajxSelectDrawings();
    window.setInterval(ajxSelectDrawings, 3000);
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
    //Creates a new Drawing based on the data sent from php
    function drawTabs(id, title, posX, posY, tblDrawings){
        var delayTime = 0;
        newDrawing(id, title, posX, posY, tblDrawings);
        for (var j=0; j < tblDrawings.length; j++){
            delayTime += 0;
            if(j != 0)
                delayTime += (50*tblDrawings[j-1].tblPoints.length + 100 * tblDrawings[j-1].delay);
            setTimeout(drawLines, delayTime, id, j, tblDrawings[j].color, tblDrawings[j].width, tblDrawings[j].tblPoints, posX, posY);
        }
    }

    function drawLines(id, idLine, color, width, tblPoints, posX, posY){
        var obj = {
            layer: true,
            strokeStyle: color,
            strokeWidth: width,
            groups: ["drawingLines" + id + "Group", "drawing" + id + "Group"],
            dragGroups: ["drawing" + id + "Group"],
            rounded: true,
            name: "draw" + id + idLine,
            data:{idLine: idLine}
        };
        posX -= 0;
        posY -= 0;
        for (var p = 0; p < tblPoints.length; p++){
            setTimeout(addPointDrawn, 50*p, obj, p, posX-50+(tblPoints[p][0]/10), posY-10+(tblPoints[p][1]/10));
        }
    } 

    function addPointDrawn(object, range, posX, posY){
        object['x'+(range+1)] = posX;
        object['y'+(range+1)] = posY;
        jQuery('canvas').removeLayer(object.name);
        jQuery('canvas').drawLine(object);
    }

    function newDrawing(id, title, posX, posY, tblRange) {
        posX -= 0;
        posY -= 0;
        jQuery('#mainCanvas')
        //Draws the Icon
        .drawText({
            fillStyle: 'black',
            fontFamily: 'Trebuchet MS, sans-serif',
            layer: true,
            draggable: true,
            groups: ["drawing" + id + "Group"],
            dragGroups: ["drawing" + id + "Group"],
            name: "drawing" + id + "Title",
            fontStyle: 'bold',
            fontSize: '15pt',
            text: title,
            x: posX, y: posY-30,
            align: 'center',
            respectAlign: true,
            maxWidth: 110
        })
        //Draws the drawing form
        .drawRect({
            layer: true,
            groups: ["drawing" + id + "Group"],
            dragGroups: ["drawing" + id + "Group"],
            name: "drawing" + id + "Rect",
            data:{idDrawing: id, tblLines: tblRange},
            strokeStyle: '#777',
            strokeWidth: 4,
            x: posX, y: posY,
            width: 150,
            height: jQuery('#mainCanvas').measureText("drawing" + id + "Title").height + 110,
            cornerRadius: 10,
            dragstart: function(layer) {
                dragStart = true;
            },
            dragstop: function(layer) {
                ajxUpdateDrawingPosition(layer.data.idDrawing, layer.x, layer.y);
            },
            // Create event to update or see the DrawingName
            click: function(layer) {
                if(isTimeCorrect())
                    ajxUpdateDrawing(layer.data.idDrawing);
                else
                    reDraw(layer.data.idDrawing, layer.x, layer.y, layer.data.tblLines);

            },// Create event to update or see the DrawingName
            touchend: function(layer) {
                if(isTimeCorrect())
                    ajxUpdateDrawing(layer.data.idDrawing);
                else
                    reDraw(layer.data.idDrawing, layer.x, layer.y, layer.data.tblLines);
            }
        });
    }

    //
    function reDraw(id, posX, posY, tblDrawings){
        jQuery('#mainCanvas').removeLayerGroup("drawingLines" + id + "Group").drawLayers();
        var delayTime = 0;
        for (var j=0; j < tblDrawings.length; j++){
            delayTime += 0;
            if(j != 0)
                delayTime += (50*tblDrawings[j-1].tblPoints.length + 100 * tblDrawings[j-1].delay);
            setTimeout(drawLines, delayTime, id, j, tblDrawings[j].color, tblDrawings[j].width, tblDrawings[j].tblPoints, posX, posY);
        }
    }

    //Moves Postix to the right location
    function moveDrawing(id, posX, posY, tblDrawings) {
        posX -= 0;
        posY -= 0;
        jQuery('#mainCanvas').animateLayer("drawing" + id + "Title", {
            x: posX, y: posY-25,
        });	
        jQuery('#mainCanvas').animateLayer("drawing" + id + "Rect", {
            x: posX, y: posY-30,
        });
        reDraw(id, posX, posY, tblDrawings);
    }

    // delete the postix in canvas
    function deletePostix(idDrawing){
        jQuery('#mainCanvas').removeLayerGroup("drawing" + idDrawing + "Group").drawLayers();
    }

    /*==============================
        JS functions
    ==============================*/
    // Get Drawing from server
    function ajxSelectDrawings() {
        serializedData = JSON.stringify({});
        jQuery.ajax({type: 'POST', url: "ajxSelectDrawing.php", dataType: 'json', data: "data=" + serializedData,
            success: function(data) {
                ajxSelectDrawingsDone(data);
            }
        });
    }

    // Display the Drawing receive from server
    function ajxSelectDrawingsDone(data) {
        for (var val of data) {
            //If the id, posX and posY are recieved, creates Layers
            if(defined(val.idDrawing) && defined(val.posX) && defined(val.title) && defined(val.posY)){
                var layerRect = jQuery('#mainCanvas').getLayer("drawing" + val.idDrawing + "Rect");
                var layerTitle = jQuery('#mainCanvas').getLayer("drawing" + val.idDrawing + "Title");
                val.isVisible -= 0;
                // Check if Drawing exist
                if(defined(layerRect) && defined(layerTitle)){
                    // If posX is different, change the position same for pos.Y
                    if(layerRect.x != val.posX || layerRect.y != val.posY)
                        moveDrawing(val.idDrawing, val.posX, val.posY, val.tblLines);
                    // Update title if is different
                    if(layerTitle.text != val.title)
                        layerTitle.text = val.title;
                    // Remove layer from canvas
                    if(val.isVisible == 0)
                        deletePostix(val.idDrawing);
                }
                //If it never existed create the Drawing
                else if(val.isVisible == 1)
                    drawTabs(val.idDrawing, val.title, val.posX, val.posY, val.tblLines);
                jQuery('#mainCanvas').drawLayers();
            }
        }
    }

    // Send to server the new postion of a Drawing
    function ajxUpdateDrawingPosition(idDrawing, posX, posY){
        serializedData = JSON.stringify({idDrawing : idDrawing, posX: posX, posY: posY});
        jQuery.ajax({type: 'POST', url: "ajxUpdateDrawing.php", dataType: 'json', data: "data=" + serializedData
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

    // Redirect to webUpdateDrawing.php sending the id Drawing
    function ajxUpdateDrawing(idDrawing){
        document.location.href="webUpdateDrawing.php?idDrawing="+idDrawing;
    }

    // Known if my var is declared
    function defined(myVar) {
        return (typeof myVar != "undefined");
    }

});