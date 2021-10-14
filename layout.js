const grid = document.querySelector(".grid-wrapper");
const list = document.querySelector(".list-wrapper");

list.addEventListener("click", () => {
  const main = document.querySelector(".main-content");
  main.style.paddingLeft = "27px";
  const column = document.querySelectorAll(".column");
  const card = document.querySelectorAll(".card-short");
  for (let i = 0; i < card.length; i++) {
    card[i].style.height = "600px";
  }
  main.style.flexDirection = "column";
  column[0].style.width = "100%";
  column[1].style.width = "100%";
});

grid.addEventListener("click", () => {
  const main = document.querySelector(".main-content");
  main.style.paddingLeft = "0px";
  const column = document.querySelectorAll(".column");
  const card = document.querySelectorAll(".card-short");
  for (let i = 0; i < card.length; i++) {
    card[i].style.height = "400px";
  }
  main.style.flexDirection = "row";
  column[0].style.width = "46.49%";
  column[1].style.width = "46.49%";
});
