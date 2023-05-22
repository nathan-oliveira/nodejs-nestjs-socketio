
// io('http://localhost:3000')
const socket = io();

/**
 * Save a new note
 * @param {string} title node title
 * @param {string} description node description
 */
const saveNote = (title, description) => {
  socket.emit('client:newnote', {
    title,
    description,
  })
}

const deleteNote = (id) => {
  socket.emit('client:deletenote', id);
}

const getNode = (id) => {
  socket.emit('client:getnode', id);
}

const updateNote = (id, title, description) => {
  socket.emit('client:updatenote', {
    id,
    title,
    description,
  })
}

socket.on('server:newnote', appendNote);
socket.on('server:loadnotes', renderNotes);
socket.on('server:selectednote', (note) => {
  const title = document.querySelector('#title');
  const description = document.querySelector('#description');

  title.value = note.title;
  description.value = note.description;

  saveId = note.id;
})

// socket.on('server:newnote', (note) => {
//   appendNote(note)
// });

