<?php
  // Data from client Insert
	if (isset($_POST['data'])) 
    $data = json_decode($_POST['data'], true);

  $title = $data['title']; 
  $content = $data['content'];
  $posX = $data['posX'];
  $posY = $data['posY'];
  $size = $data['size'];
  $borderColor = $data['borderColor'];
  
	// Open DB
	include_once("dbConfig.php");
	$mysqli = new mysqli(DB_HOST, DB_LOGIN, DB_PWD, DB_NAME);
	$mysqli->set_charset("utf8");

  // Query : insert
  $query = "INSERT INTO tblLinks VALUES (NULL, '" . $title . "', '" . $content . "', '" . $posX . "', '" . $posY . "', '" . $size . "', NOW(), 1, '" . $borderColor . "');";  
  $mysqli->query($query);
  echo $query;
	// Close DB
	$mysqli->close();
  // echo json_encode(array());
?>
