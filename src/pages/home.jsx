import { useEffect, useState } from "react";
import { getImagemDoDia } from "../services/nasa";
import { formatarData } from "../services/dataFormat";
import { traduzirTexto } from "../services/traduzir";

export default function Home() {
  const [imagem, setImagem] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarImagem = async () => {
      try {
        const data = await getImagemDoDia();
        const dataFormatada = formatarData(data.date);
        const explicacaoTraduzida = await traduzirTexto(data.explanation);

        setImagem({
          ...data,
          explanation: explicacaoTraduzida,
          date: dataFormatada,
        });

        setErro(null);
      } catch (err) {
        console.error("Erro:", err);
        setErro("Erro ao buscar ou traduzir a imagem da NASA.");
      } finally {
        setCarregando(false);
      }
    };

    carregarImagem();
  }, []);

  if (carregando) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white text-xl font-aquawax">
        Carregando imagem do espaço...
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-black via-purple-900 to-black text-red-200 text-xl font-aquawax">
        {erro}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-yapari mb-8 drop-shadow-lg ">
        Eye on the Sky
      </h1>

      <div className="bg-white/5 rounded-3xl shadow-xl max-w-3xl w-full p-8 backdrop-blur-md border border-purple-700">
        <h2 className="font-gantari text-3xl font-bold mb-4 text-indigo-300">
          {imagem.title}
        </h2>

        {imagem.media_type === "image" ? (
          <img
            src={imagem.url}
            alt={imagem.title}
            className="rounded-2xl shadow-lg w-full object-cover mb-6 border border-indigo-500"
          />
        ) : (
          <iframe
            title="Vídeo Do Dia"
            src={imagem.url}
            className="w-full h-[480px] rounded-2xl shadow-lg mb-6 border border-indigo-500"
            allowFullScreen
          />
        )}

        <p className="font-gantari-regular lg:text-lg text-justify text-gray-300 leading-relaxed mb-4">
          {imagem.explanation}
        </p>

        <p className="font-gantari-regular lg:text-lg text-center sm:text-right text-indigo-400 font-semibold ">
          Data: <span className="font-normal">{imagem.date}</span>
        </p>
      </div>

      <footer className="mt-16 text-indigo-400 font-mono italic select-none text-sm">
        Dados fornecidos pela API da NASA (APOD) - Astronomy Picture of the Day
      </footer>
    </div>
  );
}
