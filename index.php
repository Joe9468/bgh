<?php

    header('Content-Type:text/html;charset=utf-8');
    session_start();
    if (isset($_SESSION["username"])) {
        header("Location: temp.html");
        exit();
    }
    header("Location: login.html"); 
    