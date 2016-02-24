<?php

include("dbwrapper.php");
$dbase = new Wrapper("sw_user","sw_pass","localhost","sw_runes",null);
//$myFile = "queryLogs.txt";
//$fh = fopen($myFile, 'a') or die("can't open file");

//$before = microtime(true);
$filteredCount = $dbase->getOptimization($_POST["sessionId"], $_POST["optimize_run"], $_POST, $_POST["search"]["value"], $_POST["order"][0]["column"] + 1,$_POST["order"][0]["dir"],$_POST["start"],$_POST["length"],true);

$totalCount = $dbase->getOptimization($_POST["sessionId"], $_POST["optimize_run"], array(), $_POST["search"]["value"], $_POST["order"][0]["column"] + 1,$_POST["order"][0]["dir"],$_POST["start"],$_POST["length"],true);

$result = $dbase->getOptimization($_POST["sessionId"], $_POST["optimize_run"], $_POST, $_POST["search"]["value"], $_POST["order"][0]["column"] + 1,$_POST["order"][0]["dir"],$_POST["start"],$_POST["length"],false);

//$after = microtime(true);
//$difference = $after - $before;
//fwrite($fh, "\n".date("Y-m-d h:i:sa")." result: ".$difference);
//fclose($fh);

$response = array();
$response["draw"] = $_POST["draw"];
$response["recordsTotal"] = $totalCount[0]["cnt"];
$response["recordsFiltered"] = $filteredCount[0]["cnt"];
$response["data"] = $result;

$dbase->close();
echo json_encode($response);
?>