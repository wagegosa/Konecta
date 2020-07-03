import React from 'react';
import Axios from 'axios';
class Actions extends React.Component {
	state = {
		products: []
	}
	//Obtener productos
	fetchProdducts = () => {
		Axios.get('http://localhost/Konecta/Products/all-product.php')
		.then(({data}) => {
			if(data.success === 1){
				this.setState({
					products:data.id.reverse()
				});
			}
		})
		.catch(error => {
			console.log(error);
		})
	}
	//Modo de edición
	editMode = (id) => {
		let products = this.state.products.map(product => {
			product.isEditing = product.ID === id;
			return product;
		});
		this.setState({
			products
		});
	}
	//Cancelar modo de edición
	cancelEdit = (id) => {
		let products = this.state.products.map(product => {
			product.isEditing = false;
			return product
		});
		this.setState({
			products
		});
	}
	//Actualizar productos
	handleUpdate = (id, NombreProducto, Referencia, precio, Peso, Categoria, Stock, FechaCreacion) => {
		Axios.post('http://localhost/Konecta/Products/update-product.php',
			{
				id: id,
				NombreProducto: NombreProducto,
				Referencia: Referencia,
				precio: precio,
				Peso: Peso,
				Categoria: Categoria,
				Stock: Stock,
				FechaCreacion: FechaCreacion
			})
			.then(({ data }) => {
				if (data.success === 1) {
					let products = this.state.products.map(product => {
						if (product.id === id || product.ID === id) {
						//if (product.id === id || product.ID === id) {
							product.NombreProducto = NombreProducto;
							product.Referencia = Referencia;
							product.precio = precio;
							product.Peso = Peso;
							product.Categoria = Categoria;
							product.Stock = Stock;
							product.FechaCreacion = FechaCreacion;
							product.isEditing = false;
							return product;
						}
						return product;
					});
					this.setState({
						products
					});
				} else {
					alert(data.msg);
				}
			})
			.catch(error => {
				console.log(error);
			})
	}
	//Eliminar producto
	handleDelete = (id) => {
		let deleteProduct = this.state.products.filter(product => {
			return product.id !== id;
		});
		Axios.post('http://localhost/Konecta/Products/delete-product.php', {
			id: id
		})
			.then(({ data }) => {
				if (data.success === 1) {
					this.setState({
						products: deleteProduct
					});
				} else {
					alert(data.msg);
				}
			})
			.catch(error => {
				console.log(error);
			})
	}
	//Insertar Producto
	insertProduct = (event, NombreProducto, Referencia, precio, Peso, Categoria, Stock, FechaCreacion) => {
		event.preventDefault();
		event.persist();
		Axios.post('http://localhost/Konecta/Products/add-product.php', {
			NombreProducto: NombreProducto,
			Referencia: Referencia,
			precio: precio,
			Peso: Peso,
			Categoria: Categoria,
			Stock: Stock,
			FechaCreacion: FechaCreacion
		})
		.then(function ({ data }) {
			if (data.success === 1) {
				this.setState({
					products: [
						{ "id": data.id, "NombreProducto": NombreProducto, "Referencia": Referencia, "precio": precio, "Peso": Peso, "Categoria": Categoria, "Stock": Stock, "FechaCreacion": FechaCreacion },
						...this.state.products
					]
				});
				event.target.reset();
			}
			else {
				alert(data.msg);
			}
		}.bind(this))
		.catch(function (error) {
			console.log(error);
		});
	}
}
export default Actions;
