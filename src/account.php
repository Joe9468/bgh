<?php

include_once 'sql_connect.php';

$sql = "SELECT * FROM `tb_users` WHERE `username` LIKE '" . $_POST['username'] . "'";
 
$user = $db1->query($sql)->fetch(PDO::FETCH_ASSOC);

session_start();
$_SESSION = $user;

echo '欢迎您：' . $user['username'];
