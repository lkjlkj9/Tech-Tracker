export function renderCards(kuda, techs) {
  kuda.innerHTML = '' 
  
  
  techs.forEach((tech) => {
    const card = document.createElement("div");
    card.classList.add("card");

    tech.done ? card.classList.add("done") : "";

    card.dataset.id = tech.id;
    const title = document.createElement("p");
    title.id = "cardTitle";
    title.textContent = tech.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-Btn");
    deleteBtn.dataset.action = "delete";
    deleteBtn.innerHTML = "❌";

    card.append(title, deleteBtn)
    kuda.append(card)
  });
}

/* export function renderCards(kuda, techs) {
    kuda.innerHTML = techs.map(tech => 
        `<div class="card ${tech.done ? 'done' : ''}" data-id = "${tech.id}">
        <p id = 'cardTitle'>${tech.title}</p>
        <button class="delete-Btn" data-action="delete">❌</button>
        </div>`).join('');
}
 */
