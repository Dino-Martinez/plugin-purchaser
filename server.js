// Require necessary express modules
const exphbs = require('express-handlebars')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const override = require('method-override')
require('dotenv').config()
const helmet = require('helmet')
const compression = require('compression')

// Set up default mongoose connection
const mongoose = require('mongoose')
const DB_URI = process.env.MONGO_URI
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', err => {
  console.error(err)
})
db.once('open', () => {
  // we're connected!
  console.log('Connected to DB')
})

// connect stripe api
app.locals.PUBLIC_STRIPE_API_KEY = process.env.PUBLIC_STRIPE_API_KEY

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(override('_method'))

// Set View Engine and Middleware
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.use(helmet.contentSecurityPolicy({
   useDefaults: true,
   directives: {
     "script-src": ["'self'", "cdnjs.cloudflare.com", "code.jquery.com", "fontawesome.com", "*.fontawesome.com"],
     "style-src": ["'self'", "fontawesome.com", "*.fontawesome.com", "'unsafe-inline'"],
     "connect-src" : ["'self'", "fontawesome.com", "*.fontawesome.com"],
     "img-src": ["'self'", "images.unsplash.com"]
   },
 }))
 app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

// Error handling Middleware
app.use((err, req, res, next) => {
  if (process.env.BUILD === 'dev') {
    console.error(err)
  }
  res.redirect('/')
})

// Attach routes to server
require('./routes/index.js')(app)
require('./routes/plugin.js')(app)

// Run development server
app.listen(process.env.PORT || 3000)
