<?php
session_start(); // Starting Session
//$_SESSION["userType"]=NULL;
require_once('connect.php');
require_once('logmsg.php');
try {
    $pid  = $_POST['pid'];
    $user = $_POST['user'];
    $pw = $_POST['pw'];
    
   log_str("pid:  " . $pid ."  user:  " . $user . "\r\n");
   mysql_select_db($database_phpimage, $phpimage);

    /*     * ************ news_section_head ************** */
  
    $sql = "SELECT type FROM login WHERE pid ='" . $pid . "' and user='".$user."' and pw='".$pw."'";
    log_str('sql:  ' . $sql .  "\r\n");
    $res = mysql_query($sql, $phpimage);
    if (!$res) {
        log_str("[ validateuser.php:ERR ] Get data from  failed:" . mysql_error() . "\r\n". '   sql:  ' . $sql . "\r\n");
        throw new Exception(mysql_error());
    }
    $row = mysql_fetch_array($res);
    log_str("[ createnyhed.php:INFO ] max head id = " . $row[0]. '   sql:  ' . $sql . "\r\n");
    if($row[0]== NULL)
        $_SESSION['userType']='';
    else
        $_SESSION['userType']=$row[0]; 

 echo json_encode(array(
        status      => true,
        type        => $row[0],
        rtntxt      => "select Completed"
        )); 
  mysql_free_result($res);

  
} catch (Exception $e) {
    
    log_str("[ CreateNyhed.php:ERR ]"  . $e->getMessage()  . "\r\n");
        
    
    $rtntext="(savenyhedsectionhead.php)Exception Message:  \n " . $e->getMessage() ;
    echo json_encode(array(
        status      => false,
        type        => 'exception',
        rtntxt      => $rtntext
        )); 
}


?>