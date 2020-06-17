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
                    <div className="row">
                        <div className="col-12 col-md-5">
                            <label>Producto</label>
                            <input name="producto" onChange={ handleChange } value={ producto } type="text"></input>
                        </div>
                        <div className="col-12 col-md-5">
                            <label>Cantidad</label>
                            <input name="cantidad" onChange={ handleChange } value={ cantidad } type="number"></input>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary"> Agregar </button>
                </form>

            </div>
        )
    }

}

export default FormProducto;