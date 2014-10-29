<?php

require_once('connect.php');
require_once('logmsg.php');
try {

    
    $imageid =  $_POST['recordid'];
    $pid =      $_POST['projectid'];
    $checkbox = $_POST['checkbox'];

        log_str("[ saveuploadedfilecheckbox.php:INFO ] id : " . $imageid
                . "  pid :" . $pid
                . "  checkbox :" . $checkbox
                . "\r\n");

        mysql_select_db($database_phpimage, $phpimage);
        //$sql="UPDATE images SET text='bla' WHERE  id='155' and pid='10'";
        $sql = "UPDATE images SET active='" . $checkbox . "' WHERE  id='" . $imageid . "' and  pid='" . $pid . "'";
        $imagesarray = array();
        log_str("[ saveuploadedfilecheckbox.php: INFO ] sql:   " . $sql . " \r\n");
        $res = mysql_query($sql, $phpimage);
        if (!$res) {
            log_str("[ saveuploadedfilecheckbox.php:ERR ] Get data from SECTIONHEAD  failed:" . mysql_error() . "\r\n");
            throw new Exception(mysql_error());
        }
        //mysql_free_result($res);
        echo json_encode(array(success => true, rtntext => "update image text Completed"));
 
} catch (Exception $e) {
    $rtntext = "(saveuploadedfilecheckbox.php)Exception Message:  \n " . $e->getMessage();
    echo json_encode(array(
        success => false,
        rtntext => $rtntext
    ));
    //mysql_free_result($res);
}
?>