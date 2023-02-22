const Respuesta = ({ data }) => {
  return (
    <>
      <label htmlFor="respuesta">Respuesta recibida</label>
      <textarea
        style={{ height: '150px' }}
        className="u-full-width"
        name="respuesta"
        value={data}
        disabled
      >
      </textarea>
    </>
  )
}

export default Respuesta;