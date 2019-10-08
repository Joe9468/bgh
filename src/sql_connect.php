<?php

header("Content-type:text/html;charset=utf-8");

// 数据库一：用来保存办公会相关数据
$db1_host = '127.0.0.1';
$db1_user = 'bgh';
$db1_password = 'bgh';
$db1_dbname = 'db_bgh';

// 数据库二：用来读取财务系统数据
$db2_host = '127.0.0.1';
$db2_user = 'jcgc';
$db2_password = '';
$db2_dbname_kjcw = '';
$db2_dbname_ys = '';


// 连接数据库
$db1 = new PDO("mysql:host=" . $db1_host . ";dbname=" . $db1_dbname, $db1_user, $db1_password, array(PDO::ATTR_PERSISTENT => true));
// $db2_ys = new PDO("mysql:host=". $db1_host .";dbname=". $db1_dbname,$db1_user,$db1_password, array(PDO::ATTR_PERSISTENT => true));
// $db2_kj = new PDO("mysql:host=". $db1_host .";dbname=". $db1_dbname,$db1_user,$db1_password, array(PDO::ATTR_PERSISTENT => true));


$db1->query("set names utf8");
// $db2_ys->query("set names utf8");
// $db2_kj->query("set names utf8");
