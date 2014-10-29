<?php

require_once('connect.php');
require_once('logmsg.php');
try {
    $rtntext = "Insert OK";
    $rtntype = true;
    /*
      $info = $_POST['myjson'];
      $projectid      =$info[0][projectid];
      $chekbox        =$info[0][active];
      $image          =$info[0][image];
      $path           =$info[0][image];
      $infotitel      =$info[0][infotitel];
      $infotext       =$info[0][infotext];
      $inforolltype   =$info[0][inforolltype];
      $captiontext    =$info[0][captiontext];
      $captionrolltype=$info[0][captionrolltype];
     */
    $image = 'tree2.jpg';
    /*     * ******select count(*)*********** */
    mysql_select_db($database_phpimage, $phpimage);
    $sql = "delete from images  where image=trim('" . $image . "') and cid=trim('" . $projectid . "') ";
    $result = mysql_query($sql, $phpimage);
    if (!$result) {
        die('Query failed: ' . mysql_error());
        echo json_encode(array("success" => false, "rtntext" => 'Query failed(select count(*)): ' . mysql_error()));
        log_str(date("Y-m-d H:i:s") . "[ UPDATEINSERT.PHP:ERR ]" . 'Query failed: ' . mysql_error() . "\r\n");
        return;
    }
    $row = mysql_fetch_array($result);
    echo '<pre>' . print_r($row[0], true) . '</pre>';
    mysql_free_result($result);
    log_str("[ DELETEFILE.php:INFO ] Delete image : " . $image . "  \r\n");
    echo json_encode(array("success" => true, "rtntext" => "Insert/Update OK for image: "."$image "));
} catch (Exception $e) {
    json_encode('Caught exception: ' . $e->getMessage());
}
?>
 