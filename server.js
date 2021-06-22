const exphbs  = require('express-handlebars')
const express = require('express')
const app = express()
const port = 3000
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home', {
    greeting: 'Hello, World!'
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
