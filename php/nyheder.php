<?php
# FileName = "connection_phpl" 
# Type = "MYSQL"
# Http= "root"
$hostname_phpimage= "localhost";
$database_phpimage= "prod";
$username_phpimage= "root";
$password_phpimage= "U9x&drift";
$phpimage = mysql_connect($hostname_phpimage,$username_phpimage,$password_phpimage) or 
        trigger_error(mysql_error(),E_USER_ERRORS);
?>