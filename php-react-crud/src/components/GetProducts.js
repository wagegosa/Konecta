import React, { Component } from 'react';
import { AppContext } from '../Context';
class GetProducts extends Component {
	static contextType = AppContext;

	componentDidMount() {
		this.context.get_products();
	}
	handleUpdate = (id) => {
		this.context.handleUpdate(id, this.NombreProducto.value, this.Referencia.value, this.precio.value, this.Peso.value, this.Categoria.value, this.Stock.value, this.FechaCreacion.value);
	}
	render() {
		let allProducts;
		let mainData;
		allProducts = this.context.all_products.map(({ ID, NombreProducto, Referencia, precio, Peso, Categoria, Stock, FechaCreacion, isEditing }) => {
			return isEditing === true ? (
				<tr key={ID}>
					<td><input className="form-control" type="text" ref={(item) => this.NombreProducto = item} defaultValue={NombreProducto} /></td>
					<td><input className="form-control" type="text" ref={(item) => this.Referencia = item} defaultValue={Referencia} /></td>
					<td><input className="form-control" type="text" ref={(item) => this.precio = item} defaultValue={precio} /></td>
					<td><input className="form-control" type="text" ref={(item) => this.Peso = item} defaultValue={Peso} /></td>
					<td><input className="form-control" type="text" ref={(item) => this.Categoria = item} defaultValue={Categoria} /></td>
					<td><input className="form-control" type="text" ref={(item) => this.Stock = item} defaultValue={Stock} /></td>
					<td><input className="form-control" type="date" ref={(item) => this.FechaCreacion = item} defaultValue={FechaCreacion} /></td>
					<td>
						<button className="btn btn-success mr-2" onClick={() => this.handleUpdate(ID)}>Actulizar</button>
						<button onClick={() => this.context.cancelEdit(ID)} className="btn btn-light">Cancelar</button>
					</td>
				</tr>
			) : (
					<tr key={ID}>
						<td>{NombreProducto}</td>
						<td>{Referencia}</td>
						<td>{precio}</td>
						<td>{Peso}</td>
						<td>{Categoria}</td>
						<td>{Stock}</td>
						<td>{FechaCreacion}</td>
						<td>
							<button className="btn btn-dark mr-2" onClick={() => this.context.editMode(ID)}>Edit</button>
							<button onClick={() => this.context.handleDelete(ID)} className="btn btn-danger">Delete</button>
						</td>
					</tr>
				);
		});
		if (this.context.all_products.length > 0) {
			mainData = (
				<table className="table table-bordered  table-hover table-striped text-center" width="100%">
					<thead>
						<tr>
							<th data-filterable="false">Nombre Producto</th>
							<th data-breakpoints="xs sm" >Referencia</th>
							<th data-breakpoints="xs sm" >precio</th>
							<th data-breakpoints="xs sm" >Peso</th>
							<th data-breakpoints="xs sm" >Categoria</th>
							<th data-breakpoints="xs sm" >Stock</th>
							<th data-breakpoints="xs sm" >FechaCreacion</th>
							<th data-breakpoints="xs sm" data-filterable="false">Actions</th>
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
