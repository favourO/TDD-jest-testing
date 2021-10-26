var express = require('express');
var router = express.Router();
const createError = require('http-errors')

const todos = [
  {
    id: 1,
    name: 'Do something', 
    completed: false
  }
]
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(todos).status(200)
});

router.get('/:id', function(req, res, next) {
  const foundTodo = todos.find(todo => todo.id === Number(req.params.id))

  if(!foundTodo) {
    return next(createError(404, 'Not found'))
  }
  res.json(foundTodo)
});

router.post('/', function(req, res, next) {
  const { body } = req;

  if (typeof body.name !== 'string') {
    return next(createError(422, 'Validation Error'))
  }

  const newTodo = {
    id: todos.length + 1,
    name: body.name,
    completed: false
  }

  todos.push(newTodo)

  res.status(201).json(newTodo)
});
module.exports = router;