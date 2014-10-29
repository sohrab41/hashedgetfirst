<?php
//http://www.white-hat-web-design.co.uk/blog/resizing-images-with-php/
require_once('logmsg.php');
require_once('cfg.php');
require_once('resize_image.php');
require_once('SimpleImage.php');
// Turn off all error reporting

   log_str("thumb--thumb====>> thumbfilename:  " . $thumbfilename . '  thumbdirfilename:  ' . $thumbdirfilename . "\r\n");
   
    smart_resize_image("15.jpg",
                              $string             = null,
                              $width              = 100, 
                              $height             = 75, 
                              $proportional       = false, 
                              $output             = "15_big.jpg", 
                              $delete_original    = false, 
                              $use_linux_commands = false,
  			      $quality = 100
  		 );
    
    log_str("Upload----Date----dir:-------- " . $appdir . '/' . $filename . "\r\n");
    log_str("Upload----Date------------ " . date("Y-m-d H:i:s", filemtime($appdir . '/' . $filename)) . "\r\n");
    
  

?>










