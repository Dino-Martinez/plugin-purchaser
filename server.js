// Require necessary express modules
const exphbs  = require('express-handlebars')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const override = require('method-override')
require('dotenv').config()
const port = 3000

//Set up default mongoose connection
const mongoose = require('mongoose')
const DB_URI = process.env.MONGO_URI
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;
db.on('error', err => {
  console.error(err)
})
db.once('open', () => {
  // we're connected!
  console.log('Connected to DB')
});

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(override('_method'))

// Set View Engine and Middleware
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Attach routes to server
require('./routes/index.js')(app)
require('./routes/plugin.js')(app)

// Run development server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
