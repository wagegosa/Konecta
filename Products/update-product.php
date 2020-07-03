<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));
if(isset($data->id) && isset($data->NombreProducto) && isset($data->Referencia) && isset($data->precio) && isset($data->Peso) && isset($data->Categoria) && isset($data->Stock) && isset($data->FechaCreacion)
	&& is_numeric($data->id) && !empty(trim($data->NombreProducto)) && !empty(trim($data->Referencia)) && !empty(trim($data->precio)) && !empty(trim($data->Peso)) && !empty(trim($data->Categoria)) && !empty(trim($data->Stock)) && !empty(trim($data->FechaCreacion)) 
){
    $NombreProducto = mysqli_real_escape_string($db_conn, trim($data->NombreProducto));
    $Referencia = mysqli_real_escape_string($db_conn, trim($data->Referencia));
    $precio = mysqli_real_escape_string($db_conn, trim($data->precio));
    $Peso = mysqli_real_escape_string($db_conn, trim($data->Peso));
    $Categoria = mysqli_real_escape_string($db_conn, trim($data->Categoria));
    $Stock = mysqli_real_escape_string($db_conn, trim($data->Stock));
    $FechaCreacion = mysqli_real_escape_string($db_conn, trim($data->FechaCreacion));
    $updateProduct = mysqli_query($db_conn,"UPDATE productos SET NombreProducto= '$NombreProducto', Referencia= '$Referencia', precio= $precio, Peso= $Peso, Categoria='$Categoria', Stock= '$Stock', FechaCreacion= '$FechaCreacion' WHERE id=$data->id");
    /*echo "<pre>";
    print_r("UPDATE productos SET NombreProducto= '$NombreProducto', Referencia= '$Referencia', precio= $precio, Peso= $Peso, Categoria='$Categoria', Stock= '$Stock', FechaCreacion= '$FechaCreacion' WHERE id=$data->id");
    echo "</pre>";
    die;*/
    if($updateProduct){
        echo json_encode(["success"=>1,"msg"=>"Producto actualizado."]);
    }
    else{
        echo json_encode(["success"=>0,"msg"=>"¡Producto no actualizado!"]);
    }
}
else{
    echo json_encode(["success"=>0,"msg"=>"¡¡Porfavor ingrese los datos ingresado!"]);
}
