<?php

require_once('logmsg.php');
require_once('cfg.php');

/**
 *  Desc: http://stackoverflow.com/questions/3797239/insert-new-item-in-array-on-any-position-in-php
 */
/***************************
 * Function:timecomp 
 *  Desc:   Subtracting the UNIX timestamps from each other.
 *          Returns a negative number if $b is a date before $a,
 *          otherwise positive.
 *   
 */
function timecomp($a, $b) {
    return strtotime($b[0]) - strtotime($a[0]);
}
/*function test(){
    $array = array("foo", "bar", "hello", "world");
var_dump($array);
}*/

log_str("---------read files-------------- " . "\r\n");
try {
    //**************** Directory setup ******************** 
    $filesarray = array();
    $doc_root   = $_SERVER["DOCUMENT_ROOT"];
    $uploadDir    = "/SlideShowWeb/upload";
    
    log_str("---------dir :" . $doc_root . $uploadDir . "\r\n");
    //********************Load Directory ******************************* 
    $allowedExts = array("gif", "jpeg", "jpg", "png");
    $dir = $doc_root . $uploadDir;
    if ($handle = opendir($dir)) {
        while (false !== ($filename = readdir($handle))) {
            $temp = explode(".", $filename);
            $extension = end($temp);
            if (in_array($extension, $allowedExts)) {
                $filename1 = $dir . '/' . $filename;
                //echo "$filename was last modified: " . date("Y-m-d H:i:s", filemtime($filename1));
                $filesarray[] = array(date("Y-m-d H:i:s", filemtime($filename1)), $filename);
            }
        }
        closedir($handle);
    }
    //uasort($filesarray,'timecomp');
    usort($filesarray, 'timecomp');
    //echo '<pre>' . print_r($filesarray, true) . '</pre>';
    echo(json_encode($filesarray)); 
} catch (Exception $e) {
    json_encode('Caught exception: ' . $e->getMessage());
}
?>