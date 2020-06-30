<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if(isset($data->NombreProducto) && isset($data->Referencia) && isset($data->precio) && isset($data->Peso) && isset($data->Categoria) && isset($data->Stock) && isset($data->FechaCreacion) 
	&& !empty(trim($data->NombreProducto)) && !empty(trim($data->Referencia)) && !empty(trim($data->precio)) && !empty(trim($data->Peso)) && !empty(trim($data->Categoria)) && !empty(trim($data->Stock)) && !empty(trim($data->FechaCreacion)) 
	){
    $NombreProducto = mysqli_real_escape_string($db_conn, trim($data->NombreProducto));
    $Referencia = mysqli_real_escape_string($db_conn, trim($data->Referencia));
    $precio = mysqli_real_escape_string($db_conn, trim($data->precio));
    $Peso = mysqli_real_escape_string($db_conn, trim($data->Peso));
    $Categoria = mysqli_real_escape_string($db_conn, trim($data->Categoria));
    $Stock = mysqli_real_escape_string($db_conn, trim($data->Stock));
    $FechaCreacion = mysqli_real_escape_string($db_conn, trim($data->FechaCreacion));
    $insertProduct = mysqli_query($db_conn,"INSERT INTO inventario.productos(NombreProducto, Referencia, precio, Peso, Categoria, Stock, FechaCreacion) VALUES('$NombreProducto', '$Referencia', $precio, $Peso, '$Categoria', '$Stock', '$FechaCreacion')");
    /*echo "<pre>";
    echo "INSERT INTO inventario.productos(NombreProducto, Referencia, precio, Peso, Categoria, Stock, FechaCreacion) VALUES('$NombreProducto', '$Referencia', $precio, $Peso, '$Categoria', '$Stock', '$FechaCreacion')";
    echo "</pre>";
    die;*/
    if($insertProduct){
        $last_id = mysqli_insert_id($db_conn);
        echo json_encode(["success"=>1,"msg"=>"Productos insertado.","id"=>$last_id]);
    }
    else{
        echo json_encode(["success"=>0,"msg"=>"¡Producto no insertado!"]);
    }
}
else{
    echo json_encode(["success"=>0,"msg"=>"¡Porfavor ingrese los datos ingresado!"]);
}
