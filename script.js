const form = document.querySelector('#note-form');
const input = document.querySelector('#note-input');
const category = document.querySelector('#note-category');
const list = document.querySelector('#notes-list');
const count = document.querySelector('#note-count');
const error = document.querySelector('#error-message');
const searchInput = document.querySelector('#search-input');

let notes = [];

function render(filtered = notes) {
  list.innerHTML = '';
  filtered.forEach(note => {
    const li = document.createElement('li');
    li.className = `note-card category-${note.category}`;
    const text = document.createElement('p');
    text.textContent = note.text;
    const meta = document.createElement('small');
    meta.textContent = `${note.category} | ${note.createdAt}`;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
      notes = notes.filter(n => n.id !== note.id);
      render();
    });
    li.append(text, meta, delBtn);
    list.appendChild(li);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  const note = {
    id: Date.now(),
    text,
    category: category.value,
    createdAt: new Date().toLocaleString()
  };
  notes.push(note);
  input.value = '';
  render();
});
