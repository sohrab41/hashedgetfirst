<?php
function log_str($msg) {
    $errorType = 3;
    //error_log(date('l jS \of F Y h:i:s A') . "  " . $msg, $errorType, "/var/log/php-scripts.log");
    //error_log("  " . $msg, $errorType, "/home/www/dianick.dk/var/log/php-scripts.log");
    error_log("  " . $msg, $errorType, "/var/log/php-scripts.log");
    //$access = date("Y/m/d H:i:s");
   // bool syslog( LOG_DEBUG , $access+$msg );
}
?>