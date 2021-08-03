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

	// Query : delete
	$query = "UPDATE tblImages SET isVisible=0, lastUpdate = NOW() WHERE id = " . $idImage . ";";
	$success = $mysqli->query($query);

	// Close DB
	$mysqli->close();
	echo json_encode(array());
?>