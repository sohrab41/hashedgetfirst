<?php
//http://www.white-hat-web-design.co.uk/blog/resizing-images-with-php/
require_once('connect.php');
require_once('logmsg.php');
require_once('cfg.php');
require_once('resize_image.php');
include('SimpleImage.php');
// Turn off all error reporting
error_reporting(0);

//error_reporting(E_ALL);
//$pid = $_POST['pid'];
//$typeofimage = $_POST['typeofimage'];
 $rtncode= '3000';
 $appdir = $doc_root . $uploadDir; //'/var/www/oper/upload/sussane';
//$filename = $_POST['data'];
log_str("----------------upload--------------------- file name:" . $_FILES["image"]["name"] . "\r\n");
log_str("-----Image directory-------- file name:" . $appdir . "\r\n");

try {
    $result = "";
    $desc = "";
    //$files = array();
    log_str("----------------upload-----------try-1--------- " . "\r\n");
    $allowedExts = array("gif", "jpeg", "jpg", "png");
    $temp = explode(".", $_FILES["image"]["name"]);
    $extension = end($temp);
    if ((($_FILES["image"]["type"] == "image/gif") || // .gif
            ($_FILES["image"]["type"] == "image/jpeg") || // .jpeg
            ($_FILES["image"]["type"] == "image/jpg") || // .jpg
            ($_FILES["image"]["type"] == "image/pjpeg") ||
            ($_FILES["image"]["type"] == "image/png") ||
            ($_FILES["image"]["type"] == "image/x-png")) &&
            ($_FILES["image"]["size"] < 2000000)  //200000
            && in_array($extension, $allowedExts)
    ) {// If file exist
        $rtncode =  $_FILES["image"]["error"];
        $filename = $_FILES["image"]["name"];
        $filetype = $_FILES["image"]["type"];
        $filesize = ($_FILES["image"]["size"] / 1024) . " kB";
        $tempfile = $_FILES["image"]["tmp_name"];
        $name = $_FILES["image"]["name"];
        
        if (file_exists("$appdir/$name")) {
            log_str("----------------upload-------exist-------file name exist------- " . $_FILES["image"]["name"] . "\r\n");
            $rtncode = 3001;
            $desc = "Func: Upload. File: " . $_FILES["image"]["name"] . " exists in upload directory. Please remove it from Upload directory:  ".$appdir." name:  ".$name;
            //unlink($appdir . "/" . $filename); //delete file
            // exit;
        } else {//file dose not exist Copy the new file to directory
            log_str("Upload file: " . $filename . " not exist in directory, upload it to: ". "$appdir/$name" . "\r\n");
            
            $rtncode = 0;
            //Move new fil to destination
            move_uploaded_file($_FILES["image"]["tmp_name"], "$appdir/$name");
            
             //
         try {
            // Make image bigger 
            $nameofbigimage="big_".$name;
            log_str("Big Image==0==>> big image filename:  " . "$appdir/$name" . "\r\n");
            $image = new SimpleImage("$appdir/$name");
            log_str("Big Image==1==>> big image filename:  " . "$appdir/$name" . "\r\n");
            // Resize the image to specific width and height
            //$image->resize(1800, 500);
            // Scales the image to 200%
            $image->scale(200);
            $image->save("$appdir/$nameofbigimage");
            log_str("Big Image==2==>> big image nameofbigimage:  " . "$appdir/$nameofbigimage" . "\r\n");
      } catch (Exception $exc) {
                echo json_encode('Error in converting to big image:  '.$exc->getTraceAsString());
            }
            mysql_select_db($database_phpimage, $phpimage);
            //insert into images(id, pid, image, path, active, date) values('','1' ,'12.jpg' , '/SlideShowWeb/upload','N', CURDATE()) 
            $qur = "INSERT INTO `images`(`id`, `pid`, `path`, `image`,`text`, `active`, `date`) VALUES ('','$projectid','$uploadDir','$name','$text','N', NOW())";
            $result = mysql_query($qur, $phpimage);
            if ($result == true) { // I would usually use mysql_insert_id as a validation from auto_increment tables.
                //  header("Location:error.html");
                log_str("File: " . $filename . " saved in DB  sql: ".$qur . "\r\n");
                $desc = $desc . "\r\n" . " and inserted in database";
            } else {
                log_str("----------------Insert Error----1-------: " . mysql_error() . " sql:  ".$qur."</p>");
                $rtncode = 3003;
                $desc = "Func: Upload.  Error upload file " . $_FILES["image"]["name"] . " in database.   Error Message : \r\n" . mysql_error();
                //header("Location:error.html");
            }
        }
    } else {
        log_str("----------------upload----invalid--file------------ " . $filename . "\r\n");
        $rtncode ="3002";
        $desc = "Func: Upload.  Invalid file :" . $_FILES["image"]["name"];
    }
    //**********************
  
   
   
$pos = stripos($name, 'front');
log_str("Found Front ================================  name" . $name . '  pos:  ' . $pos . "\r\n");
if ($pos !== false) {
    log_str("Found Front ================================  " . $thumbfilename . '  thumbdirfilename:  ' . $thumbdirfilename . "\r\n");
  /*
           smart_resize_image(($appdir . '/' . $filename),
                              $string             = null,
                              $width              = 940, 
                              $height             = 250, 
                              $proportional       = false, 
                              $output             = ($appdir . '/' . $filename), 
                              $delete_original    = false, 
                              $use_linux_commands = false,
  			      $quality = 100
  		 );*/
    
        
         
    
    }
    else{
    //Create thumb file    
    $pos = strpos($filename, '.');
    $thumbfilename=substr ($filename,0,$pos).'_t.'.substr($filename,$pos+1,strlen($filename) );
    
    $thumbdirfilename=$appdir . '/' . $filename;
   log_str("thumb--thumb====>> thumbfilename:  " . $thumbfilename . '  thumbdirfilename:  ' . $thumbdirfilename . "\r\n");
   
    smart_resize_image(($appdir . '/' . $filename),
                              $string             = null,
                              $width              = 100, 
                              $height             = 75, 
                              $proportional       = false, 
                              $output             = ($appdir . '/' . $thumbfilename), 
                              $delete_original    = false, 
                              $use_linux_commands = false,
  			      $quality = 100
  		 );
    }
    log_str("Upload----Date----dir:-------- " . $appdir . '/' . $filename . "\r\n");
    log_str("Upload----Date------------ " . date("Y-m-d H:i:s", filemtime($appdir . '/' . $filename)) . "\r\n");
    
  
    echo json_encode(array(
        'rtncode'  => $rtncode,
        'filename' => $filename,
        'filetype' => $filetype,
        'filesize' => $filesize,
        'tempfile' => $tempfile,
        'filedate' => date("Y-m-d H:i:s", filemtime($appdir . '/' . $filename)),
        'desc' => $desc
    ));
    
   
    
    log_str("===>" . "\r\n" . "\r\n");
   // return false;
} catch (Exception $e) {
    $desc= "Func: Upload. "+$desc;
    $rtncode = 3000;
    log_str("Upload file Exception: " . $e->getMessage() . "\r\n");
    $desc = "Exception error " . $e->getMessage() . " Internal system error. please contact administrator if the problem persists";
    $shop = array(
        'rtncode' => $rtncode,
        'filename' => $filename,
        'filetype' => $filetype,
        'filesize' => $filesize,
        'tempfile' => $tempfile,
        'filedate' => '',
        'desc' => $desc
    );
    echo json_encode($shop);
}
?>










