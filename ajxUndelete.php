<?php
    // Data from client (filtered ajax)
	if (isset($_POST['data']))
		$data = json_decode($_POST['data'], true);
    $id = NULL;
	if (isset($data['id']))
		$id = $data['id'];
    $typePostit = NULL;
	if (isset($data['typePostit']))
		$typePostit = $data['typePostit'];
    if($data['isVisible'])
        $isVisible = 0;
    else
        $isVisible = 1;
    // Open DB
	include_once("dbConfig.php");
	$mysqli = new mysqli(DB_HOST, DB_LOGIN, DB_PWD, DB_NAME);
	$mysqli->set_charset("utf8");
    // Query : select
    if ($typePostit == "link")
        $query = "UPDATE tblLinks SET isVisible = '" . $isVisible . "' WHERE tblLinks.id = $id;";
    else if ($typePostit == "image")
        $query = "UPDATE tblImages SET isVisible = '" . $isVisible . "'  WHERE tblImages.id = $id;";
    else if ($typePostit == "file")
        $query = "UPDATE tblFiles SET isVisible = '" . $isVisible . "'  WHERE tblFiles.id = $id;";
    else if ($typePostit == "drawing")
        $query = "UPDATE tblDrawings SET isVisible = '" . $isVisible . "'  WHERE tblDrawings.id = $id;";
    else if ($typePostit == "postit")
        $query = "UPDATE tblPostits SET isVisible = '" . $isVisible . "' WHERE tblPostits.id = $id;";
    echo $query;
    $result = $mysqli->query($query);

    // Close DB
	$mysqli->close();
    echo json_encode(array());
?>
