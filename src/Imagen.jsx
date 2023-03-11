const Imagen = ({ url, nuevaImagen, loading, handleLoading }) => {
  return (
    <div className="card" onClick={nuevaImagen}>
      <div className="imgContainer">
        <img src={url} alt="Imagen de un perrito!" onLoad={() => handleLoading(false)} />
        {loading ?
          <div className="overlay">
            <div className="loader" />
          </div>
          :
          null}
      </div>
      <p>Hac&eacute; click para ver m&aacute;s im&aacute;genes de esta raza</p>
    </div>
  )
}

export default Imagen;