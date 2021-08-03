<?php
	// Get session
	session_start();
	$lastRefreshDrawing = $_SESSION["lastRefreshDrawing"];

    // Open DB
	include_once("dbConfig.php");
	$mysqli = new mysqli(DB_HOST, DB_LOGIN, DB_PWD, DB_NAME);
	$mysqli->set_charset("utf8");

	// DECL Tab to return
	// $json[] = array();
	// $jSonTab[] = array();
	// $jSonTabLines[] = array();
	// $jSonTabPoints[] = array();

	// Query : select
	if (isset($_POST['data'])){
		$data = json_decode($_POST['data'], true);
	}
	if (isset($data['idDrawing'])){
		$idDrawing = $mysqli->real_escape_string($data['idDrawing']);
		$query = "SELECT * FROM tblDrawings WHERE id = " . $idDrawing . ";";
	}else if (isset($data['unDelete'])){
		$unDelete = $mysqli->real_escape_string($data['unDelete']);
		$query = "SELECT * FROM tblPostits;";
	}else
		$query = "SELECT * FROM tblDrawings WHERE TIMESTAMPDIFF(SECOND, lastUpdate, '" . $lastRefreshDrawing . "') < 0;";
	$result = $mysqli->query($query);

	// Query result
	while ($row = $result->fetch_assoc()){
		$query = "SELECT * FROM tblLines WHERE idDrawings = " . $row['id'] . ";";
		$resultLines = $mysqli->query($query);
		while ($rowLines = $resultLines->fetch_assoc()){
			$query = "SELECT * FROM tblPoints WHERE idLine = " . $rowLines['id'] . ";";
			$resultPoints = $mysqli->query($query);
			while ($rowPoints = $resultPoints->fetch_assoc()){
				$jSonTabPoints[] = array($rowPoints['posX'], $rowPoints['posY']);
			}
			$resultPoints->close();
			//Creates the array to be sent
			$jSonTabLines[] = array("idLine"=>$rowLines['idx'], "color"=>$rowLines['color'], "width"=>$rowLines['width'], "delay"=>$rowLines['delay'], "tblPoints"=>$jSonTabPoints);
			$jSonTabPoints = array();
			//Send all rows to the javascript
		}
		$resultLines->close();
		$jSonTab = array("idDrawing"=>$row['id'], "title"=>$row['title'], "posY"=>$row['posY'], "posX"=>$row['posX'], "isVisible"=>$row['isVisible'], "tblLines"=>$jSonTabLines, "size"=>$row['size'], "borderColor"=>$row['borderColor']);
		$jSonTabLines = array();
		$json[] = $jSonTab;
	}
	$numbersRows = $result->num_rows;
	$result->close();
	// If i have select one item update time session
	if($numbersRows > 0){
		$query = "SELECT NOW() AS curentTime";
		$result2 = $mysqli->query($query);
		$row = $result2->fetch_assoc();
		$_SESSION["lastRefreshDrawing"] = $row['curentTime'];
		$result2->close();
	}
	
	// Close DB
	$mysqli->close();
	if($json)
		echo json_encode($json);
	else
		echo json_encode(array());
?>