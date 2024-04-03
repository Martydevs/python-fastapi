import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const value = window.sessionStorage.getItem("GEMINI_APIKEY")
const ai = new GoogleGenerativeAI(value);
const model = ai.getGenerativeModel({ model: "gemini-pro" });

export const getGeminiResponse = async (option) => {
  const result = await model.generateContent(
    `De manera precisa, sin explicación, sin anotaciones y sin carácteres especiales, 
    genérame dos ejemplos de secuencias de ${option}`
  );
  const response = await result.response;
  return response.text();
}