// Require necessary express modules
const exphbs  = require('express-handlebars')
const express = require('express')
const app = express()
require('dotenv').config()
const port = 3000

//Set up default mongoose connection
const mongoose = require('mongoose')
const DB_URI = process.env.MONGO_URI
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  // we're connected!
  console.log('Connected to DB')
});

// Set View Engine and Middleware
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Attach routes to server
require('./routes/index.js')(app)

// Run development server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
