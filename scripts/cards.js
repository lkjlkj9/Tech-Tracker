export function renderCards(kuda, techs) {
    kuda.innerHTML = techs.map(tech => 
        `<div class="card">
        <p>${tech.title}</p>
        </div>`).join('');
}
