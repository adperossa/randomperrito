import React from 'react';

class SelectorRaza extends React.Component {

  /**
   * Simple fn auxiliar que devuelve la cadena con la primera inicial en mayúscula, para arreglar la vista del
   * select en Firefox (en Chrome capitaliza automáticamente)
   * @param {string} str La cadena a capitalizar
   */
  capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  handleSelect = (e) => {
    this.props.cambiarImagen(e.target.value);
  }

  render() {
    return (
      <>
        <label htmlFor="razas">Eleg&iacute; una raza</label>
        <select className="u-full-width" id="razas" onChange={this.handleSelect}>
          {
            this.props.razas.map( (item, index) => 
              <option value={item} key={index}>{this.capitalize(item)}</option>
            )
          }
        </select>
      </>
    )
  }
}

export default SelectorRaza;