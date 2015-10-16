<?php
	include('config.php');
	$qry= "select * from angular_products";
	$qry_res =mysql_query($qry);

$datalist = array();
while($rows = mysql_fetch_array($qry_res))
{
$datalist[] = array(
"id" =>$rows['id'],
"pname" =>$rows['pname'],
"pdiscription" => $rows['pdiscription'],
"price" => $rows['price'],
"file" => explode(',',$rows['pimage'])
);
}

 echo json_encode($datalist);


	
?>
