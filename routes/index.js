const Plugin = require('../models/plugin')
module.exports = app => {
  app.get('/', (req, res) => {
    Plugin.find().then(plugins => {
      res.render('home', {
        greeting: 'Hello, World!',
        plugins
      })
    })
  })
}
