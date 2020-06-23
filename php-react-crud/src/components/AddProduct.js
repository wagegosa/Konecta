import React, { Component } from 'react';
import { AppContext } from '../Context';

class AddProduct extends Component {
    static contextType = AppContext;

    insertProduct = (event) => {
        this.context.insertProduct(event, this.NombreProducto.value, this.Referencia.value, this.precio.value, this.Peso.value, this.Categoria.value, this.Stock.value, this.FechaCreacion.value);
    }

    render() {
        return (
            <form onSubmit={this.insertProduct}>
                <div className="form-row">
                    <div className="form-group col-sm-6">
                        <label className="font-weight-bold">Nombre del Producto</label>
                        <input type="text" name="NombreProducto" ref={(val) => this.NombreProducto = val} className="form-control" placeholder="Nombre del Producto" />
                    </div>
                    <div className="form-group col-sm-6">
                        <label className="font-weight-bold">Referencia</label>
                        <input type="text" name="Referencia" ref={(val) => this.Referencia = val} className="form-control" placeholder="Referencia" />
                    </div>
                    <div className="form-group col-sm-6">
                        <label className="font-weight-bold">precio</label>
                        <input type="text" name="precio" ref={(val) => this.precio = val} className="form-control" placeholder="Precio" />
                    </div>
                    <div className="form-group col-sm-6">
                        <label className="font-weight-bold">Peso</label>
                        <input type="text" name="Peso" ref={(val) => this.Peso = val} className="form-control" placeholder="Peso" />
                    </div>
                    <div className="form-group col-sm-6">
                        <label className="font-weight-bold">Categoria</label>
                        <input type="text" name="Categoria" ref={(val) => this.Categoria = val} className="form-control" placeholder="Categoria" />
                    </div>
                    <div className="form-group col-sm-6">
                        <label className="font-weight-bold">Stock</label>
                        <input type="text" name="Stock" ref={(val) => this.Stock = val} className="form-control" placeholder="Stock" />
                    </div>
                    <div className="form-group col-sm-6">
                        <label className="font-weight-bold">Fecha de Creación</label>
                        <input type="date" name="FechaCreacion" ref={(val) => this.FechaCreacion = val} className="form-control" placeholder="Fecha de Creación" />
                    </div>
                    <div className="form-group col-sm-6 text-right">
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </form>
        );
    }
}
export default AddProduct;
