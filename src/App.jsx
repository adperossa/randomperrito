import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { useListaRazas } from "./hooks/useRaza";
import SelectorRaza from "./SelectorRaza";
import Imagen from "./Imagen";
import Comentarios from "./Comentarios";

const App = () => {
  const [razaActual, setRazaActual] = useState("affenpinscher");
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState();
  const { data: listaRazas } = useListaRazas({ setError });

  async function getImgRaza(raza) {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dog.ceo/api/breed/${raza}/images/random`
      );
      if (!res.ok) {
        throw new Error(`Error recuperando imagen de raza ${raza}.`);
      }
      const data = await res.json();
      console.log(data);
      setImgUrl(data.message);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getImgRaza(razaActual);
  }, [razaActual])

  return (
    <>
      <header>
        <h1 className="logo">RandomPerrito</h1>
      </header>
      <div className="container">
        <SelectorRaza razas={listaRazas} cambiarImagen={setRazaActual} />
        {error ? (
          <p>Oops! : {error.message}</p>
        ) : (
          <Imagen
            url={imgUrl}
            nuevaImagen={() => getImgRaza(razaActual)}
            loading={loading}
            handleLoading={setLoading}
          />
        )}
        <Comentarios />
      </div>
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
