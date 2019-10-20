<?php

header('content-type:application/json;charset=utf-8');

include_once "sql_connect.php";
session_start();

$action = null;
$states = null;
$data = null;

switch ($_GET["states"]) {
    case 0:
        break;
    case 1:
        // 删除数据
        $sql = "DELETE FROM `tb_yltj` WHERE `ylid` = " . $_GET['ylid'];
        $qu = $db1->query($sql);
        $qu - closeCursor();
        $action = "del success";
        $states = 01;
        break;
    case 2:
        break;
}

switch ($_POST["states"]) {
    case 5:
        # code...
        break;
    case 6:
        # code...
        break;
}

echo json_encode(array(
    'action' => $action,
    'states' => $states,
    'data' => json_encode($_data)
));
