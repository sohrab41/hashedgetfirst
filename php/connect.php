<?php

# FileName = "connect php" 
# Type = "MYSQL"
# Http= "root"
# example: http://www.tutorialspoint.com/mysql/mysql-update-query.htm

$hostname_phpimage= "localhost";
$database_phpimage= "prod";
$username_phpimage= "root";
$password_phpimage= "U9x&drift";
$phpimage = mysql_connect($hostname_phpimage,$username_phpimage,$password_phpimage) or 
        trigger_error(mysql_error(),E_USER_ERRORS);
 
 /*
$hostname_phpimage= "mysql12.gigahost.dk";
$database_phpimage= "dianick_prod";
$username_phpimage= "dianick";
$password_phpimage= "2lazy4gigahost";
$phpimage = mysql_connect($hostname_phpimage,$username_phpimage,$password_phpimage) or 
        trigger_error(mysql_error(),E_USER_ERRORS);
*/

?>