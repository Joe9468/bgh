<?php

    header('Content-Type:text/html;charset=utf-8');
    session_start();
    if (isset($_SESSION["username"])) {
        header("Location: main.html");
        exit();
    }
    header("Location: login.html"); 
    