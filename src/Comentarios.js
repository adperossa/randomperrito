import React from 'react';
import Respuesta from './Respuesta';

const fakePostUrl = 'https://jsonplaceholder.typicode.com/comments';


class Comentarios extends React.Component {

  state = {
    hayRespuesta: false,
    respuesta: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    let formObject = {};
    data.forEach((value, key) => {formObject[key] = value});

    const opcionesPost = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formObject)
    }

    fetch(fakePostUrl, opcionesPost)
      .then(this.props.chequearEstado)
      .then(res => res.json())
      .then(responseData => {
        const respuesta = JSON.stringify(responseData, null, 2)
        this.setState({ 
          respuesta,
          hayRespuesta: true
         })
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input className="u-full-width" name="nombre" id="nombre" type="text" required />

        <label htmlFor="comentario">Comentario</label>
        <textarea className="u-full-width" name="comentario" id="comentario" required></textarea>

        {
          this.state.hayRespuesta ?
            <Respuesta data={this.state.respuesta} />
          :
            null
        }

        <button type="submit" id="submit">Enviar!</button>
      </form>
    )
  }
}

export default Comentarios;
