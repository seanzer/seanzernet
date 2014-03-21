<?php
if ($_GET['randomId'] != "Y0wqyVsLiwxHUqjtAb_rVPOYpfEZplQcoSX6yKka3hIkgV6k8_ceHLnxGNJtMw8P") {
    echo "Access Denied";
    exit();
}

// display the HTML code:
echo stripslashes($_POST['wproPreviewHTML']);

?>  
