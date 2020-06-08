<?php
//php引入公共文件
require "conn.php";

$sql="select * from sicks";
// mysqli_query($conn,'SET NAMES UTF8');
$result = mysqli_query($conn,$sql);  
$arr=mysqli_fetch_all($result, MYSQL_ASSOC);
// 三、响应(就是使用echo)
echo json_encode($arr);  
