import React from "react";

 const Imagen = props => {
  return (
    <div className="card" onClick={() => props.nuevaImagen()}>
      <img src={props.url} alt="Imagen de un perrito!" />
      <p>Hac&eacute; click para ver m&aacute;s im&aacute;genes de esta raza</p>
    </div>
  )
}

export default Imagen;