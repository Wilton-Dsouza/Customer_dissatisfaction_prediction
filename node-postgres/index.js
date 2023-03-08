const express = require('express')
const app = express()
const port = 3005

const user_model = require('./user_model')
app.use(express.json())
var cors = require('cors')
app.use(cors())
// app.use(bodyParser.urlencoded());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  user_model.getUsers()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

  app.post('/login',(req,res) => {
  user_model.selectUsers(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  });

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

