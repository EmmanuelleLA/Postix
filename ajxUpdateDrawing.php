<?php
	// Open DB
	include_once("dbConfig.php");
	$mysqli = new mysqli(DB_HOST, DB_LOGIN, DB_PWD, DB_NAME);
	$mysqli->set_charset("utf8");

	// Data from client (filtered ajax)
	if (isset($_POST['data'])) 
		$data = json_decode($_POST['data'], true);
	
	$idDrawing = NULL;
	if (preg_match("/^[0-9]*$/", $data['idDrawing']))
		$idDrawing = $mysqli->real_escape_string($data['idDrawing']);
	$posX = NULL;
	if (preg_match("/^[0-9]*$/", $data['posX'])) 
		$posX = $mysqli->real_escape_string($data['posX']);
	$posY = NULL;
	if (preg_match("/^[0-9]*$/", $data['posY']))
		$posY = $mysqli->real_escape_string($data['posY']);
	$title = NULL;
	if (isset($data['title']))
		$title = $mysqli->real_escape_string($data['title']);
	$size = NULL;
	if (isset($data['size']))
		$size = $mysqli->real_escape_string($data['size']);	
	$borderColor = NULL;
	if (isset($data['borderColor']))
		$borderColor = $mysqli->real_escape_string($data['borderColor']);	

	$tblDrawings = NULL;
	$tblDrawings = $data["table"];

	// Update the pos 
	if($posX != NULL && $posY != NULL){
		$query = "UPDATE tblDrawings SET posX = " . $posX . ", posY = " . $posY . ", lastUpdate = NOW() WHERE id = " . $idDrawing . ";";
		$mysqli->query($query);
	}else if($title != NULL){
		$query = "SELECT id FROM tblLines WHERE idDrawings = " . $idDrawing . ";";
		$resultLines = $mysqli->query($query);
		while ($rowLines = $resultLines->fetch_assoc()){
			$query = "DELETE FROM tblPoints WHERE idLine = " . $rowLines['id'] . ";";
			$mysqli->query($query);
		}
		$resultLines->close();
		$query = "DELETE FROM tblLines WHERE idDrawings = " . $idDrawing . ";";
		$mysqli->query($query);

		$query = "UPDATE tblDrawings SET title = '" . $title . "', size = '" . $size . "', borderColor = '" . $borderColor ."', lastUpdate = NOW() WHERE id = " . $idDrawing . ";";
		$mysqli->query($query);
		$idx = 0;
		foreach($tblDrawings as $line){
			$color = $line["color"];
			$width = $line["width"];
			$delay = $line["delay"];
			$tblPoints = $line["tblPoints"];
			// Insert tblLines
			  // Query : insert
			$query = "INSERT INTO tblLines (id, idDrawings, delay, color, width, idx) VALUES (NULL, $idDrawing, $delay, '$color', $width, $idx );";  
			$success = $mysqli->query($query);
			if ($success)
				$idLine = $mysqli->insert_id;
			foreach($tblPoints as $points){
				$pointsX = $points[0];
				$pointsY = $points[1];
				// Insert tblPoints
				// Query : insert
				$query = "INSERT INTO tblPoints (id, idLine, posX, posY) VALUES (NULL, $idLine, $pointsX, $pointsY);";  
				$mysqli->query($query);
			}
			$idx++;
		}
	}
	// Close DB
    $mysqli->close();  
	echo json_encode(array());
?>
