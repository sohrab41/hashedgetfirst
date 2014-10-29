<?php
require_once('connect.php');
require_once('logmsg.php');
try{
 $pname     = $_POST['pname'];
 $pid       = $_POST['pid'];
 $font      = $_POST['font'];
 $fontsize  = $_POST['fontsize'];
 $fontweight= $_POST['fontweight'];
 $color     = $_POST['color'];
 $bgcolor   = $_POST['bgcolor'];
 $text      = $_POST['text'];
 
 //*** ******** ***/
 /*
 $pname     = 'all';
 $font      =''; 
 $pid       = 10;
 $fontsize  = 10;
 $fontweight= 10;
 $color     = 10;
 $bgcolor   = 10; 
 $text      =  '';
 */                               
 
 $sql="UPDATE `section_head` SET `text`='".$text."',".
                             "`font`='".$font."',".
                             "`fontsize`=".$fontsize.",".
                             "`fontweight`='".$fontweight."',".
                             "`color`='".$color."',".
                             "`bgcolor`='".$bgcolor."'". 
                             " WHERE  name='".$pname."' and  pid='". $pid."'";
                                
                              
 
 
 
 mysql_select_db($database_phpimage, $phpimage);
 log_str("[ savesectionhead.php:INFO ] id = " . $pid . "  pname:".$pname."\r\n");   
 $imagesarray = array();
 log_str("[ savesectionhead.php:INFO ] sql:   ".$sql." \r\n");   
 if (!mysql_query($sql, $phpimage))  {
        log_str("[ savesectionhead.php:ERR ] Get data from SECTIONHEAD  failed:" . mysql_error() . "\r\n");
        throw new Exception(mysql_error());
 }
 //mysql_free_result($result);   
 echo json_encode(array(
        status      => true,
        rtntxt      => "update Completed"
        )); 
  //mysql_free_result($res);

  
} catch (Exception $e) {
    $rtntext="(savesectionhead.php)Exception Message:  \n " . $e->getMessage() ;
    echo json_encode(array(
        status      => false,
        rtntxt      => $rtntext
        )); 
}


?>