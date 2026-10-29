const form = document.querySelector('#note-form');
const input = document.querySelector('#note-input');
const category = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const list = document.querySelector('#notes-list');
const count = document.querySelector('#note-count');
const error = document.querySelector('#error-message');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function render(filtered = notes) {
  list.innerHTML = '';
  filtered.forEach(note => {
    const li = document.createElement('li');
    li.className = `note-card ${note.category}`;
    li.textContent = `${note.text} (${note.category})`;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
      notes = notes.filter(n => n.id !== note.id);
      save();
      render();
    });
    li.appendChild(delBtn);
    list.appendChild(li);
  });
  const total = filtered.length;
  count.textContent = total === 0 ? 'No notes' :
                      total === 1 ? '1 note' :
                      `${total} notes`;
}

function save() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) {
    error.textContent = 'Note cannot be empty';
    return;
  }
  if (text.length > 200) {
    error.textContent = 'Note too long';
    return;
  }
  error.textContent = '';
  notes.push({
    id: Date.now(),
    text,
    category: category.value,
    createdAt: new Date().toISOString()
  });
  input.value = '';
  save();
  render();
});

searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  const filtered = notes.filter(n => n.text.toLowerCase().includes(q));
  render(filtered);
});

// Initial render
render();
