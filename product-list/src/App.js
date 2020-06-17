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
            productos: []
        }

        this.handleChangeForm = this.handleChangeForm.bind(this);
    }
    

    componentDidMount() {
        this.getProducts();
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

    handleAddProduct = ( parametro ) => {

        if ( this.state.formValues.id ) {
            alert("editando")
            
        } else {
            const nuevaListaProductos = this.state.productos; 
            nuevaListaProductos.push({
                id: nuevaListaProductos.length,
                nombre: this.state.formValues.producto,
                cantidad:  parseInt( this.state.formValues.cantidad, 10 )
            })
    
            this.setState({ productos: nuevaListaProductos});
    
            console.log( this.state.productos );

        }
    }

    handleEdit = ( item ) => {
        console.log(item);

        this.setState({
            formValues: {
                id: item.id,
                producto: item.nombre,
                cantidad: item.cantidad,
            },
        })


    }

    getProducts = async () => {
        const respuesta = await fetch("http://localhost:3000/productos.json");
        const datos = await respuesta.json()
        console.log(datos);
        this.setState( {productos:datos })
    }

    render() {

        return (
          <div className="App">
            <header className="App-header">
                <FormProducto
                    onAddProduct={ this.handleAddProduct }
                    formValues={this.state.formValues}
                    handleChange={ this.handleChangeForm }
                />
              <ListaProductos titulo="Productos en stock" productos={this.productosEnStock()} onClick={ this.handleEdit }/>
              <ListaProductos titulo="Productos sin stock" productos={this.productosSinStock()} />
              <ListaProductos titulo="Productos a reponer" productos={this.productosAReponerStock()} />
              <ListaProductos titulo="Productos en oferta" productos={this.state.productos.filter( producto => producto.cantidad >= 5 )} />
            </header>
          </div>
        );

    }
}

export default App;
