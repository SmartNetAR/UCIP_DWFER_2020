import React from 'react';

class FormProducto extends React.Component {
    constructor( props ) {
        super( props );
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit(e) {
        e.preventDefault();

        this.props.onAddProduct();
    }

    render() {

        const { handleChange, formValues } = this.props ;
        const { producto, cantidad } = formValues;

        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <label>Producto</label>
                    <input name="producto" onChange={ handleChange } value={ producto } type="text"></input>
                    <label>Cantidad</label>
                    <input name="cantidad" onChange={ handleChange } value={ cantidad } type="number"></input>
                    <button type="submit" className="btn btn-primary"> Agregar </button>
                </form>

            </div>
        )
    }

}

export default FormProducto;