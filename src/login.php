<?php

header('content-type:application/json;charset=utf-8');

include_once 'sql_connect.php';
session_start();

$action = null;
$states = null;
$data = null;

// 是否登录
if ($_GET['action'] == 'is_login') {
    if (isset($_SESSION["username"])) {
        $action = 'has_login';
        $states = 05;
    } else {
        $action = 'no_login';
        $states = 06;
    }
}


// 登出
if ($_GET["action"] == "logout") {
    $action = "user_has_logout";
    $states = 00;
    $_SESSION = array();
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params["path"],
            $params["domain"],
            $params["secure"],
            $params["httponly"]
        );
    }
}

// 修改密码
if ($_POST['action'] == "change_ps") {
    $sql = " UPDATE `tb_users` SET `password` = '" . $_POST["new_password"] . "' WHERE `tb_users`.`uid` = " . $_SESSION["uid"] ;
    $qu = $db1->query($sql);
    $qu->closeCursor();
    $_SESSION['password'] = $_POST['new_password'];
    $action = "password_has_changed";
    $states = 7;
}

// 登录
if ($_POST["action"] == "login") {
    $sql = " SELECT  `tb_users`.*, `tb_dwxx`.`dw_name` FROM `tb_dwxx`  , `tb_users` WHERE `tb_users`.`username` = '" . $_POST["username"]  . "'";
    $qu = $db1->query($sql);
    $_SESSION = $qu->fetch(PDO::FETCH_ASSOC);
    $qu->closeCursor();

    if (!is_array($_SESSION)) {
        // 验证是否有用户
        $action = 'not_has_the_user';
        $states = 04;
    } elseif ($_SESSION["ps_times"] >= 3) {
        // 验证是否锁定
        $action = "user_is_lock";
        $states = 03;
    } elseif ($_SESSION["password"] != $_POST["password"]) {
        // 验证密码错误
        $_SESSION["ps_times"]  = +1;
        $sql = " UPDATE `tb_users` SET `ps_times` = " . $_SESSION['ps_times'] . " WHERE `tb_users`.`uid` = " . $_SESSION['uid'];
        $qu = $db1->query($sql);
        $qu->closeCursor();
        $action = 'password_is_wrong';
        $states = 02;
        $_SESSION = array();
    } else {
        if ($_POST["remember"] == "remember") {
            // 验证是否长时间记录
            session_set_cookie_params(604800);
        }
        // 登录成功
        $sql = " UPDATE `tb_users` SET `ps_times` = 0 WHERE `tb_users`.`uid` = " . $_SESSION['uid'];
        $qu = $db1->query($sql);
        $qu->closeCursor();
        $action = 'login_sussed';
        $states = 01;
    }
}

echo json_encode(array(
    'action' => $action,
    'states' => $states,
    'data' => json_encode($_SESSION)
));
