import {renderCards} from './cards.js';
import {techs} from './data.js';

let techGrid = document.querySelector('.tech-grid')

renderCards(techGrid, techs)


const modal = document.getElementById("modal");

const container = document.querySelector(".container");

let createBtn = document.querySelector('.create-tech-btn');

let form = document.querySelector('.new-tech');
form.addEventListener('click', (e) => {
    e.preventDefault();
})

container.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.closest(".card")) {
    return modal.classList.add("active");
  }

  if (!e.target.closest(".modal-window ")) {
    return modal.classList.remove("active");
  }
});

console.log("Кчау!");

