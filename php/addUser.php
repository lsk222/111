<?php
include "conn.php";

if (isset($_POST['phoneNum'])&&isset($_POST['password'])) {
    $userPhone = $_POST['phoneNum'];
    $password=$_POST['password'];
    $conn->query("insert into users values(null,'$userPhone','$password')");
    header('location:http://it.lsk.com/111/src/login.html');
    // $result = $conn->query("insert into users values() * from users where phonenum='$userPhone'");
    // if ($result->fetch_assoc()) { //匹配成功
    //     echo true;
    // } else { //匹配不成功
    //     echo false;
    // }
}