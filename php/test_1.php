<?php

require_once('connect.php');
require_once('logmsg.php');
try {
 echo json_encode(array(
        status      => true,
        rtntxt      => "update Completed"
        )); 
 // mysql_free_result($res);

  
} catch (Exception $e) {
    
    log_str("[ CreateNyhed.php:ERR ]"  . $e->getMessage()  . "\r\n");
        
    
    $rtntext="(savenyhedsectionhead.php)Exception Message:  \n " . $e->getMessage() ;
    echo json_encode(array(
        status      => false,
        rtntxt      => $rtntext
        )); 
}


?>