const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const indexRoute = require('./routes/index')
const blogRoute = require('./routes/blog')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('you just hit the home page\n')
  })

app.use('/user', indexRoute)
app.use('/api', blogRoute)


app.listen(7000, () => {
    console.log('Listening on localhost:7000')
  })