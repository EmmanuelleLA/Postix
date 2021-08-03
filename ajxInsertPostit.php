<?php
	// Open DB
	include_once("dbConfig.php");
	$mysqli = new mysqli(DB_HOST, DB_LOGIN, DB_PWD, DB_NAME);
	$mysqli->set_charset("utf8");

  // Data from client Insert
	if (isset($_POST['data'])) 
    $data = json_decode($_POST['data'], true);

  $title = $mysqli->real_escape_string($data['title']); 
  $content = $mysqli->real_escape_string($data['content']);
  $posX = $mysqli->real_escape_string($data['posX']);
  $posY = $mysqli->real_escape_string($data['posY']);
  $size = $mysqli->real_escape_string($data['size']);
  $borderColor = $mysqli->real_escape_string($data['borderColor']);


  // Query : insert
  $query = "INSERT INTO tblPostits VALUES (NULL, '" . $title . "', '" . $content . "', '" . $posX . "', '" . $posY . "', '" . $size . "', NOW(), 1, '" . $borderColor . "');";  
  $mysqli->query($query);
  
	// Close DB
	$mysqli->close();
  echo json_encode(array());
?>
