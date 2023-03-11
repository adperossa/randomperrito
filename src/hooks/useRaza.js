import { useState, useEffect } from 'react';

function useListaRazas({ setError }) {
  const [listaRazas, setListaRazas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listaRazas.length) {
      return { data: listaRazas };
    } else {
      getListaRazas();
    }

    async function getListaRazas() {
      try {
        setLoading(true);
        const res = await fetch('https://dog.ceo/api/breeds/list');
        if (!res.ok) throw new Error(`Error recuperando lista de razas.`);
        const data = await res.json();
        setListaRazas(data.message);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  return { data: listaRazas, loading };
}

function useImgRaza(raza, setLoading, setError) {
  const [imgUrl, setImgUrl] = useState("");

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
    getImgRaza(raza);
  }, [raza]);

  return {imgUrl, refreshImg: getImgRaza}
}

export {
  useListaRazas,
  useImgRaza
}
