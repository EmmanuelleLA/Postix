<?php
	// Get session
	session_start();
	$lastRefreshPostit = $_SESSION["lastRefreshPostit"];

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
		$query = "SELECT * FROM tblPostits;";
	}else
		$query = "SELECT * FROM tblPostits WHERE TIMESTAMPDIFF(SECOND, lastUpdate, '" . $lastRefreshPostit . "') < 0;";
	$result = $mysqli->query($query);
	// DECL Tab to return
	$json[] = array();
	$jSonTab[] = array();

	// Query result
	while ($row = $result->fetch_assoc()){
		//Creates the array to be sent
		$jSonTab = array("idPostit"=>$row['id'], "title"=>$row['title'], "content"=>$row['content'], "posY"=>$row['posY'], "posX"=>$row['posX'], "isVisible"=>$row['isVisible'], "size"=>$row['size'],"borderColor"=>$row['borderColor']);
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
		$_SESSION["lastRefreshPostit"] = $row['curentTime'];
		$result2->close();
	}
	
	// Close DB
	$mysqli->close();
	echo json_encode($json);
?>