<?php

require_once('connect.php');
require_once('logmsg.php');
require_once('cfg.php');

/**
 *  Desc: http://dk1.php.net/array_diff
 */
try {

log_str("---------imagdifflist-------------- " . "\r\n");
    //$projectid = 1;//$_POST['id'];
    //$doc_root = $_SERVER["DOCUMENT_ROOT"];
    //$uploadDir = "/SlideShowWeb/upload";
    
    //************* read from file directory **************
    $filesarray = array();
    $allowedExts = array("gif", "jpeg", "jpg", "png");
    $dir = $doc_root . $uploadDir;
    if ($handle = opendir($dir)) {
        while (false !== ($filename = readdir($handle))) {
            $temp = explode(".", $filename);
            $extension = end($temp);
            if (in_array($extension, $allowedExts)) {
                $filesarray[] = $filename;
            }
        }
        closedir($handle);
    }
    //***************** Read from DB ********************
    mysql_select_db($database_phpimage, $phpimage);
    $res = mysql_query("SELECT DISTINCT image FROM  `images` WHERE cid =trim('$projectid')", $phpimage);
    $imagesarray = array();
    while ($row = mysql_fetch_array($res)) {
        $imagesarray[] = $row[0];
    }
   //  '***********Diff*********';

    $result = array_diff($filesarray, $imagesarray);
   // echo '<pre>' . print_r($result, true) . '</pre>';
 

    echo(json_encode($result));
    mysql_free_result($imagesarray); //$imagesarray
} catch (Exception $e) {
    json_encode('Caught exception: ' . $e->getMessage());
}
?>