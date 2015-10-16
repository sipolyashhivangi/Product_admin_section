<?php
include('config.php');


    $data = json_decode(file_get_contents("php://input"));     
    $index = $data->prod_index; 

	$sqlDel="DELETE  FROM angular_products WHERE id = '".$index."'";
    $del = mysql_query($sqlDel);
     




?>