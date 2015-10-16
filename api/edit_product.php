<?php
	include "config.php";

	$index = $_GET['prod_index'];
	$sqlDel="select *  FROM angular_products WHERE id = '".$index."'";
	$qry_res =mysql_query($sqlDel);
	$datalist = array();
		
	while($rows = mysql_fetch_array($qry_res))
	{
		$datalist = array(
		"id" =>$rows['id'],
		"pname" =>$rows['pname'],
		"pdiscription" => $rows['pdiscription'],
		"price" => $rows['price'],
		"file" => explode(',',$rows['pimage'])
		);
	}
	 echo json_encode($datalist);
?>