<?php

header("Content-type:text/html;charset=utf-8");


function my_query($sql) {
    $res = mysql_query($sql);
    if (!$res) {
        echo 'SQL执行错误，错误编号为：'. mysql_errno(). '<br/>';
        echo 'SQL执行错误，错误信息为：'. mysql_error(). '<br/>';

        exit;
    }
    return $res;
}

$sql_host = '127.0.0.1';
$sql_user = 'ericsimith';
$sql_password = 'iloveyou';
$sql_dbname = 'bgh';

$link = mysql_connect($sql_host,$sql_user,$sql_password) 
        or die ('Not connected : ' . mysql_error());

my_query('set names utf8');
my_query('use ' . $sql_dbname);

