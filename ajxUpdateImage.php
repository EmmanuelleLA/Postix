<?php
	// Open DB
	include_once("dbConfig.php");
	$mysqli = new mysqli(DB_HOST, DB_LOGIN, DB_PWD, DB_NAME);
	$mysqli->set_charset("utf8");

	// Data from client (filtered ajax)
	if (isset($_POST['data'])) 
		$data = json_decode($_POST['data'], true);
	
	$idImage = NULL;
	if (preg_match("/^[0-9]*$/", $data['idImage']))
		$idImage = $mysqli->real_escape_string($data['idImage']);
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
	if (preg_match("/^[0-9]*$/", $data['size']))
		$size = $mysqli->real_escape_string($data['size']);
	$borderColor = NULL;
	if (isset($data['borderColor']))
		$borderColor = $mysqli->real_escape_string($data['borderColor']);

	// Update the pos 
	if($posX != NULL && $posY != NULL)
		$query = "UPDATE tblImages SET posX = " . $posX . ", posY = " . $posY . ", lastUpdate = NOW() WHERE id = " . $idImage . ";";
	else if($title != NULL)
		$query = "UPDATE tblImages SET title = '" . $title . "', size = '" . $size . "', borderColor = '" . $borderColor . "', lastUpdate = NOW() WHERE id = " . $idImage . ";";
	$mysqli->query($query);
	// Close DB
    $mysqli->close();  
	echo json_encode(array());
?>