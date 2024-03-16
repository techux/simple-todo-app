const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000 ;

function findIndex(arr, id) {
  for (var i of arr) {
    if (i.id == id) return arr.indexOf(i);

  }
  return -1;

}

function deleteItemIndex(arr, id) {
  var newTodo = []
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id !== id) newTodo.push(arr[i]);
  }
  return newTodo;
}

app.use(bodyParser.json());

var todo = []

app.get('/todos', (req, res) => {
  res.status(200).send(todo);
})

app.get('/todos/:id', (req, res) => {
  var todoIndex = findIndex(todo, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    res.json(todo[todoIndex]);
  }
});
var counter = 1;
app.post('/todos', (req, res) => {

  var newTodo = {
    id: counter++,
    title: req.body.title,
    description: req.body.description
  }
  todo.push(newTodo)
  res.status(201).send(newTodo)
})

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todo = deleteItemIndex(todo, id);

  res.status(200).json(todo);
})

app.put('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todo, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send('Item not found.');
  } else {

    if (req.body.title) {
      todo[todoIndex].title = req.body.title
    }
    if (req.body.description) {
      todo[todoIndex].description = req.body.description
    }
    res.status(200).json(todo)
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})



app.use('*', (req, res) => {
  res.status(404).send('404 Not Found')
})


app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`)
})

module.exports = app;
