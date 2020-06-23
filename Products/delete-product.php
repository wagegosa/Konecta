<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));
if(isset($data->id) && is_numeric($data->id)){
    $delID = $data->id;
    $deleteProduct = mysqli_query($db_conn,"DELETE FROM productos WHERE id='$delID'");
    if($deleteProduct){
        echo json_encode(["success"=>1,"msg"=>"Producto Eliminado"]);
    }
    else{
        echo json_encode(["success"=>0,"msg"=>"¡Producto no encontrado!"]);
    }
}
else{
    echo json_encode(["success"=>0,"msg"=>"¡Producto no encontrado!"]);
}
