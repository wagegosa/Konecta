import React from 'react';
import Axios from 'axios';
class Actions extends React.Component {
	state = {
		products: []
	}
	//Obtener productos
	fetchProdducts = () => {
		Axios.get('http://localhost/Konecta/Products/all-product.php')
			//Axios.get('http://localhost/php-react/all-users.php')
			.then(({ data }) => {
				if (data.success === 1) {
					this.setState({
						products: data.products.reverse()
					});
				}
			})
			.catch(error => {
				console.log(error);
			})
	}
	//Modo de edición
	editMode = (ID) => {
		let products = this.state.products.map(product => {
			if (product.ID === ID) {
				product.isEditing = true;
				return product;
			}
			product.isEditing = false;
			return product;
		});
		console.log(products);
		this.setState({
			products
		});
	}
	//Cancelar modo de edición
	cancelEdit = (ID) => {
		let products = this.state.products.map(product => {
			if (product.ID === ID) {
				product.isEditing = false;
				return product;
			}
			return product
		});
		this.setState({
			products
		});
	}
	//Actualizar productos
	handleUpdate = (ID, NombreProducto, Referencia, precio, Peso, Categoria, Stock, FechaCreacion) => {
		Axios.post('http://localhost/Konecta/Products/add-product.php',
			{
				ID: ID,
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
						if (product.ID === ID) {
							product.NombreProducto = NombreProducto;
							product.Referencia = Referencia;
							product.precio = precio;
							product.Peso = Peso;
							product.Categoria = Categoria;
							product.Stock = Stock;
							product.FechaCreacion = FechaCreacion;
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
	handleDelete = (ID) => {
		let deleteProduct = this.state.products.filter(product => {
			return product.ID !== ID;
		});
		Axios.post('http://localhost/Konecta/Products/delete-product.php', {
			ID: ID
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
