<?php

header('content-type:application/json;charset=utf-8');

include_once "sql_connect.php";
session_start();

$action = null;
$states = null;
$data = array();

function init_month($db1_f)
{
    $sql = "SELECT DISTINCT `month` FROM `tb_yltj` WHERE `rz` = 1 AND `dwid` LIKE '" . $_SESSION['dwid'] . "%' ORDER BY `month` DESC LIMIT 1";
    $qu = $db1_f->query($sql);
    $month = $qu->fetch(PDO::FETCH_ASSOC);
    $qu->closeCursor();
    return $month;
}

if ($_POST == null) {
    switch ($_GET["states"]) {
        case 0:
            $action = "init_success";
            $states = 00;
            $data = init_month($db1);
            break;
        case 1:
            // 删除数据
            $sql = "DELETE FROM `tb_yltj` WHERE `ylid` = '" . $_GET['ylid'] . "'";
            $qu = $db1->query($sql);
            $qu - closeCursor();
            $action = "del success";
            $states = 01;
            break;
        case 2:
            $sql =  "SELECT  'tb_yltj'.*, 'tb_dwxx'.'dw_name' FROM `tb_yltj`,'tb_dwxx' WHERE `dwid` LIKE '" . $_SESSION['dwid'] . "%' ORDER BY `dwid`";
            break;
    }
} else {
    switch ($_POST["states"]) {
        case 5:
            # code...
            break;
        case 6:
            # code...
            break;
    }
}


$send = json_encode(array(
    'action' => $action,
    'states' => $states,
    'data' => json_encode($data)
));

echo $send;
