const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
  // eslint-disable-line consistent-return
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();

});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let todoList = [
  {title: 'First'},
]

app.get('/', (req, res)=>{
  res.status(200).json(todoList);
});

app.post('/', (req, res)=>{
  todoList.push(req.body);

  setTimeout(()=>{
    res.status(200).json({message: 'success'});
  },200)
});

app.delete('/', (req, res)=>{
  const title = req.body.title;

  todoList = todoList.filter(el => el.title !== title);

  setTimeout(()=>{
    res.status(200).json({message: 'deleted'});
  },200)
});

app.listen(5000, ()=> console.log('LISTEN 5000'));
