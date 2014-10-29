<?php

//http://stackoverflow.com/questions/10297176/delete-a-file-from-a-directory
require_once('connect.php');
require_once('logmsg.php');
require_once('cfg.php');

try {
    $image = $_POST['filename'];
    $filename = $image;
    /*
    $projectid = 1;// $_POST['projectid'];
    $doc_root = $_SERVER["DOCUMENT_ROOT"];
    $uploadDir = "/SlideShowWeb/upload";
     * 
     */
    log_str("project Id: " . $projectid . "\r\n");
    //******************************************************************
    //*************** Remove Image from databasse **********************
    //******************************************************************
    mysql_select_db($database_phpimage, $phpimage);
    //$image = 't1.png';
    //$projectid = 1;
    
    $sql = "SELECT 1  FROM images where image=trim('".$image."') and pid=trim('".$projectid."') ";
    log_str("[ DELETEDIRECTORYFILE.php:INFO ] sql = " . $sql . "\r\n");
    $result = mysql_query($sql);
    if (!mysql_fetch_row($result)) {
        log_str("[ DELETEDIRECTORYFILE.php:INFO ] Image " . $image . " does not exist in DB(Images tabel), delete from directory". "\r\n");
        //echo json_encode(array("success" => false, "rtntext" => "Image " . $image . " dose not exist in DB" . mysql_error()));
        //die("Image " . $image . " dose not exist in DB");
    } else {
        mysql_free_result($result);
//***********Get images record id (foreign key) for info and caption table*************//
        $sql = "select id as total from images  where image=trim('" . $image . "')   and pid=trim('" . $projectid . "')";
        $result = mysql_query($sql, $phpimage);
        if (!$result) {
            //die('Query Record number (foreign key) for images table failed: ' . mysql_error());
            echo json_encode(array("success" => false, "rtntext" => 'Query (Get images recordid id (foreign key) for info and caption table) failed: ' . mysql_error()));
            log_str("[ DELETEDIRECTORYFILE.php:ERR ] Query (Get images record id (foreign key) for info and caption table) failed:" . mysql_error() . "\r\n");
            return;
        }
        $row = mysql_fetch_array($result);
        $id = $row[0];  //Record number for images table
        mysql_free_result($result);
        log_str("[ DELETEDIRECTORYFILE.php:INFO ] Get images record id (foreign key) for info and caption table id = " . $id . "\r\n");
//***********Delete image*************//
        $sql = "delete from images  where image=trim('" . $image . "')   and pid=trim('" . $projectid . "')";
        if (!mysql_query($sql, $phpimage)) {
           // die('Update images Error: ' . mysqli_error($phpimage) . " SQL:" . $sql);
            echo json_encode(array("success" => false, "rtntext" => 'Query Update images) failed: ' . mysql_error()));
            log_str("[ DELETEDIRECTORYFILE.php:ERR ]" . 'Query failed(Update images): ' . mysql_error() . "\r\n");
            return;
        }
        log_str("[ DELETEDIRECTORYFILE.php:INFO ] Image =trim('" . $image . "') deleted from images table" . "\r\n");
        mysql_free_result($result);
        /*         * ***********delete row from  camera_info table*********************** */
// camera_info table $infotitel OR $infotext and image record id exist
        if (!empty($id)) {
            $result = mysql_query("SELECT 1 FROM camera_info WHERE id='$id' ");
            if (mysql_fetch_row($result)) {
                //echo 'update:----id:' . $id;
                $sql = "DELETE FROM `camera_info`  WHERE id=trim('" . $id . "')";
                $result = mysql_query($sql, $phpimage);
                if (!$result) {
                    echo json_encode(array("success" => false, "rtntext" => 'Query Delete  `camera_info` failed: : ' . mysql_error()));
                    log_str("[ DELETEDIRECTORYFILE.php:ERR ] Query Delete `camera_info` (used foreign key trim('" . $id . "')) failed: :" . mysql_error() . "\r\n");
                    return;
                }
                log_str("[ DELETEDIRECTORYFILE.php:INFO ] Delete camera_info used foreign key trim('" . $id . "') \r\n");
                mysql_free_result($result);
            }
        }
        /*         * *******************Delete row from  camera_caption table************************ */
// Caption table $captiontext OR $captionrolltype and image record id exist
        if (!empty($id)) {
            $result = mysql_query("SELECT 1 FROM camera_caption WHERE id='$id' LIMIT 1");
            if (mysql_fetch_row($result)) {   //  echo 'update:----id:'.$id;
                $sql = "DELETE FROM `camera_caption`  WHERE id=" . $id;
                //log_str("-Delete-sql-->" . $sql . "/r/n");
                $result = mysql_query($sql, $phpimage);
                if (!$result) {
                   // die('Query Delete `camera_caption` failed: ' . mysql_error());
                    echo json_encode(array("success" => false, "rtntext" => 'Query Delete from `camera_caption` failed: ' . mysql_error()));
                    log_str("[ DELETEDIRECTORYFILE.php:ERR ] Query Delete from `camera_caption` (used foreign key trim('" . $id . "')) failed: " . mysql_error() . "\r\n");
                    return;
                }
                log_str("[ DELETEDIRECTORYFILE.php:INFO ] Delete from camera_info used foreign key trim('" . $id . "') \r\n");
                mysql_free_result($result);
            }
        }
      }     
        //echo json_encode(array("success" => true, "rtntext" => "$image " . "Deleted"));
        //******************************************************************
        //*************** Remove File from directory **********************
        //******************************************************************
 
    log_str("Root-dir: " . $doc_root . " ProjDir: " . $uploadDir . " RemovedFile: " . $filename . "\r\n");
    $path = $doc_root . $uploadDir;
    if (file_exists($path . "/" . $filename)) {
        unlink($path . "/" . $filename); //delete file
        log_str("[ DELETEDIRECTORYFILE.php:INFO ] Delete file : " . $path . "/" . $filename .  "  \r\n");
   }
   else{
     log_str("[ DELETEDIRECTORYFILE.php:INFO ] Can not delete file : " . $path . "/" . $filename .  "  \r\n");  
   }
    $pos = strpos($filename, '.');
    $thumbfilename=substr ($filename,0,$pos).'_t.'.substr($filename,$pos+1,strlen($filename) );
    
    if (file_exists($path . "/" . $thumbfilename)) {
        unlink($path . "/" . $thumbfilename); //delete file
        log_str("[ DELETEDIRECTORYFILE.php:INFO ] Delete thumbfilename : " . $path . "/" . $thumbfilename .  "  \r\n");
    
    }
 else {
    log_str("[ DELETEDIRECTORYFILE.php:INFO ] Can not delete thumbfilename : " . $path . "/" . $thumbfilename .  "  \r\n");
    }
    
    echo json_encode(array("success" => true, "rtntext" => "Uploaded file: " . $filename . " removed from Directory/Databasen"));
} catch (Exception $e) {
    echo json_encode(array("success" => false, "rtntext" => "Cannot remove uploaded file: " . $filename . 'Caught exception: ' . $e->getMessage()));
}
?>
 