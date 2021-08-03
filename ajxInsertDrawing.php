<?php
	// Data from client (posX, posY)
	if (isset($_POST['data'])) $data = json_decode($_POST['data'], true);

	// Open DB
	include_once("dbConfig.php");
	$mysqli = new mysqli(DB_HOST, DB_LOGIN, DB_PWD, DB_NAME);
	$mysqli->set_charset("utf8");

	$posX = NULL;
	$posY = NULL;
	$size = NULL;
	$tblDrawings = NULL;
	$posX = $data["posX"];
	$title = $data["title"];
	$posY = $data["posY"];
	$size = $data["size"];
	$borderColor = $data["borderColor"];
	$tblDrawings = $data["table"];

	// Insert tblDrawings
	  // Query : insert
	$query = "INSERT INTO tblDrawings VALUES (NULL,  '$title', $size, $posX, $posY, NOW(), 1, '$borderColor');";  
	$success = $mysqli->query($query);
	// Query success
	if ($success)
		$idDrawings = $mysqli->insert_id;
	$idx = 0;
	foreach($tblDrawings as $line){
		$color = $line["color"];
		$width = $line["width"];
		$delay = $line["delay"];
		$tblPoints = $line["points"];
		// Insert tblLines
		  // Query : insert
		$query = "INSERT INTO tblLines (id, idDrawings, delay, color, width, idx) VALUES (NULL, $idDrawings, $delay, '$color', $width, $idx );";  
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

	// Close DB
	$mysqli->close();
	echo json_encode(array());
?>
