const resultContainer = document.getElementById("result");
const html = document.querySelector("html");
const resetBtn = document.getElementById("reset");

const getAlignment = async (s1, s2) => {
  const response = await fetch(`/align/${s1}/${s2}`);
  const data = await response.text();
  return data
};

document.querySelector("#theme-switcher").addEventListener("change", (e) => {
  const { checked } = e.target;
  html.setAttribute("data-theme", !checked ? "dark" : "light");
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const { secuenciaUno, secuenciaDos } = Object.fromEntries(
    new FormData(e.target)
  );

  getAlignment(secuenciaUno, secuenciaDos)
    .then((data) => {
      resultContainer.textContent = data;
    })
    .catch((err) => {
      console.error(err);
    });
});

resetBtn.addEventListener("click", () => {
  resultContainer.textContent = "";
});