import React from 'react';
import SelectorRaza from './SelectorRaza';
import Imagen from './Imagen';
import Comentarios from './Comentarios';
import CargandoImg from './images/cargando.png';

//endpoints
const listaRazasUrl = 'https://dog.ceo/api/breeds/list';
const imgRandomRazaUrl = 'https://dog.ceo/api/breed/-raza-/images/random';

class App extends React.Component {

  state = {
    listaRazas: [],
    imgUrl: '',
    razaActual: 'affenpinscher',
    razasCargadas: false
  }

  /**
  * Trae un recurso desde la url recibida, revisa su validez y lo devuelve parseado como json
  * @param {string} url La url del recurso a buscar
  */
  getJSON = url => {
    return fetch(url)
            .then(this.chequearEstado)
            .then(response => response.json())
            .catch(this.mostrarError);
  }

  /**
  * Comprueba si la respuesta de fetch() es válida, si no, arroja un error con el estado del request
  * @param {Object} response objeto Response del fetch
  */
  chequearEstado = response => {
    if (response.ok) {
      if (this.state.hayError === true) { 
        this.setState( {hayError: false})
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject( new Error(`${response.status} - ${response.statusText}`) );
    }
  }

  /**
  * Muestra el error ocurrido en consola y en la vista
  * @param {Object} error objeto Error
  */
  mostrarError = error => {
    this.setState({ 
      mensajeError: error.message,
      hayError: true
     });
    throw error;
  }

  /**
   * Trae una url de imagen de la raza elegida en el select, actualiza el
   * img que ya esta en vista, y cambia un momento la opacidad para dar feedback de la interaccion
   * del usuario
   */
  getImagenDeRaza = (raza = this.state.razaActual) => {
    this.setState({ imgUrl: CargandoImg });
    this.getJSON(imgRandomRazaUrl.replace('-raza-', raza))
      .then(data => {
        this.setState({ 
          imgUrl: data.message,
          razaActual: raza
         });
      });
  }

  componentDidMount() {
    if (!this.state.razasCargadas) {
        this.getImagenDeRaza();
        this.getJSON(listaRazasUrl)
          .then(data => {
            const listaRazas = data.message;
        
            this.setState({
              listaRazas,
              razasCargadas: true
            })
          });
    }
  }

  render() {
    return (
      <>
        <header>
          <h1 className="logo">RandomPerrito</h1>
        </header>
        <div className="container">
          <SelectorRaza razas={this.state.listaRazas} cambiarImagen={this.getImagenDeRaza} />
          { 
            this.state.hayError ?
            <p>Ocurri&oacute; un error! : {this.state.mensajeError}</p>
              :
            <Imagen url={this.state.imgUrl} nuevaImagen={this.getImagenDeRaza} />
          }
          
          <Comentarios chequearEstado={this.chequearEstado}/>
        </div>
      </>
    )
  }
}

export default App;
