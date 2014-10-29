<?php
require_once('connect.php');
require_once('logmsg.php');
try{
 $pname = $_POST['pname'];
 $pid   = $_POST['pid'];
 //$pname = 'all';
 //$pid   = 10;
 
 mysql_select_db($database_phpimage, $phpimage);
 log_str("[ getsectiontext.php:INFO ] id = " . $pid . "  pname:".$pname."\r\n");   
 $imagesarray = array();
 if (!empty($pname)) {
    if(strcmp( $pname,'all')==0){
        $sql= "SELECT  `id`, `pid`, `name`, `text`, `font`, `fontsize`, `fontweight`, `color`, `bgcolor` FROM `section_text` WHERE pid='$pid'";
        // log_str("[ getsectiontext.php:INFO ] her -- her -- her -- her -- \r\n");   
    }    
    else{
        // log_str("[ getsectiontext.php:INFO ] sub --sub --sub --sub -- her -- her -- her -- \r\n");   
         $sql= "SELECT  `id`, `pid`, `name`, `text`, `font`, `fontsize`, `fontweight`, `color`, `bgcolor` FROM `section_text` WHERE  name='".$pname."' and  pid='". $pid."'";
    }    
    log_str("[ getsectiontext.php:INFO ] sql:".$sql."  \r\n");   
         
   // $sql = "SELECT `id`, `pid`, `name`, `text`, `font`, `fontsize`, `fontweight`, `color`, `bgcolor` FROM `section_text` WHERE  name=trim('".$pname."') and  pid=trim('" . $pid . "')";
    $res = mysql_query($sql, $phpimage);
    if (!$res) {
        log_str("[ getsectiontext.php:ERR ] Get data from SECTIONTEXT  failed:" . mysql_error() . "\r\n");
        throw new Exception(mysql_error());
    }
    
while($row = mysql_fetch_array($res)) {
     array_push($imagesarray, $row); 
}
    
    
    
    
   // $row = mysql_fetch_array($res);
   // array_push($imagesarray, $row);  
}
//print_r($imagesarray);
echo json_encode(array(
        outarray    => $imagesarray,
        status      => true,
        rtntxt      => $rtntext
        )); 
  mysql_free_result($res);

  
} catch (Exception $e) {
    $rtntext="(getsectiontext.php)Exception Message:  \n " . $e->getMessage() ;
    echo json_encode(array(
        outarray    => null,
        status      => false,
        rtntxt      => $rtntext
        )); 



  //   log_str("[ GetSectiontext.php:Exception ] Get for  caption table msg = " . $e->getMessage() . "\r\n");   

   //json_encode( 'Caught exception (GETINFOTEXTDATA): '.  $e->getMessage());
}


?>