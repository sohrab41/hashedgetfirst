<?php
require_once('logmsg.php');
require_once('cfg.php');
 log_str("[ mail.php ] user:". $_POST['userName']."   userMessage ".$_POST['userMessage']. "\r\n");
 
 
 
 
if (isset($_POST['userName']) && isset($_POST['userMessage'])  && isset($_POST['userMessage'])  )
{
        $modtager = "egfjord@mail.dk";//"sohrab41@gmail.com";//"hashed@dianick.dk" ;
        $emne = "Mail fra en bruger";
        $userMessage = "Hej, du har modtaget mail fra en bruger: \n 
                            Navn:   ". $_POST['userName']. "\n
                            Email:  ". $_POST['userEmail']. "\n
                            Tel:    ". $_POST['userPhone']. "\n
                            Emne:   ". $_POST['shortText']. "\n     
                            Besked: ". $_POST['userMessage'];
        $header = $_POST['userEmail'];
      mail($modtager, $emne, $userMessage, $header);
 log_str("[ mail.php ] user:". $_POST['userName']."   userMessage ".$_POST['userMessage']."   Emne: ".   $_POST['shortText']. "\r\n");
        echo "Emailen er nu sendt! til egfjord@mail.dk";
    
}
?>