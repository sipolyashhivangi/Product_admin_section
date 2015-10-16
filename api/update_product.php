<?php
include "config.php";
//print_r($_POST);

$post_date = file_get_contents("php://input");
		$data1 = json_decode($post_date);
		
	$id = $data1->id;
	$pname = $data1->pname;
	$pdiscription = $data1->pdiscription;
	$price = $data1->price;
	$fileImg=$data1->file;
	$path = $data1->path;
	$time = time();
	$filePath ="img/";
	$dataFileVal = array();
	
foreach($path as $key=>$val)
{

	$data = $val;
	list($type, $data) = explode(';', $data);
	list(, $data)      = explode(',', $data);
	$data = base64_decode($data);
//echo $fileImg[$key];
	$file_path = '../img/'.$fileImg[$key];
	$dataImg=$fileImg[$key];
	$dataFileVal[]=$dataImg;
 //print_r($data);
	$uploadMul=file_put_contents($file_path, $data);
	

}
//print_r($dataFileVal);
$ImgVal= implode(',',$dataFileVal);
//print_r($ImgVal);

$qry="update angular_products set pname = '".$pname."', pdiscription= '".$pdiscription."',price = '".$price."',pimage= '".$ImgVal."' where id=$id";
	print_r($qry);
	$updated=mysql_query($qry);
	
	print_r($updated);
	if($updated)
	{
		echo "updated";
	}else{
		echo "error";
	}
	
	?>
	
	
	
