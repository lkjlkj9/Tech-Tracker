import { renderCards } from "./cards.js";
import { techs as initialTechs } from "./data.js";
import { getState, saveState } from "./storage.js";

let techs = getState(initialTechs);
let progressLine = document.querySelector(".progress-value");
let techGrid = document.querySelector(".tech-grid");
const modal = document.getElementById("modal");
const modalWindow = document.querySelector(".modal-window");
const container = document.querySelector(".container");
const createBtn = document.querySelector(".create-tech-btn");
const APP_TITLE = document.title;
const form = document.querySelector(".new-tech");

function init() {
  if (techs.length === 0) {
    techGrid.innerHTML = ` <p class="empty">Технологий пока нет. Добавьте первую.</p>`;
  } else {
    renderCards(techGrid, techs);
  }
  renderProgress(techs);
}

function renderProgress(techs) {
  if (!techs.length) {
    progressLine.style.width = "0";
    progressLine.textContent = "0%";
  }
  let arrDone = techs.filter((tech) => tech.done);
  let progress = Math.round((arrDone.length / techs.length) * 100);

  progressLine.style.width = `${progress}%`;
  progressLine.textContent = `${progress}%`;
}

form.addEventListener("submit", createTech);

container.addEventListener("click", (event) => {
  const card = event.target.closest(".card");

  if (event.target.dataset.action === "delete") {
    const id = Number(card.dataset.id);
    techs = techs.filter((tech) => tech.id !== id);
    saveState(techs);
    init();
    return;
  }

  if (card) {
    return openCard(event);
  }
  
  if (!event.target.closest(".modal-window")) {
    return closeModal();
  }
  
});

modal.addEventListener("change", toggleTech);

function openCard(event) {
  const card = event.target.closest(".card");
  let id = card.dataset.id;
  let tech = techs.find((tech) => tech.id == id);
  if (!tech) return;

  openModal(toModal(tech), tech.title);
}

function openModal(html, title2 = APP_TITLE) {
  modalWindow.innerHTML = html;
  document.title = `${title2} | ${APP_TITLE}`;
  modalWindow.classList.add("active");
  modal.classList.add("active");
}


function closeModal() {
  modal.classList.remove("active");
  modalWindow.classList.remove("active");

  document.title = APP_TITLE;
}

function toModal(tech) {
  return `<h3 class="modal-title">${tech.title}</h3>
          <p class="description">${tech.description}</p>
          <div class="chek">
          <hr class="modal-line">
            <input type="checkbox" name="chekBtn" id="done" ${tech.done ? "checked" : ""}  data-type='${tech.type}'/>
            <label for="done">Выучил</label>
          </div>`;
}

function toggleTech(event) {
  const type = event.target.dataset.type;
  const tech = techs.find((tech) => tech.type === type);
  tech.done = event.target.checked;
  saveState(techs);
  init();
}

//Добавление новых технологий

function createTech(e) {
  e.preventDefault();

  const { title, description } = e.target;

  if (isInvalid(title, description)) {
    if (!title.value) title.classList.add("invalid");
    if (!description.value) description.classList.add("invalid");

    setTimeout(() => {
      title.classList.remove("invalid");
      description.classList.remove("invalid");
    }, 2000);

    console.log("invalid form");

    return;
  }

  const newTech = {
    id: Date.now(),
    title: title.value.trim(),
    description: description.value.trim(),
    done: false,
    type: title.value.toLowerCase(),
  };

  techs.push(newTech);

  title.value = "";
  description.value = "";

  saveState(techs);
  init();
}

/* function init() {
  renderCards(techGrid, techs);
  renderProgress(techs);
} */

//Валидация

function isInvalid(title, description) {
  return !title.value.trim() || !description.value.trim();
}

init();
