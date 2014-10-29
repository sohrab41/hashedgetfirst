<?php

require_once('connect.php');
require_once('logmsg.php');
try {
    //$pname     = $_POST['pname'];
    $pid = $_POST['pid'];


    // Header
    $font = $_POST['font'];
    $fontsize = $_POST['fontsize'];
    $fontweight = $_POST['fontweight'];
    $color = $_POST['color'];
    $bgcolor = $_POST['bgcolor'];
    $text = $_POST['text'];

    // news
    $newsfont = $_POST['newsfont'];
    $newsfontsize = $_POST['newsfontsize'];
    $newsfontweight = $_POST['newsfontweight'];
    $newscolor = $_POST['newcolor'];
    $newsbgcolor = $_POST['newsbgcolor'];
    $newstext = $_POST['newstext'];




    log_str(
            "-------  Header --------" . "\r\n" .
            " font:  " . $font . "\r\n" .
            " fontsize:  " . $fontsize . "\r\n" .
            " fontweight:  " . $fontweight . "\r\n" .
            " color:  " . $color . "\r\n" .
            " bgcolor:  " . $bgcolor . "\r\n" .
            " text:   " . $text . "\r\n" .
            "---- news Text------" . "\r\n" .
            " newsfont:  " . $newsfont . "\r\n" .
            " newsfontsize:  " . $newsfontsize . "\r\n" .
            " newsfontweight:  " . $newsfontweight . "\r\n" .
            " newcolor:  " . $newscolor . "\r\n" .
            " newsbgcolor:  " . $newsbgcolor . "\r\n" .
            " newstext:   " . $newstext . "\r\n");


    mysql_select_db($database_phpimage, $phpimage);

    /*     * ************ news_section_head ************** */
    $sql = "select max(id) from news_section_head   WHERE" . " pid='" . $pid . "'";
    log_str('sql:  ' . $sql . '    ');
    $res = mysql_query($sql, $phpimage);
    if (!$res) {
        log_str("[ createnyhead.php:ERR ] Get data from  failed:" . mysql_error() . "\r\n");
        throw new Exception(mysql_error());
    }
    $row = mysql_fetch_array($res);
    $max_head_id = $row[0];
    log_str("[ createnyhed.php:INFO ] max head id = " . $row[0] . "\r\n");
    /*     * ************ news_section_text ************** */
    $sql = "select max(id) from news_section_text   WHERE" . " pid='" . $pid . "'";
    log_str('sql:  ' . $sql . '    ');
    $res = mysql_query($sql, $phpimage);
    if (!$res) {
        log_str("[ createnyhead.php:ERR ] Get data from  failed:" . mysql_error() . "\r\n");
        throw new Exception(mysql_error());
    }
    $row = mysql_fetch_array($res);
    $max_text_id = $row[0];
    log_str("[ createnyhed.php:INFO ] max text id = " . $row[0] . "\r\n");
    /* ************* compare ************** */
    if ($max_text_id > $max_head_id) {
        $sql = "DELETE FROM  news_section_text WHERE pid='" . $pid . "' and id >'" . $max_head_id . "'";
        $res = mysql_query($sql, $phpimage);
        if (!$res) {
            log_str("[ createnyhead.php:ERR ] Get data from  failed:" . mysql_error() . "\r\n");
            throw new Exception(mysql_error());
        }
    }
    //************ next id ********* 
    $nextId=$max_head_id+1;
    //************ Add to news_section_head table ********* 
    $name='nyhedHeadRow'.$nextId;
    $sql="insert into `news_section_head` (`id`, `pid`, `name`, `text`, `font`, `fontsize`, `fontweight`, `color`, `bgcolor`) VALUES". 
        "('".$nextId."','".$pid."','".$name."','".$text."','".$font."','".$fontsize."','".$fontweight."','".$color."','".$bgcolor."')";
    $res = mysql_query($sql, $phpimage);
    if (!$res) {
            log_str("[ createnyhead.php:ERR ] Get data from  failed:" . mysql_error() . "\r\n"." SQL:  ".$sql);
            throw new Exception(mysql_error());
    }
    //************ Add to news_section_text table ********* 
    $name='nyhedTextRow'.$nextId;
    $sql="insert into `news_section_text` (`id`, `pid`, `name`, `text`, `font`, `fontsize`, `fontweight`, `color`, `bgcolor`) VALUES". 
        "('".$nextId."','".$pid."','".$name."','".$newstext."','".$newsfont."','".$newsfontsize."','".$newsfontweight."','".$newscolor."','".$newsbgcolor."')";
    $res = mysql_query($sql, $phpimage);
    if (!$res) {
            log_str("[ createnyhead.php:ERR ] Get data from  failed:" . mysql_error() . "\r\n"." SQL:  ".$sql);
            throw new Exception(mysql_error());
    }                             
 

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
 /*
 $sql="UPDATE `news_section_head` SET `text`='".$text."',".
                             "`font`='".$font."',".
                             "`fontsize`=".$fontsize.",".
                             "`fontweight`='".$fontweight."',".
                             "`color`='".$color."',".
                             "`bgcolor`='".$bgcolor."'". 
                             " WHERE  name='".$pname."' and  pid='". $pid."'";
 mysql_select_db($database_phpimage, $phpimage);
 log_str("[ ???????????????????????? savenyhedsectionhead.php:INFO ] id = " . $pid . "  pname:".$pname."\r\n");   
 $imagesarray = array();
 log_str("[ savenyhedsectionhead.php:INFO ] sql:   ".$sql." \r\n");   
 if (!mysql_query($sql, $phpimage))  {
        log_str("[ savenyhedsectionhead.php:ERR ] Get data from SECTIONHEAD  failed:" . mysql_error() . "\r\n");
        throw new Exception(mysql_error());
 }
 mysql_free_result($result);
 */
 echo json_encode(array(
        status      => true,
        rtntxt      => "update Completed"
        )); 
  mysql_free_result($res);

  
} catch (Exception $e) {
    
    log_str("[ CreateNyhed.php:ERR ]"  . $e->getMessage()  . "\r\n");
        
    
    $rtntext="(savenyhedsectionhead.php)Exception Message:  \n " . $e->getMessage() ;
    echo json_encode(array(
        status      => false,
        rtntxt      => $rtntext
        )); 
}


?>