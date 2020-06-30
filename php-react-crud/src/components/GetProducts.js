import React, { Component } from 'react';
import { AppContext } from '../Context';
class GetProducts extends Component {
	static contextType = AppContext;

	componentDidMount() {
		this.context.get_products();
	}

	handleUpdate = (id) => {
		//this.context.handleUpdate(id, this.NombreProducto.value, this.Referencia.value, this.precio.value, this.Peso.value, this.Categoria.value, this.Stock.value, this.FechaCreacion.value);
		this.context.handleUpdate(id, this.NombreProducto.value, this.Referencia.value, this.precio.value, this.Peso.value, this.Categoria.value, this.Stock.value, this.FechaCreacion.value);
	}

	render() {
		let allProducts;
		let mainData;
		allProducts = this.context.all_products.map(({ id, NombreProducto, Referencia, precio, Peso, Categoria, Stock, FechaCreacion, isEditing }) => {
			return isEditing === true ? (
				<tr key={id}>
					<td><input className="form-control" type="text" ref={(item) => this.NombreProducto = item} defaultValue={NombreProducto} /></td>
					<td><input className="form-control" type="text" ref={(item) => this.Referencia = item} defaultValue={Referencia} /></td>
					<td><input className="form-control" type="text" ref={(item) => this.precio = item} defaultValue={precio} /></td>
					<td><input className="form-control" type="text" ref={(item) => this.Peso = item} defaultValue={Peso} /></td>
					<td><input className="form-control" type="text" ref={(item) => this.Categoria = item} defaultValue={Categoria} /></td>
					<td><input className="form-control" type="text" ref={(item) => this.Stock = item} defaultValue={Stock} /></td>
					<td><input className="form-control" type="text" ref={(item) => this.FechaCreacion = item} defaultValue={FechaCreacion} /></td>
					<td>
						<button className="btn btn-success mr-2" onClick={() => this.handleUpdate(id)}>Guardar</button>
						<button onClick={() => this.context.cancelEdit(id)} className="btn btn-light">Cancelar</button>
					</td>
				</tr>
			) : (
				<tr key={id}>
					<td>{NombreProducto}</td>
					<td>{Referencia}</td>
					<td>{precio}</td>
					<td>{Peso}</td>
					<td>{Categoria}</td>
					<td>{Stock}</td>
					<td>{FechaCreacion}</td>
					<td>
						<button className="btn btn-dark mr-2" onClick={() => this.context.editMode(id)}>Edit</button>
						<button onClick={() => this.context.handleDelete(id)} className="btn btn-danger">Delete</button>
					</td>
				</tr>
			);
		});
		if (this.context.all_products.length > 0) {
			mainData = (
				<table className="table table-striped table-bordered">
					<thead>
						<tr>
							<th>Nombre Producto</th>
							<th>Referencia</th>
							<th>precio</th>
							<th>Peso</th>
							<th>Categoria</th>
							<th>Stock</th>
							<th>FechaCreacion</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{allProducts}
					</tbody>
				</table>
			);
		}
		else {
			mainData = (
				<div className="alert alert-light" role="alert">
					<h4 className="alert-heading">¡Producto no encontrado!</h4>
					<hr />
					<p>Porfavor ingrese un producto.</p>
				</div>
			);
		}
		return (
			<>
				{mainData}
			</>
		);
	}
}
export default GetProducts;
