<?php

    include_once 'mysql.php';

    $sql = "SELECT * FROM `tb_users` WHERE `username` LIKE '" . $_GET['username'] . "'";

    $user = mysql_fetch_assoc(my_query($sql));
    if (!$user) {
        echo '用户不存在，请重新输入';  
    }
    echo '欢迎您：'.$user['username'];

    // 保持登录状态

    mysql_close();
    
    if ($_GET['action'] === 'logout') {
        // 清除登录状态
    }




