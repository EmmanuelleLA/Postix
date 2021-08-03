<?php
	// Get session
	session_start();
	$lastRefreshFile = $_SESSION["lastRefreshFile"];

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
		$query = "SELECT * FROM tblFiles;";
	}else
		$query = "SELECT * FROM tblFiles WHERE TIMESTAMPDIFF(SECOND, lastUpdate, '" . $lastRefreshFile . "') < 0;";
	$result = $mysqli->query($query);

	// DECL Tab to return
	$json[] = array();
	$jSonTab[] = array();

	// Query result
	while ($row = $result->fetch_assoc()){
		$ext = NULL;
		if($row['ext'] == "pdf")
			$ext = "filePdf.png";
		else if($row['ext'] == "txt")
			$ext = "fileTxt.png";
		else if($row['ext'] == "exe")
			$ext = "fileExe.png";
		else
			$ext = "fileUnknow.png";
		//Creates the array to be sent
		$jSonTab = array("idFile"=>$row['id'], "title"=>$row['title'], "fileName"=>$row['givenName'], "posY"=>$row['posY'], "posX"=>$row['posX'], "isVisible"=>$row['isVisible'], "extFile"=>$ext, "borderColor"=>$row['borderColor']);
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
		$_SESSION["lastRefreshFile"] = $row['curentTime'];
		$result2->close();
	}
	
	// Close DB
	$mysqli->close();
	echo json_encode($json);
?>