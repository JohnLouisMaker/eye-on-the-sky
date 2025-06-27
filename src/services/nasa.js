
import axios from "axios";

const NASA_API_KEY = "DEMO_KEY";
const BASE_URL = "https://api.nasa.gov/planetary/apod";

/**
@param {string} date
@returns {Promise<Object>} 
**/

export const getImagemDoDia = async (date = null) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        api_key: NASA_API_KEY,
        ...(date && { date }),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar imagem do dia:", error);
    throw error;
  }
};
