<?php
include "conn.php";

if (isset($_POST['phoneNum'])) {
    $userPhone = $_POST['phoneNum'];
    $result = $conn->query("select * from users where phonenum='$userPhone'");
    if ($result->fetch_assoc()) { //匹配成功
        echo "1";
    } else { //匹配不成功 
        echo "0";
    }
}