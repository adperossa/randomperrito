import { createRoot } from "react-dom/client";
import { useState } from "react";
import { useListaRazas, useImgRaza } from "./hooks/useRaza";
import SelectorRaza from "./SelectorRaza";
import Imagen from "./Imagen";
import Comentarios from "./Comentarios";

const App = () => {
  const [razaActual, setRazaActual] = useState("affenpinscher");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState();
  const { data: listaRazas } = useListaRazas({ setError });
  const { imgUrl, refreshImg } = useImgRaza(razaActual, setLoading, setError);

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
            nuevaImagen={() => refreshImg(razaActual)}
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
