<?php

    include_once 'sql_connect.php';

    $sql = "SELECT * FROM `tb_users`";

    while ($user = $db1->query($sql)) {
        if (!$user){
            echo 'not_has_the_user';
        } else {
            echo 'has_the_user';
            break;
        }
    }

    
    $user = $db1->query($sql);
    if (!$user) {
        echo '';  
    }
    echo 'password_is_true';

    // 保持登录状态

    mysql_close();
    
    if ($_GET['action'] === 'logout') {
        // 清除登录状态
    }




