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

export {
  useListaRazas
}
