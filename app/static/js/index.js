import { getGeminiResponse } from "./gemini.js";
import {
  CSSIcon,
  FastapiIcon,
  HTMLIcon,
  JSIcon,
  NumpyIcon,
  PythonIcon,
} from "./icons.js";
import { getAlignment, getEnvVariables } from "./routes.js";

const $ = document;

const html = $.querySelector("html");
const alignSequenceForm = $.getElementById("align-sequence-form");
const resultContainer = $.getElementById("result");
const resetBtn = $.getElementById("reset");

const seleccionSecuencias = $.getElementById("seleccion-secuencia");
let seleccionSecuenciasValue = "";
const btnGenerarSecuencias = $.getElementById("btn-g-secuencia");

$.addEventListener("DOMContentLoaded", async () => {
  const response = await getEnvVariables();
  window.sessionStorage.setItem("GEMINI_APIKEY", response.value);
});

$.querySelector("#theme-switcher").addEventListener("change", (e) => {
  const { checked } = e.target;
  html.setAttribute("data-theme", !checked ? "dark" : "light");
});

alignSequenceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const { secuenciaUno, secuenciaDos } = Object.fromEntries(
    new FormData(e.target)
  );

  getAlignment(secuenciaUno, secuenciaDos)
    .then((data) => (resultContainer.textContent = data))
    .catch((err) => {
      resultContainer.textContent = "Ocurrió un error, intenta de nuevo.";
      console.warn(err);
    });
});

resetBtn.addEventListener("click", () => {
  resultContainer.textContent = "";
});

seleccionSecuencias.addEventListener(
  "change",
  (ev) => (seleccionSecuenciasValue = ev.target.value)
);

btnGenerarSecuencias.addEventListener("click", () => {
  const icon = btnGenerarSecuencias.childNodes[1];
  btnGenerarSecuencias.removeChild(icon);
  btnGenerarSecuencias.setAttribute("aria-busy", "true");

  getGeminiResponse(seleccionSecuenciasValue)
    .then((value) => {
      const secuences = [value].map(n => n.trim())
      const result = secuences[0].split('\n')
      
      $.getElementById("secuencia-uno").value = result[0]
      $.getElementById("secuencia-dos").value = result[1]
    })
    .catch((err) => {
      console.warn(err)
    })
    .finally(() => {
      btnGenerarSecuencias.removeAttribute("aria-busy");
      btnGenerarSecuencias.appendChild(icon)
    })
});

customElements.define("fastapi-icon", FastapiIcon);
customElements.define("numpy-icon", NumpyIcon);
customElements.define("python-icon", PythonIcon);
customElements.define("html-icon", HTMLIcon);
customElements.define("css-icon", CSSIcon);
customElements.define("javascript-icon", JSIcon);