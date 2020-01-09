import React from 'react';

const Respuesta = props => {
  return (
    <>
      <label htmlFor="respuesta">Respuesta recibida</label>
      <textarea 
        style={{height: '150px'}}
        className="u-full-width" 
        name="respuesta"
        value={props.data}
        disabled
      >
      </textarea>
    </>
  )
}

export default Respuesta;