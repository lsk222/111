<?php
include "conn.php";

if (isset($_GET['picid'])) {
    $picid = $_GET['picid']; //接收首页传入的sid
    $result = $conn->query("select * from list where id=$picid");
    echo json_encode($result->fetch_assoc());
}