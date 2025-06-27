export const traduzirTexto = async (texto) => {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(texto)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map((d) => d[0]).join('');
  } catch (error) {
    console.error('Erro ao traduzir:', error);
    return texto;
  }
};
