const noteForm = document.querySelector('#noteForm');
const title = document.querySelector('#title')
const description = document.querySelector('#description')

noteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (saveId) {
    updateNote(saveId, title.value, description.value);
  } else {
    saveNote(title.value, description.value);
  }

  title.value = '';
  description.value = '';
  saveId = '';
});
