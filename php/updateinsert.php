<?php

require_once('connect.php');
require_once('logmsg.php');
require_once('cfg.php');
try {
    $rtntext = "Insert OK";
    $rtntype = true;
      $info = $_POST['myjson'];
      $projectid      =$info[0][projectid];
      $active         =$info[0][active];
      $image          =$info[0][image];
      $path           =$info[0][projectpath];
      $infotitel      =$info[0][infotitel];
      $infotext       =$info[0][infotext];
      $inforolltype   =$info[0][inforolltype];
      $captiontext    =$info[0][captiontext];
      $captionrolltype=$info[0][captionrolltype];
    /*
    $image = 'tree2.jpg';
    $projectid = 1;
    $path = "images/slides/";
    $infotitel = "Dette er info titel 1";
    $infotext = "Dette er info text 1";
    $captiontext="Dette er caption 0";*/
    //**************** Directory setup ********************
    //$doc_root = $_SERVER["DOCUMENT_ROOT"];
    //$uploadDir = "/SlideShowWeb/upload";
    $filename=$image;
    log_str("[ UPDATEINSERT.PHP:ERR ]" ."Root-dir: " . $doc_root . " ProjDir: " . $uploadDir . " RemovedFile: " . $filename . "\r\n");
    $path = $doc_root . $uploadDir;
    //******************************************************************
    //************* Check if file exist in directory *******************
    if (!file_exists($path . "/" . $filename)) {
        $rtntext="Image: ".$image." not uploade please upload the image in upload directory";
        echo json_encode(array("success" => false, "rtntext" => 'Deleting failed'. "\r\n"));
    } 
    /*     * ******select count(*)*********** */
    mysql_select_db($database_phpimage, $phpimage);
    $sql = "select count(*) from images  where image=trim('" . $image . "') and cid=trim('" . $projectid . "') ";
    $result = mysql_query($sql, $phpimage);
    if (!$result) {
        die('Query failed: ' . mysql_error());
        echo json_encode(array("success" => false, "rtntext" => 'Query failed(select count(*)): ' . mysql_error()));
        log_str("[ UPDATEINSERT.PHP:ERR ]" . 'Query failed: ' . mysql_error() . "\r\n");
        return;
    }
    $row = mysql_fetch_array($result);
    //echo '<pre>' . print_r($row[0], true) . '</pre>';
    mysql_free_result($result);
    log_str("[ UPDATEINSERT.php:INFO ] Select image count: " . $row[0] . "  \r\n");
    //*********Insert/Update images***************//
    if ($row[0] > 0) {//Update
        $sql = "UPDATE images SET path=trim('" . $path . "'),active=trim('" . $active . "') WHERE image=trim('" . $image . "')";
        if (!mysql_query($sql, $phpimage)) {
            die('Update images Error: ' . mysqli_error($phpimage) . " SQL:" . $sql);
            echo json_encode(array("success" => false, "rtntext" => 'Query Update images) failed: ' . mysql_error()));
            log_str("[ UPDATEINSERT.php:ERR ]" . 'Query failed(Update images): ' . mysql_error() . "\r\n");
            return;
        }
        $transactiontype = 'Update';
    } else {//Insert
        $sql = "INSERT INTO images( cid, image, path, active) VALUES (trim('" . $projectid . "'),trim('" . $image . "'),trim('" . $path . "'),trim('" . $active . "')) ";
        if (!mysql_query($sql, $phpimage)) {
            die('INSERT INTO images Error: ' . mysqli_error($phpimage));
            echo json_encode(array("success" => false, "rtntext" => 'Query (INSERT INTO images) failed: ' . mysql_error()));
            log_str("[ UPDATEINSERT.php:ERR ] Query failed(Insert images):" . mysql_error() . "\r\n");
            return;
        }
        $transactiontype = 'Insert';
    }
    mysql_free_result($result);
    log_str("[ UPDATEINSERT.php:INFO ] Insert(count=0)/Update(count=1) for image trim('" . $image . "') \r\n");
    //***********Get images record id (foreign key) for info and caption table*************//
    $sql = "select mid as total from images  where image=trim('" . $image . "')  and active=trim('" . $active . "')  and cid=trim('" . $projectid . "')";
    $result = mysql_query($sql, $phpimage);
    if (!$result) {
        die('Query Record number (foreign key) for images table failed: ' . mysql_error());
        echo json_encode(array("success" => false, "rtntext" => 'Query (Get images record id (foreign key) for info and caption table) failed: ' . mysql_error()));
        log_str("[ UPDATEINSERT.php:ERR ] Query (Get images record id (foreign key) for info and caption table) failed:" . mysql_error() . "\r\n");
        return;
    }
    $row = mysql_fetch_array($result);
    $mid = $row[0];  //Record number for images table
    mysql_free_result($result);
    log_str("[ UPDATEINSERT.php:INFO ] Get images record id (foreign key) for info and caption table id= " . $mid . "\r\n");
    /*     * ***********Update/Insert camera_info table*********************** */
    // camera_info table $infotitel OR $infotext and image record id exist
    if ((!empty($infotitel) || !empty($infotext)) && !empty($mid)) {
        $result = mysql_query("SELECT 1 FROM camera_info WHERE mid='$mid' LIMIT 1");
        if (mysql_fetch_row($result)) {
            //echo 'update:----mid:' . $mid;
            $sql = "UPDATE `camera_info` SET `titel`=trim('" . $infotitel . "'),`text`=trim('" . $infotext . "'),`info_rolling_type`=trim('" . $inforolltype . "') WHERE mid=trim('" . $mid . "')";
            $result = mysql_query($sql, $phpimage);
            if (!$result) {
                echo json_encode(array("success" => false, "rtntext" => 'Query Update  `camera_info` failed: : ' . mysql_error()));
                log_str("[ UPDATEINSERT.php:ERR ] Query Update `camera_info` (used foreign key trim('" . $mid . "')) failed: :" . mysql_error() . "\r\n");
                return;
            }
            log_str("[ UPDATEINSERT.php:INFO ] Update camera_info used foreign key trim('" . $mid . "') \r\n");
            mysql_free_result($result);
        } else {
            //echo 'insert:----mid:' . $mid . '       ';
            $sql = "INSERT INTO `camera_info`(`mid`,`titel`, `text`, `info_rolling_type`) VALUES (" . $mid . ",trim('" . $infotitel . "'),trim('" . $infotext . "'),trim('" . $inforolltype . "')) ";
            $result = mysql_query($sql, $phpimage);
            if (!$result) {
                die('Query INSERT INTO `camera_info` failed: ' . mysql_error());
                echo json_encode(array("success" => false, "rtntext" => 'Query INSERT INTO `camera_info` failed: : ' . mysql_error()));
                log_str("[ UPDATEINSERT.php:ERR ] Query INSERT INTO `camera_info` (used foreign key trim('" . $mid . "')) failed: :" . mysql_error() . "\r\n");
                return;
            }
            log_str("[ UPDATEINSERT.php:INFO ] INSERT INTO camera_info used foreign key trim('" . $mid . "') \r\n");
            mysql_free_result($result);
        }
    }
    /*     * ************************************************************************ */
    // Caption table $captiontext OR $captionrolltype and image record id exist
    if (!empty($captiontext) && !empty($mid)) {
        $result = mysql_query("SELECT 1 FROM camera_caption WHERE mid='$mid' LIMIT 1");
        if (mysql_fetch_row($result)) {   //  echo 'update:----mid:'.$mid;
            $sql = "UPDATE `camera_caption` SET `rolling_text`=trim('" . $captiontext . "'),`rolling_type`=trim('" . $captionrolltype . "') WHERE mid=".$mid;
             log_str("-Update-sql-->".$sql."  /r/n");
            $result = mysql_query($sql, $phpimage);
            if (!$result) {
                die('Query Update `camera_caption` failed: ' . mysql_error());
                echo json_encode(array("success" => false, "rtntext" => 'Query INSERT INTO `camera_caption` failed: ' . mysql_error()));
                log_str("[ UPDATEINSERT.php:ERR ] Query INSERT INTO `camera_caption` (used foreign key trim('" . $mid . "')) failed: " . mysql_error() . "\r\n");
                return;
            }
            log_str("[ UPDATEINSERT.php:INFO ] Update camera_info used foreign key trim('" . $mid . "') \r\n");
            mysql_free_result($result);
        } else {
            $sql = "INSERT INTO `camera_caption`(mid, rolling_text, rolling_type) VALUES (". $mid .",trim('" . $captiontext . "'),trim('" . $captionrolltype . "'))";
             log_str("-Insert-sql-->".$sql." \r\n");
            $result = mysql_query($sql, $phpimage);
            if (!$result) {
                die('Query INSERT INTO `camera_info` failed: ' . mysql_error());
                echo json_encode(array("success" => false, "rtntext" => 'Query INSERT INTO `camera_caption` failed: ' . mysql_error()));
                log_str("[ UPDATEINSERT.php:ERR ] Query INSERT INTO `camera_caption` (used foreign key trim('" . $mid . "')) failed: " . mysql_error() . "\r\n");
                return;
            }
            log_str("[ UPDATEINSERT.php:INFO ] INSERT INTO camera_caption used foreign key trim('" . $mid . "') \r\n");
            mysql_free_result($result);
        }
    }
    echo json_encode(array("success" => true, "rtntext" => $transactiontype." OK for image: "."$image "));
} catch (Exception $e) {
    echo json_encode(array("success" => false, "rtntext" =>"Caught exception: ". $e->getMessage()));
}
?>
 