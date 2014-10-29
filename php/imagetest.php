<?php 
if( isset($_POST['submit']) ) {   
    include('SimpleImage.php'); 
    $image = new SimpleImage(); 
    $image->load($_FILES['uploaded_image']['tmp_name']); 
    $image->resizeToWidth(150); 
    $image->output(); } 
else {   
    ?>   
<form action="upload.php" method="post" enctype="multipart/form-data"> 
    <input type="file" name="uploaded_image" />   
    <input type="submit" name="submit" value="Upload" />   
</form>

 <?php 
} 
 ?>