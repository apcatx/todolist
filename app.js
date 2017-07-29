const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const completed = [];

var app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

let toComplete = [];

app.get('/', function(request, response) {
  response.render('form', { todos: toComplete });
});

app.post('/', function(request, response){
  let id = parseInt(Math.random() * 1000);
  newAddTodo = { text: request.body.addTodo, id: id }
  toComplete.push(newAddTodo);
  response.redirect('/');
});

app.post('/mark-complete/:id', function(request, response) {
  let idTodoMarkComplete = parseInt(request.params.id);
  let completedTodo = toComplete.find(function (todo){
    return todo.id === idTodoMarkComplete;
  });
  completedTodo.complete = true;
  response.redirect('/');
});

app.listen(3000, function() {
  console.log('server started');
});
