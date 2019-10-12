<?php
include_once 'sql_connect.php';

$sql = " SELECT * FROM `tb_users` WHERE `username` =  '" . $_POST["username"]  . "'";
$qu = $db1->query($sql);
$user = $qu->fetch(PDO::FETCH_ASSOC);
$qu->closeCursor();

// 验证是否有用户
if (!is_array($user)) {
    echo 'not_has_the_user';
    exit;
}

// 验证是否锁定
if ($user["ps_times"] >= 3) {
    echo "user_is_lock";
    exit;
}

// 验证密码错误
if ($user["password"] != $_POST["password"]) {
    $times = $user["ps_times"] + 1;
    $sql = " UPDATE `tb_users` SET `ps_times` = '" . $times . "' WHERE `tb_users`.`uid` = '" . $user[0] . "'";
    $qu = $db1->query($sql);
    $qu->closeCursor();
    echo 'password_is_wrong';
    exit;
}

// 验证是否长时间记录
if ($_POST["remember"] = "remember") {
    session_set_cookie_params(604800);
}

// 登录成功
$times = 0;
$sql = " UPDATE `tb_users` SET `ps_times` = '" . $times . "' WHERE `tb_users`.`uid` = '" . $user[0] . "'";
$qu = $db1->query($sql);
$qu->closeCursor();
session_start();
$_SESSION = $user;
echo 'login_sussed';
