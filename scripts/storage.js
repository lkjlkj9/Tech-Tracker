const KEY = "MY_TECHS";

export function getState(initialData = []) {
  const saved = localStorage.getItem(KEY);

  if (saved) {
    return JSON.parse(saved);
  }

  localStorage.setItem(KEY, JSON.stringify(initialData));
  return initialData;
}

export function saveState(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}


/* 
function saveState() {
  localStorage.setItem(LS_KEY, JSON.stringify(techs))
}

function getState() {
 const raw = localStorage.getItem(LS_KEY)
  return raw ? JSON.parse(raw) : []
} */
