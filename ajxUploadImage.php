<?php
	// Upload file from client
	// Check image exists
	if (!isset($_FILES["file"]["name"])) {
		echo "ERROR : File does not exist<br>";
		header("Location: index.php");
	}

	// Extract clientImagename and extension
	$clientImageName = $_FILES["file"]["name"];
	$extension = strtolower(end(explode(".", $_FILES["file"]["name"])));

	// Check extension allowed
	$allowedExtensions = array("jpg", "png", "pdf");
	if (!in_array($extension, $allowedExtensions))
		echo "ERROR : Extension $extension not allowed<br>";

	// Check image size less than 2Mo
	if ($_FILES["file"]["size"] >= 2 * 1024 * 1024)
		echo "ERROR : Size too large (" . $_FILES["file"]["size"] / 1024 / 1024 . " Mo)<br>";

	// Generate random filename (until free filename found)
	do {
		$randomFilename = generateRandomFilename();
	} while (file_exists("up/{$randomFilename}.{$extension}"));

	// Save uploaded file to disk
	move_uploaded_file($_FILES["file"]["tmp_name"], "up/{$randomFilename}.{$extension}");

	// Open DB
	include_once("dbConfig.php");
	$mysqli = new mysqli(DB_HOST, DB_LOGIN, DB_PWD, DB_NAME);
	$mysqli->set_charset("utf8");

	// title
	$title = NULL;
	if (isset($_POST['title'])) 
		$title = $mysqli->real_escape_string($_POST["title"]);
	$posX = NULL;
	if (isset($_POST['posX'])) 
		$posX = $mysqli->real_escape_string($_POST["posX"]);
	$posY = NULL;
	if (isset($_POST['posY'])) 
		$posY = $mysqli->real_escape_string($_POST["posY"]);	
	$size = NULL;
	if (isset($_POST['size'])) 
		$size = $mysqli->real_escape_string($_POST["size"]);
	$borderColor = NULL;
	if (isset($_POST['borderColor'])) 
		$borderColor = $mysqli->real_escape_string($_POST["borderColor"]);
	////////////////////////////////////////////////////////////////////////////////
	// FUNCTIONS
	
	// Generate random filename
	function generateRandomFilename($length = 20) {
		$characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$randomFilename = '';
		for ($i = 0; $i < $length; $i++)
			$randomFilename .= $characters[rand(0, strlen($characters) - 1)];
		return $randomFilename;
	}

	// Query : insert
	$query = "INSERT INTO tblImages VALUES (NULL, '" . $title . "', '" . $clientImageName . "', '" . $extension . "', " . $posX . " , " . $posY . ", " . $size . ", NOW(), 1, '" . $randomFilename . "." . $extension . "', '" . $borderColor . "');";  
	$mysqli->query($query);
	// Close DB
	$mysqli->close();
	
	echo json_encode(array());
?>
