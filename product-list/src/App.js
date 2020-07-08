import React, {useState, useEffect} from 'react';
import './App.css';
import ListaProductos from './components/ListaProductos';
import FormProducto from './components/FormProducto';

function App() {

    const [formValues, setFormValues] = useState({
        producto: '',
        cantidad: 0,
    });
    
    const [productos, setProductos] = useState([]);

    useEffect(() => {

        const getProducts = async () => {
            const respuesta = await fetch("http://localhost:3000/productos.json");
            const datos = await respuesta.json()
            console.log(datos);
            setProductos(datos)
        }
        
        getProducts();

    }, [])


    const handleChangeForm = (e) => {

        const { name, value } = e.target;


            setFormValues({
                ...formValues ,
                [name] : value
            })
    }

    const productosEnStock = () => productos.filter(producto => producto.cantidad > 0)

    const productosSinStock = () => productos.filter(producto => producto.cantidad === 0)
    
    const productosAReponerStock = () => productos.filter(producto => producto.cantidad === 1)

    const handleAddProduct = ( parametro ) => {

        if ( formValues.id ) {
            alert("editando")
            
        } else {
            const nuevaListaProductos = [...productos]; 
            nuevaListaProductos.push({
                id: nuevaListaProductos.length,
                nombre: formValues.producto,
                cantidad:  parseInt( formValues.cantidad, 10 )
            })
    
            setProductos( nuevaListaProductos );

        }
    }

    const handleEdit = ( item ) => {
        console.log(item);

        setFormValues({
            id: item.id,
            producto: item.nombre,
            cantidad: item.cantidad,
        })

    }



    return (
        <div className="App">
        <header className="App-header">
            <FormProducto
                onAddProduct={ handleAddProduct }
                formValues={formValues}
                handleChange={ handleChangeForm }
            />
            <ListaProductos titulo="Productos en stock" productos={productosEnStock()} onClick={ handleEdit }/>
            <ListaProductos titulo="Productos sin stock" productos={productosSinStock()} />
            <ListaProductos titulo="Productos a reponer" productos={productosAReponerStock()} />
            <ListaProductos titulo="Productos en oferta" productos={productos.filter( producto => producto.cantidad >= 5 )} />
        </header>
        </div>
    );

}

export default App;
