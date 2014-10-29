<?php

return;
    $server_url = $_SERVER["SERVER_NAME"];
    $doc_root = $_SERVER["DOCUMENT_ROOT"];
    $projdir = "/SlideShowWeb/upload";
     $dir = $doc_root . $projdir;
     $filename='DB.jpg';
     echo  $_SERVER["DOCUMENT_ROOT"];
     log_str("Upload----Date----dir:-------- " . $appdir . '/' . $filename . "\r\n");
    log_str("Upload----Date------------ " . date("Y-m-d H:i:s", filemtime($appdir . '/' . $filename)) . "\r\n");
    
echo $dir; return;
require_once('connect.php');
require_once('logmsg.php');
mysql_select_db($database_phpimage, $phpimage);
$image = 't1.png';
$projectid = 1;
$sql = "SELECT 1  FROM images  where image=trim('" . $image . "') and cid=trim('" . $projectid . "') ";
$result = mysql_query($sql);
if (!mysql_fetch_row($result)) {
    log_str("[ test.php:INFO ] Image " . $image . " dose not exist in DB");
    echo json_encode(array("success" => false, "rtntext" => "Image " . $image . " dose not exist in DB" . mysql_error()));
    die("Image " . $image . " dose not exist in DB");
    return;
}
mysql_free_result($result);
//***********Get images record id (foreign key) for info and caption table*************//
$sql = "select mid as total from images  where image=trim('" . $image . "')   and cid=trim('" . $projectid . "')";
$result = mysql_query($sql, $phpimage);
if (!$result) {
    die('Query Record number (foreign key) for images table failed: ' . mysql_error());
    echo json_encode(array("success" => false, "rtntext" => 'Query (Get images recordid mid (foreign key) for info and caption table) failed: ' . mysql_error()));
    log_str("[ DELETEDIRECTORYFILE.php:ERR ] Query (Get images record id (foreign key) for info and caption table) failed:" . mysql_error() . "\r\n");
    return;
}
$row = mysql_fetch_array($result);
$mid = $row[0];  //Record number for images table
mysql_free_result($result);
log_str("[ DELETEDIRECTORYFILE.php:INFO ] Get images record id (foreign key) for info and caption table id = " . $mid . "\r\n");
//***********Delete image*************//
$sql = "delete from images  where image=trim('" . $image . "')   and cid=trim('" . $projectid . "')";
if (!mysql_query($sql, $phpimage)) {
    die('Update images Error: ' . mysqli_error($phpimage) . " SQL:" . $sql);
    echo json_encode(array("success" => false, "rtntext" => 'Query Update images) failed: ' . mysql_error()));
    log_str("[ DELETEDIRECTORYFILE.php:ERR ]" . 'Query failed(Update images): ' . mysql_error() . "\r\n");
    return;
}
log_str("[ DELETEDIRECTORYFILE.php:INFO ] Image =trim('" . $image . "') deleted " . "\r\n");
mysql_free_result($result);
/* * ***********delete row from  camera_info table*********************** */
// camera_info table $infotitel OR $infotext and image record id exist
if (!empty($mid)) {
    $result = mysql_query("SELECT 1 FROM camera_info WHERE mid='$mid' LIMIT 1");
    if (mysql_fetch_row($result)) {
        //echo 'update:----mid:' . $mid;
        $sql = "DELETE FROM `camera_info`  WHERE mid=trim('" . $mid . "')";
        $result = mysql_query($sql, $phpimage);
        if (!$result) {
            echo json_encode(array("success" => false, "rtntext" => 'Query Delete  `camera_info` failed: : ' . mysql_error()));
            log_str("[ DELETEDIRECTORYFILE.php:ERR ] Query Delete `camera_info` (used foreign key trim('" . $mid . "')) failed: :" . mysql_error() . "\r\n");
            return;
        }
        log_str("[ DELETEDIRECTORYFILE.php:INFO ] Delete camera_info used foreign key trim('" . $mid . "') \r\n");
        mysql_free_result($result);
    }
}
/* * *******************Delete row from  camera_caption table************************ */
// Caption table $captiontext OR $captionrolltype and image record id exist
if (!empty($mid)) {
    $result = mysql_query("SELECT 1 FROM camera_caption WHERE mid='$mid' LIMIT 1");
    if (mysql_fetch_row($result)) {   //  echo 'update:----mid:'.$mid;
        $sql = "DELETE FROM `camera_caption`  WHERE mid=" . $mid;
        //log_str("-Delete-sql-->" . $sql . "/r/n");
        $result = mysql_query($sql, $phpimage);
        if (!$result) {
            die('Query Delete `camera_caption` failed: ' . mysql_error());
            echo json_encode(array("success" => false, "rtntext" => 'Query Delete from `camera_caption` failed: ' . mysql_error()));
            log_str("[ DELETEDIRECTORYFILE.php:ERR ] Query Delete from `camera_caption` (used foreign key trim('" . $mid . "')) failed: " . mysql_error() . "\r\n");
            return;
        }
        log_str("[ DELETEDIRECTORYFILE.php:INFO ] Delete from camera_info used foreign key trim('" . $mid . "') \r\n");
        mysql_free_result($result);
    }
}
echo json_encode(array("success" => true, "rtntext" => "$image " . "Deleted"));


//----------------------------







$row = mysql_fetch_array($result);

$mid = $row[0];
log_str("[ test.php:INFO ] Delete image  mid:" . $mid);
mysql_free_result($result);
$rtntxt = 'Image: "' . $image . '" Deleted   mid:' . $mid;
echo json_encode(array("success" => true, "rtntext" => $rtntxt));
?>