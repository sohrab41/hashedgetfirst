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
  mysql_select_db($database_phpimage, $phpimage);
  $result = mysql_query("SELECT 1 FROM images WHERE image=trim('".$image."') and cid=trim('".$projectid."')");
        if (mysql_fetch_row($result)) {
            $sql ="DELETE FROM images WHERE image=trim('".$image."') and cid=trim('".$projectid."')";
            log_str("--delete-SQL--- :" .$sql);
            $result = mysql_query($sql, $phpimage);
            if (!$result) {
                echo json_encode(array("success" => false, "rtntext" => 'Delete image: "'.$image.'" from Images failed: Error: ' . mysql_error()));
                log_str("[ DELETEIMAGE.php:ERR ] Delete image:".$image." from Images failed:  Error" . mysql_error() . "\r\n");
                return;
            }
            log_str("[ DELETEIMAGE.php:INFO ] Delete image:".$image." from Images \r\n");
            mysql_free_result($result);
            
           // echo json_encode(array("success" => true, "rtntext" => 'Image: "'.$image.'" Deleted' ));
        }
        $rtntxt='Image: "'.$image.'" Deleted' ;
     echo json_encode(array("success" => true, "rtntext" =>$rtntxt ));     
   // echo json_encode("test");
} catch (Exception $e) {
    json_encode( 'Caught exception: '.  $e->getMessage());
}

?>