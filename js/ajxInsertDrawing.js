$(document).ready(function(){
    /*==============================================================================
        jQuery events
    ==============================================================================*/

    drawBackground();
    setTimeout(changeDelay, 500, 1);
    setTimeout(changeDelay, 1000, 2);
    setTimeout(changeDelay, 2000, 3);
    jQuery(".bar").html("0<input id='scrollBar' type='range' min='0' max='0' value='0' />0");

    jQuery("body").on("click", ".colorImg", function() {
		colorSelected = jQuery(this).next().html();
		jQuery(".selectedImg.colorImg").toggleClass("selectedImg");
		jQuery(this).toggleClass("selectedImg");
        if(layerSelected != null){
            layerSelected.strokeStyle = colorSelected;
            tblDrawings[layerSelected.data.range].color = colorSelected;
        }
        jQuery('#drawingCanvas').drawLayers();
	});

    jQuery("body").on("click", ".widthImg", function() {
        widthSelected = jQuery(this).next().html();
		jQuery(".selectedImg.widthImg").toggleClass("selectedImg");
		jQuery(this).toggleClass("selectedImg");
        if(layerSelected != null){
            layerSelected.strokeWidth = widthSelected;
            tblDrawings[layerSelected.data.range].width = widthSelected;
        }
        jQuery('#drawingCanvas').drawLayers();
	});

    jQuery("body").on("click", ".delayImg", function() {
        delaySelected = jQuery(this).next().html();
		jQuery(".selectedImg.delayImg").toggleClass("selectedImg");
		jQuery(this).toggleClass("selectedImg");
        if(layerSelected != null){
            layerSelected.strokeStyle = delaySelected;
            tblDrawings[layerSelected.data.range].delay = delaySelected;
        }
	});

    jQuery("body").on("click", ".deleteImg", function() {
        if(layerSelected != null){
            layerSelected.strokeStyle = delaySelected;
            for(var length = layerSelected.data.range; length < tblDrawings.length; length++)
                tblDrawings[length] = tblDrawings[length+1];
            tblDrawings.pop();
            jQuery('#drawingCanvas').removeLayer(layerSelected.name).drawLayers();
            jQuery(".bar").html("0<input id='scrollBar' type='range' min='0' max='" + getTabLength() + "' value='" + layerSelected.data.range + "' />" + getTabLength());
        }
        jQuery('#drawingCanvas').drawLayers();
    });

    jQuery("body").on('input', '#scrollBar', function() {
        drawTabs(jQuery(this).val());
    });

    jQuery("body").on("click", ".borderImg", function() {
        colorSelected = jQuery(this).next().html();
        jQuery(".selectedBorderImg.borderImg").toggleClass("selectedBorderImg");
        jQuery(this).toggleClass("selectedBorderImg");
    });

    // Event to senf the new to server if clicked in submit send
    jQuery("body").on("click",".btnSend",function(){
        var table = tblDrawings;
        var title = jQuery(".title").val();
        var posX = jQuery(".posX").val();
        var posY =  jQuery(".posY").val();
        var size = jQuery("#sizeBar").val();
        var color = jQuery(".selectedBorderImg.borderImg").next().html();
        ajxInsertDrawings(table, title, posX, posY, size, color);
    });

    //==============================================================================


    /*==============================================================================
        DECL
    ==============================================================================*/
    var tblDrawings = [];
    var tabPoints = [];
    var mouseXOld, mouseYOld;
    var i = -1;
    var boolDraw = false;
    var layerSelected;
    var colorSelected = "Blue";
    var widthSelected = 1;
    var delaySelected = 1;
    //==============================================================================


    /*==============================
	JdrawingCanvas functions
    ==============================*/
    function drawBackground(){
        jQuery('#drawingCanvas').drawRect({
            layer: true,
            x: 0, y: 0,
            dragable: false,
            width: 20000, height: 30000,
            mousedown: function(layer){
                boolDraw = true;
                mouseXOld = getMousePosX();
                mouseYOld = getMousePosY();        
            },
            mouseup: function(layer){
                drawLinesDone();
            },
            mousemove: function(layer) {
                if(boolDraw)
                    drawLines(colorSelected, widthSelected);
            },
            touchstart: function(layer){
                boolDraw = true;
                mouseXOld = getMousePosX();
                mouseYOld = getMousePosY();        
            },
            touchend: function(layer){
                drawLinesDone();
            },
            touchmove: function(layer) {
                if(boolDraw)
                    drawLines(colorSelected, widthSelected);
            }
        });
    }

    function drawTabs(pos){
        for (var j=0; j < tblDrawings.length; j++)
            jQuery('#drawingCanvas').removeLayer('draw' + j).drawLayers();
        jQuery('#drawingCanvas').clearCanvas();

        drawBackground();

        var delayTime = 0;
        for (var j=0; j < pos; j++){
            delayTime += 0;
            if(j != 0)
                delayTime += (50*tblDrawings[j-1].points.length + 100 * tblDrawings[j-1].delay);
            setTimeout(drawLines2, delayTime, j, tblDrawings[j].color, tblDrawings[j].width, tblDrawings[j].points);
        }
    }
    
    function drawLines(color, width){
        var mouseX = getMousePosX();
        var mouseY = getMousePosY();
        if (distance(mouseX, mouseY, mouseXOld, mouseYOld) > 10){
            i++;
            var posBar = jQuery('#scrollBar').val();
            posBar++;
            posBar--;
            var drawRange = posBar;
            if(typeof jQuery('#drawingCanvas').getLayer("draw" + drawRange) == "undefined"){
                jQuery('#drawingCanvas').drawLine({
                    layer: true,
                    name: "draw" + drawRange,
                    groups:  "draw" + drawRange,
                    data:{range: drawRange},
                    draggable: true,
                    strokeStyle: color,
                    strokeWidth: width,
                    x1: mouseXOld, y1: mouseYOld,
                    x2: mouseX, y2: mouseY,
                    click: function(layer){
                        layerSelected = layer;
                        updateBouton(tblDrawings[layerSelected.data.range]);
                    }
                });
            }
            else{
                var layerTest = jQuery('#drawingCanvas').getLayer("draw" + drawRange);
                layerTest['x'+(i+1)] = mouseX;
                layerTest['y'+(i+1)] = mouseY;
            }
            mouseX = Math.round(mouseX);
            mouseY = Math.round(mouseY);
            mouseXOld = mouseX;
            mouseYOld = mouseY;
            var newpoint = [mouseX, mouseY];
            tabPoints.push(newpoint);
        }
    }

    function drawLinesDone(){
        boolDraw = false;
        var posBar = jQuery('#scrollBar').val();
        posBar++;
        posBar--;
        if(posBar != getTabLength()){
            tblDrawings.push({});
            for(var j=tblDrawings.length-1; j>=posBar; j--)
                tblDrawings[j] = tblDrawings[j-1];
            tblDrawings[posBar] = {color: colorSelected, width: widthSelected, delay: delaySelected, points: tabPoints};
            jQuery(".bar").html("0<input id='scrollBar' type='range' min='0' max='" + getTabLength() + "' value='" + (posBar+1) + "' />" + getTabLength());
        }else{
            tblDrawings.push({color: colorSelected, width: widthSelected, delay: delaySelected, points: tabPoints});
            jQuery(".bar").html("0<input id='scrollBar' type='range' min='0' max='" + getTabLength() + "' value='" + getTabLength() + "' />" + getTabLength());
        }
        i = -1;
        layerSelected = null;
        tabPoints = [];
        setTimeout(changeDelay, 500, 1);
        setTimeout(changeDelay, 1000, 2);
        setTimeout(changeDelay, 2000, 3);
    }

    function drawLines2(idLine, color, width, tblPoints){
        var obj = {
            layer: true,
            strokeStyle: color,
            strokeWidth: width,
            rounded: true,
            draggable: true,
            groups:  "draw" + idLine,
            name: "draw" + idLine,
            data:{range: idLine},
            click: function(layer){
                layerSelected = layer;
                updateBouton(tblDrawings[layerSelected.data.range]);
            }
        };
        for (var p = 0; p < tblPoints.length; p++)
            setTimeout(addPointDrawn, 50*p, obj, p, tblPoints[p][0], tblPoints[p][1]);
    } 

    function addPointDrawn(object, range, posX, posY){
        object['x'+(range+1)] = posX;
        object['y'+(range+1)] = posY;
        jQuery('#drawingCanvas').removeLayer(object.name);
        jQuery('#drawingCanvas').drawLine(object);
    }

    function updateBouton(obj){
    	jQuery(".selectedImg.colorImg").toggleClass("selectedImg");
		jQuery(".colorImg" + obj.color).toggleClass("selectedImg");
		jQuery(".selectedImg.widthImg").toggleClass("selectedImg");
		jQuery(".widthImg" + obj.width).toggleClass("selectedImg");
		// jQuery(".selectedImg.delayImg").toggleClass("selectedImg");
		// jQuery(".delayImg" + obj.delay).toggleClass("selectedImg");
    }

    function changeDelay(delayTime){
        if(!boolDraw)
            delaySelected = delayTime;
    }

    function getMousePosX(){
        return event.pageX - document.querySelector('#drawingCanvas').getBoundingClientRect().left;
    }    

    function getMousePosY(){
        return event.pageY - document.querySelector('#drawingCanvas').getBoundingClientRect().top;
    }

    function distance(x1,y1,x2,y2) {
        return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    }

    function getTabLength(){
        var range = 0;
        for(var length=0; length < tblDrawings.length; length++){
            if(tblDrawings[length] != [])
                range++;
        }
        return range;
    }

    /*==============================================================================
        Send data ajax
    ==============================================================================*/

    function ajxInsertDrawings(table, title, posX, posY, size, color) {
        jsonData = {table: table, title: title, posX: posX, posY: posY, size: size, borderColor: color};
        serializedData = JSON.stringify(jsonData);
        jQuery.ajax({
            type: 'POST',
            url: "ajxInsertDrawing.php",
            dataType: 'json', 
            data: "data=" + serializedData,
            success: function(data) {
                ajxInsertDrawingDone();
            }
        });
    }
    // Redirect in main page
    function ajxInsertDrawingDone() { 
        document.location.href="index.php";
    }

});