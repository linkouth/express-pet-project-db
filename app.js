const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3001

app.use(bodyParser());

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

let notes = [
  { id: 1, title: 'Phone', body: 'Choose new phone model' },
  { id: 2, title: 'Gym', body: 'Buy a new equipment' },
  { id: 3, title: 'JS', body: 'Study in learn.javascript.ru' },
  { id: 4, title: 'Node.js', body: 'Create a pet project' },
  { id: 5, title: 'Hookah', body: 'Chill in a hookah at the weekend' },
];

app.get('/:id?', (req, res) => {
  const id = +req.params["id"];
  if (!id) {
    res.status(200).send(notes);
  } else {
    const note = notes.filter(el => el.id === id);
    if (note.length) {
      res.status(200).send(note[0]);
    } else {
      res.status(404).send('Resource not found');
    }
  }
})

app.post('/', function (req, res) {
  const dto = req.body;
  const newEntity = {
    id: notes.length + 1,
    title: dto.title,
    body: dto.body
  };
  notes.push(newEntity);
  res.status(200).send(newEntity);
})

app.patch('/:id', function (req, res) {
  const id = +req.params["id"];
  const dto = req.body;
  const entity = findById(id);
  if (!entity) {
    res.status(404).send('Resource not found');
  }
  for (const prop in dto) {
    if (entity.hasOwnProperty(prop)) {
      entity[prop] = dto[prop];
    }
  }
  res.status(200).send(entity);
})

app.delete('/:id', function (req, res) {
  const id = +req.params["id"];
  deleteById(id);
  res.send(`The note with id ${id} has just deleted`)
})

const findById = id => {
  for (const note of notes) {
    if (note.id === id) {
      return note;
    }
  }
  return null;
}

const deleteById = id => {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      notes.splice(i, 1);
      break;
    }
  }
}