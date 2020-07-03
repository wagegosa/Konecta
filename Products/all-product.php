<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$allProcts = mysqli_query($db_conn,"SELECT * FROM inventario.productos ORDER BY 1");
if(mysqli_num_rows($allProcts) > 0){
    $all_products = mysqli_fetch_all($allProcts,MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"msg"=>"Productos almacenado.","id"=>$all_products]);
}
else{
    echo json_encode(["success"=>0]);
}
