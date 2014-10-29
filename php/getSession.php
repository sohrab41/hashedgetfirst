<?php

session_start(); // Starting Session
//$_SESSION['userType']='test';
$user = $_POST['user'];
//$user='userType';
//echo json_encode(array("success" => true, "rtntext" =>  $_SESSION['userType']));
echo json_encode(array("success" => true, "rtntext" =>  $_SESSION[$user]));
?>