import React from 'react';
import Axios from 'axios';
class Actions extends React.Component {
    state = {
        products: []
    }

    // FETCH PRODUCTS FROM DATABASE
    fetchProducts = () => {
        Axios.get('http://localhost/Konecta/Products/all-product.php')
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

    // ON EDIT MODE
    editMode = (id) => {
        let products = this.state.products.map(product => {
            if (product.id === id) {
                product.isEditing = true;
                return product;
            }
            product.isEditing = false;
            return product;
        });

        this.setState({
            products
        });
    }

    //CANCEL EDIT MODE
    cancelEdit = (id) => {
        let products = this.state.products.map(product => {
            if (product.id === id) {
                product.isEditing = false;
                return product;
            }
            return product

        });
        this.setState({
            products
        });
    }

    // UPDATE PRODUCT
    handleUpdate = (id, NombreProducto, Referencia, precio, Peso, Categoria, Stock, FechaCreacion) => {
        Axios.post('http://localhost/Konecta/Products/update-user.php',
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
                        if (product.id === id) {
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
                }
                else {
                    alert(data.msg);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    // DELETE PRODUCT
    handleDelete = (id) => {
        let deleteProduct = this.state.products.filter(product => {
            return product.id !== id;
        });

        Axios.post('http://localhost/Konecta/Products/delete-user.php', {
            id: id
        })
            .then(({ data }) => {
                if (data.success === 1) {
                    this.setState({
                        products: deleteProduct
                    });
                }
                else {
                    alert(data.msg);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    // INSERT PRODUCT
    insertProduct = (event, NombreProducto, Referencia, precio, Peso, Categoria, Stock, FechaCreacion) => {
        event.preventDefault();
        event.persist();
        Axios.post('http://localhost/Konecta/Products/add-user.php', {
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
