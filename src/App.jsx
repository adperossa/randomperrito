import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import SelectorRaza from './SelectorRaza';
import Imagen from './Imagen';
import Comentarios from './Comentarios';

//endpoints
const listaRazasUrl = 'https://dog.ceo/api/breeds/list';
const imgRandomRazaUrl = 'https://dog.ceo/api/breed/-raza-/images/random';

const App = () => {
  const [listaRazas, setListaRazas] = useState([]);
  const [imgUrl, setImgUrl] = useState('');
  const [razaActual, setRazaActual] = useState('affenpinscher');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
  * Trae un recurso desde la url recibida, revisa su validez y lo devuelve parseado como json
  * @param {string} url La url del recurso a buscar
  */
  const getJSON = url => {
    return fetch(url)
      .then(chequearEstado)
      .then(response => response.json())
      .catch((e) => {
        setError(e.message);
        throw e;
      });
  }

  /**
  * Comprueba si la respuesta de fetch() es válida, si no, arroja un error con el estado del request
  * @param {Object} response objeto Response del fetch
  */
  const chequearEstado = response => {
    if (response.ok) {
      if (error) setError(null);
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(`${response.status} - ${response.statusText}`));
    }
  }

  /**
   * Trae una url de imagen de la raza elegida en el select, actualiza el
   * img que ya esta en vista, y cambia un momento la opacidad para dar feedback de la interaccion
   * del usuario
   */
  const getImagenDeRaza = (raza = razaActual) => {
    setLoading(true);
    getJSON(imgRandomRazaUrl.replace('-raza-', raza))
      .then(data => {
        setImgUrl(data.message);
        setRazaActual(raza);
      });
  }

  useEffect(() => {
    if (listaRazas.length === 0) {
      getImagenDeRaza();
      getJSON(listaRazasUrl)
        .then(data => {
          setListaRazas(data.message);
        });
    }
  }, []);

  return (
    <>
      <header>
        <h1 className="logo">RandomPerrito</h1>
      </header>
      <div className="container">
        <SelectorRaza razas={listaRazas} cambiarImagen={getImagenDeRaza} />
        {
          error ?
            <p>Ocurri&oacute; un error! : {error}</p>
            :
            <Imagen url={imgUrl} nuevaImagen={getImagenDeRaza} loading={loading} handleLoading={setLoading} />
        }
        <Comentarios chequearEstado={chequearEstado} />
      </div>
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
