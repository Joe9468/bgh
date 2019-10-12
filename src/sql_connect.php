<?php

header("Content-type:text/html;charset=utf-8");

// 数据库一：用来保存办公会相关数据
$db1_dbm = 'mysql';
$db1_host = '127.0.0.1';
$db1_dbname = 'db_bgh';
$db1_user = 'bgh';
$db1_password = 'bgh';
$db1 = null;

// 数据库二：用来读取财务系统数据
$db2_dbm = 'mssql';
$db2_host = '127.0.0.1';
$db2_year = '2019';
$db2_dbname_kjzw = 'kjzw_A_' . $db2_year;
$db2_dbname_ys = 'ys_' . $db2_year;
$db2_user = 'jcgc';
$db2_password = '';
$db2_ys = null;
$db2_kjzw = null;

$db1_dsn = "$db1_dbm:host=$db1_host;dbname=$db1_dbname";
echo  $db1_dsn;
// 连接数据库
try {
    $db1 = new PDO($db1_dsn, $db1_user, $db1_password);
    //$db2_ys = new PDO($db2_dbm . ":host=" . $db2_host . ";dbname=" . $db2_dbname_ys, $db2_user, $db2_password);
    //$db2_kjzw = new PDO($db2_dbm . ":host=" . $db2_host . ";dbname=" . $db2_dbname_kjzw, $db2_user, $db2_password);
    
    $db1->query("set names utf8");
    //$db2_ys->query("set names utf8");
    //$db2_kjzw->query("set names utf8");
} catch (PDOException $e) {
    throw new MyDatabaseException( $e->getMessage( ) , (int)$e->getCode( ) );
    echo "<br>数据库链接失败<br>";
}

