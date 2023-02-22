const SelectorRaza = ({ razas, cambiarImagen }) => {
  return (
    <>
      <label htmlFor="razas">Eleg&iacute; una raza</label>
      <select className="u-full-width" id="razas" onChange={(e) => cambiarImagen(e.target.value)}>
        {
          razas.map((item, index) =>
            <option value={item} key={index}>{capitalize(item)}</option>
          )
        }
      </select>
    </>
  );
};

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default SelectorRaza;