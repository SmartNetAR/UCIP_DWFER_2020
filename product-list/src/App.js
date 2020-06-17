import React from 'react';
import './App.css';
import ListaProductos from './components/ListaProductos';
import FormProducto from './components/FormProducto';

class App extends React.Component {

    constructor () {
        super();
        this.state = {
            formValues: {
                producto: '',
                cantidad: 0,
            },
            productos: [
                {
                id: 0,
                nombre: "banana",
                cantidad: 10
                },
                {
                id: 1,
                nombre: "manzana",
                cantidad: 0
                },
                {
                id: 2,
                nombre: "naranja",
                cantidad: 5
                },
                {
                id: 3,
                nombre: "durazno",
                cantidad: 1
                },
                {
                id: 4,
                nombre: "anana",
                cantidad: 0
                }
            ]
        }

        this.handleChangeForm = this.handleChangeForm.bind(this);
    }
    


    handleChangeForm(e) {

        const { name, value } = e.target;

        this.setState( {
            formValues: {
                ...this.state.formValues ,
                [name] : value
            }
        })
    }

    productosEnStock = () => this.state.productos.filter(producto => producto.cantidad > 0)

    productosSinStock = () => this.state.productos.filter(producto => producto.cantidad === 0)
    
    productosAReponerStock = () => this.state.productos.filter(producto => producto.cantidad === 1)

    handleIncrement = ( parametro ) => {

        const nuevaListaProductos = this.state.productos; 
        nuevaListaProductos.push({
            id: nuevaListaProductos.length,
            nombre: this.state.formValues.producto,
            cantidad:  parseInt( this.state.formValues.cantidad, 10 )
        })

        this.setState({ productos: nuevaListaProductos});

        console.log( this.state.productos );
    }

    render() {

        return (
          <div className="App">
            <header className="App-header">
                <FormProducto
                    onAddProduct={ this.handleIncrement }
                    formValues={this.state.formValues}
                    handleChange={ this.handleChangeForm }
                />
              <ListaProductos titulo="Productos en stock" productos={this.productosEnStock()} />
              <ListaProductos titulo="Productos sin stock" productos={this.productosSinStock()} />
              <ListaProductos titulo="Productos a reponer" productos={this.productosAReponerStock()} />
              <ListaProductos titulo="Productos en oferta" productos={this.state.productos.filter( producto => producto.cantidad >= 5 )} />
            </header>
          </div>
        );

    }
}

export default App;
