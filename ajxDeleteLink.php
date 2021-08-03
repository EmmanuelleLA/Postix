<?php
	// Data from client (filtered ajax)
	if (isset($_POST['data'])) 
		$data = json_decode($_POST['data'], true);

	$idLink = NULL;
	if (preg_match("/^[0-9]*$/", $data['idLink']))
		$idLink = $data['idLink'];
		
	// Open DB
	include_once("dbConfig.php");
	$mysqli = new mysqli(DB_HOST, DB_LOGIN, DB_PWD, DB_NAME);
	$mysqli->set_charset("utf8");

	// Query : delete
	$query = "UPDATE tblLinks SET isVisible=0, lastUpdate = NOW() WHERE id = " . $idLink . ";";
	$success = $mysqli->query($query);
	// Close DB
	$mysqli->close();
	echo json_encode(array());
?>