<?php

require_once('connect.php');
require_once('logmsg.php');
error_reporting(0);
$image = $_POST['imagename'];
$projectid = $_POST['projectid'];
log_str("---------deleteimage-------------- :" . $image. "\r\n");
log_str("---------deleteimage-------------- :" . $projectid. "\r\n");
log_str("---SQL--- :" . "SELECT 1 FROM images WHERE image=trim('".$image."') and cid=trim('".$projectid."')". "\r\n");
try{
    $rtntxt='ææææææææææææææææææææææææææææææ';
    // echo json_encode(array("success" => true, "rtntext" =>$rtntxt ));     
     echo json_encode("success");     
   // echo json_encode("test");
} catch (Exception $e) {
    json_encode( 'Caught exception: '.  $e->getMessage());
}

?>