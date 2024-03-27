const resultContainer = document.getElementById("result");
const html = document.querySelector("html");
const resetBtn = document.querySelector("#reset");

document
  .querySelector("#theme-switcher")
  .addEventListener("change", (e) => {
    const { checked } = e.target;
    html.setAttribute("data-theme", !checked ? "dark" : "light");
  });

document
  .querySelector("form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const { secuenciaUno, secuenciaDos } = Object.fromEntries(new FormData(e.target));
    const response = await fetch(`/align/${secuenciaUno}/${secuenciaDos}`);
    const data = await response.text();
    resultContainer.innerHTML = data;
  });