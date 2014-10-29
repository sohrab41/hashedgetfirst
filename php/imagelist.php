<?php
require_once('connect.php');
require_once('logmsg.php');
require_once('cfg.php');


log_str("---------imagelist------00-------- " . $_POST['id']. "\r\n");
$projectid = $_POST['id'];
try{
mysql_select_db($database_phpimage, $phpimage);
$res = mysql_query("SELECT DISTINCT image FROM  `images` WHERE cid =trim('$projectid')", $phpimage);
$imagesarray = array();
while ($row = mysql_fetch_array($res)){
    //array_push($imagesarray, $row);
    $imagesarray[]=$row[0];
}
//echo '<pre>' . print_r($imagesarray, true) . '</pre>';
echo(json_encode($imagesarray));//$imagesarray));
mysql_free_result($imagesarray);//$imagesarray
} catch (Exception $e) {
    json_encode( 'Caught exception: '.  $e->getMessage());
}
?>