<?php

require_once('connect.php');
require_once('logmsg.php');
try {
   $info = $_POST['myjson'];
   
   $data = json_decode($info );
foreach ($data as $name => $value) {
    echo $name . ':';
    foreach ($value as $entry) {
        echo '  ' . $entry->firstName.'  ' . $entry->lastName;
    }
}
   /*
   //var_dump($info) ;
   log_str("---------updateinsert------01----:". $info . " \r\n");
   $data = json_decode(stripslashes($info));
   //log_str("---------updateinsert------02----:". $data  . " \r\n");
   $image = $data->image;
   echo  $image;
  
   $flight = $data->REGULAR_EXPRESSION;//regular_expression

    $obj = json_decode($_POST);
foreach ($_POST->myjson as $myjson)
{
  
    log_str("---------updateinsert------01-----post---count:".$myjson." \r\n");
}
    //echo '<pre>' . print_r($_POST['myjson'].key1, true) . '</pre>';
    echo $_POST['myjson'].key1;
  
    log_str("---------updateinsert------01-----post---count:".$_POST['myjson']['key1']." \r\n");
    foreach ($_POST as $param_name => $param_val1) {
       foreach ($param_val1 as $param_name => $param_val) 
        log_str("---------updateinsert   Param:" . $param_name . " Value:" . $param_val . "\r\n");
    }
    
    $json = json_decode($_POST);
     $dec = (Array)json_decode($json);


    console.log("---------updateinsert valu by key". $dec["image"]);
    $data = $_POST;
    $data = json_decode("$data", true);
    //just echo an item in the array
    console . log("---------updateinsert valu by key" . "key1 : " . $data["image"]);
*/
    //echo '<pre>' . print_r($_POST, true) . '</pre>';
   // echo(json_encode($info)); //$imagesarray));
    mysql_free_result($imagesarray); //$imagesarray
} catch (Exception $e) {
    json_encode('Caught exception: ' . $e->getMessage());
}
?>
 