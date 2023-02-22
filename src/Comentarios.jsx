import { useState } from 'react';
import Respuesta from './Respuesta';

const fakePostUrl = 'https://jsonplaceholder.typicode.com/comments';

const Comentarios = ({ chequearEstado }) => {
  const [respuesta, setRespuesta] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    let formObject = {};
    data.forEach((value, key) => { formObject[key] = value });

    const opcionesPost = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formObject)
    }

    fetch(fakePostUrl, opcionesPost)
      .then(chequearEstado)
      .then(res => res.json())
      .then(responseData => {
        const respuesta = JSON.stringify(responseData, null, 2)
        setRespuesta(respuesta)
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nombre">Nombre</label>
      <input className="u-full-width" name="nombre" id="nombre" type="text" required />
      <label htmlFor="comentario">Comentario</label>
      <textarea className="u-full-width" name="comentario" id="comentario" required></textarea>
      {
        respuesta ?
          <Respuesta data={respuesta} />
          :
          null
      }
      <button type="submit" id="submit">Enviar!</button>
    </form>
  );
}

export default Comentarios;
