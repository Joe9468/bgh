<?php

header('content-type:application/json;charset=utf-8');

$action = null;
$states = null;
$data = null;

// 登出
if ( $_GET["action"] == "logout") {
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

// 登录
if ( $_POST["action"] == "login") {
    include_once 'sql_connect.php';

    $sql = " SELECT  `tb_users`.`uid`, `tb_users`.`username`, `tb_dwxx`.`dw_name`,`tb_users`.`power`,`tb_users`.`ps_times` FROM `tb_dwxx`  , `tb_users` WHERE `tb_users`.`username` = '" . $_POST["username"]  . "'";
    $qu = $db1->query($sql);
    $user = $qu->fetch(PDO::FETCH_ASSOC);
    $qu->closeCursor();
    
    if (!is_array($user)) {
        // 验证是否有用户
        $action = 'not_has_the_user';
        $states = 04;
    } elseif ($user["ps_times"] >= 3) {
        // 验证是否锁定
        $action = "user_is_lock";
        $states = 03;
    } elseif  ($user["password"] != $_POST["password"]) {
        // 验证密码错误
        $times = $user["ps_times"] + 1;
        $sql = " UPDATE `tb_users` SET `ps_times` = '" . $times . "' WHERE `tb_users`.`uid` = '" . $user[0] . "'";
        $qu = $db1->query($sql);
        $qu->closeCursor();
        $action = 'password_is_wrong';
        $states = 02;
    } else {
        if ($_POST["remember"] == "remember") {
            // 验证是否长时间记录
            session_set_cookie_params(604800);
        }
        // 登录成功
        $times = 0;
        $sql = " UPDATE `tb_users` SET `ps_times` = '" . $times . "' WHERE `tb_users`.`uid` = '" . $user[0] . "'";
        $qu = $db1->query($sql);
        $qu->closeCursor();
        session_start();
        $_SESSION = $user;
        $action = 'login_sussed';
        $states = 01;
    }
}

echo json_encode(array(
    'action'=>$action,
    'states'=>$states,
    'data'=>json_encode(array(
        'username'=>$user['username'],
        'dw_name'=>$user['dw_name'],
        'power'=>$user['power']
    ))
));
