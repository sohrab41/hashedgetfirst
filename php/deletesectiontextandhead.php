<?php

require_once('connect.php');
require_once('logmsg.php');
try {
    $pnametext = $_POST['pnametext'];
    $pnamehead = $_POST['pnamehead'];
    $pid = $_POST['pid'];
    log_str("[ deletesectiontextandhead.php:INFO ] pnametext: " . $pnametext . "  pnamehead: " . $pnamehead . " \r\n");

    mysql_select_db($database_phpimage, $phpimage);

    $sqlText = "DELETE FROM `news_section_text` WHERE name='" . $pnametext . "' and  pid='" . $pid . "'";
    $sqlHead = "DELETE FROM `news_section_head` WHERE name='" . $pnamehead . "' and  pid='" . $pid . "'";



    if (!empty($pnametext) && !empty($pnamehead)) {
        try {
            if (!mysql_query($sqlText, $phpimage)) {
                log_str("[ deletesectiontextandhead.php:ERR ] Get data from SECTIONTEXT  failed:" . mysql_error() . "\r\n");
                throw new Exception(mysql_error());
            }
            else
                log_str("[ deletesectiontextandhead.php:INFO ] delete text  sql: " . $sqlText . " \r\n");
        } catch (Exception $exc) {
            log_str("[ deletesectiontextandhead.php:INFO ] delete text  error: " . $exc->getTraceAsString() . " \r\n");
        }



        try {
//mysql_free_result($result);   
            if (!mysql_query($sqlHead, $phpimage)) {
                log_str("[ deletesectiontextandhead.php:ERR ] Get data from SECTIONTEXT  failed:" . mysql_error() . "\r\n");
                throw new Exception(mysql_error());
            }
            else
                log_str("[ deletesectiontextandhead.php:INFO ] delete head sql: " . $sqlHead . " \r\n");
        } catch (Exception $exc) {
            log_str("[ deletesectiontextandhead.php:INFO ] delete head Error: " . $exc->getTraceAsString() . " \r\n");
        }


        log_str("1  [ deletesectiontextandhead.php:INFO ] delete head Error:  \r\n");

        echo json_encode(array(
            status => true,
            rtntxt => "delete Completed"
        ));
        log_str("2  [ deletesectiontextandhead.php:INFO ] delete head Error:  \r\n");
    } else {
        log_str("3  [ deletesectiontextandhead.php:INFO ] delete head Error:  \r\n");

        echo json_encode(array(
            status => false,
            rtntxt => "id of object is empty"
        ));
        log_str("4  [ deletesectiontextandhead.php:INFO ] delete head Error:  \r\n");
    }


    log_str("10  [ deletesectiontextandhead.php:INFO ] delete head Error:  \r\n");
} catch (Exception $e) {
    log_str("5  [ deletesectiontextandhead.php:INFO ] delete head Error:  \r\n");

    $rtntext = "(deletesectiontextandhead.php)Exception Message:  \n " . $e->getMessage();
    echo json_encode(array(
        status => false,
        rtntxt => $rtntext
    ));
}
?>