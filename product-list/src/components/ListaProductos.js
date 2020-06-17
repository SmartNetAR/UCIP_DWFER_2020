import React, { Component } from 'react';

class ListaProductos extends Component {

    constructor(props) {
        super(props);
    }

    editar = ( producto ) =>  {
        this.props.onClick( producto );
    }

    render() {
        return (
            <div>
                <h2>
                    {this.props.titulo}
                </h2>

                <ul>
                    { this.props.productos.map( producto => 
                        <li
                            key={producto.id}>
                            { producto.nombre} 
                            <button
                                type="button" 
                                className="btn btn-primary"
                                onClick={ () => this.editar( producto ) }
                                
                                // onClick={ () => this.props.onClick(producto) }
                            >
                                Editar
                            </button>
                        </li> ) }
                </ul>

            </div>
        )
    }

}

export default ListaProductos;