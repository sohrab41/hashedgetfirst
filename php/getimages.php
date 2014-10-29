<?php

require_once('connect.php');
require_once('logmsg.php');
try {
    //$pimagename = $_POST['pname'];
    $pid = $_POST['pid'];
    $type = $_POST['type'];
    //$pimagename = 'all';
    // $pid   = 10;
    mysql_select_db($database_phpimage, $phpimage);
    $imagesarray = array();
    if (!empty($pid)) {
        if ($type == 'front') {
            $sql = "SELECT  `id` , `image` ,  `text` ,  `active` ,  `date`  FROM `images` WHERE pid='$pid'  and image like 'front%' and  active='Y' ORDER BY DATE desc";
        } else if ($type == 'upload') {
            $sql = "SELECT  `id` , `image` ,  `text` ,  `active` ,  `date`  FROM `images` WHERE pid='$pid' ORDER BY DATE desc";
        } else {
            $sql = "SELECT  `id` , `image` ,  `text` ,  `active` ,  `date`  FROM `images` WHERE  active='Y' and pid='$pid' and image not like 'front%' ORDER BY DATE desc";
        }

        // $sql = "SELECT `id`, `pid`, `name`, `text`, `font`, `fontsize`, `fontweight`, `color`, `bgcolor` FROM `section_text` WHERE  name=trim('".$pimagename."') and  pid=trim('" . $pid . "')";
        $res = mysql_query($sql, $phpimage);
        if (!$res) {
            log_str("[ getimages.php:ERR ] Get data from SECTIONTEXT  failed:" . mysql_error() . "\r\n");
            throw new Exception(mysql_error());
        }

        while ($row = mysql_fetch_array($res)) {
            array_push($imagesarray, $row);
            //log_str("[ getimages.php:INFO ] row[] = " . $row[0] . "\r\n");
        }
    }
    log_str("[ getimages.php:INFO ] pid = " . $pid . "  type: " . $type. "  sql: " . $sql . "\r\n");
//print_r($imagesarray);
    $rtntext = "Dette er message";
    echo json_encode(array(
        outarray => $imagesarray,
        status => true,
        rtntxt => $rtntext
    ));
    mysql_free_result($res);
} catch (Exception $e) {
    $rtntext = "(getimages.php)Exception Message:  \n " . $e->getMessage();
    echo json_encode(array(
        outarray => null,
        status => false,
        rtntxt => $rtntext
    ));
}
?>