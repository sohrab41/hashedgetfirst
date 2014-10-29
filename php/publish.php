<?php


require_once('connect.php');
require_once('logmsg.php');
require_once('cfg.php');
// Turn off all error reporting
//error_reporting(0);
$info = $_POST['publishOn'];
//$publishon      =$info[0][publishOn];
      

error_reporting(E_ALL);
 /*
      $info = $_POST['myjson'];
      $projectid      =$info[0][projectid];
      $chekbox        =$info[0][active];
      $image          =$info[0][image];
*/

log_str("----1-----publish-------------- \r\n");
log_str("---------publishon-------------- :" . $_POST['publishOn']. "\r\n");
log_str("----2-----publish-------------- \r\n");

?>