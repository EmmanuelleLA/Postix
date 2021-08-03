<?php
	// Get session
	session_start();
	$lastRefreshImage = $_SESSION["lastRefreshImage"];

    // Open DB
	include_once("dbConfig.php");
	$mysqli = new mysqli(DB_HOST, DB_LOGIN, DB_PWD, DB_NAME);
	$mysqli->set_charset("utf8");

	// Query : select
	if (isset($_POST['data'])){
		$data = json_decode($_POST['data'], true);
	}
	if (isset($data['unDelete'])){
		$unDelete = $mysqli->real_escape_string($data['unDelete']);
		$query = "SELECT * FROM tblImages;";
	}else
		$query = "SELECT * FROM tblImages WHERE TIMESTAMPDIFF(SECOND, lastUpdate, '" . $lastRefreshImage . "') < 0;";
	$result = $mysqli->query($query);

	// DECL Tab to return
	$json[] = array();
	$jSonTab[] = array();

	// Query result
	while ($row = $result->fetch_assoc()){

		//Creates the array to be sent
		$jSonTab = array("idImage"=>$row['id'], "title"=>$row['title'], "imageName"=>$row['givenName'], "posY"=>$row['posY'], "posX"=>$row['posX'], "isVisible"=>$row['isVisible'], "size"=>$row['size'], "borderColor"=>$row['borderColor']);
		//Send all rows to the javascript
		$json[] = $jSonTab;
	}
	$numbersRows = $result->num_rows;
	$result->close();
	// If i have select one item update time session
	if($numbersRows > 0 && !$unDelete){
		$query = "SELECT NOW() AS curentTime";
		$result2 = $mysqli->query($query);
		$row = $result2->fetch_assoc();
		$_SESSION["lastRefreshImage"] = $row['curentTime'];
		$result2->close();
	}
	
	// Close DB
	$mysqli->close();
	echo json_encode($json);
?>