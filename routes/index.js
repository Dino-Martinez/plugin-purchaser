const Plugin = require('../models/plugin')
module.exports = app => {
  app.get('/', (req, res) => {
    Plugin.find().lean().then(plugins => {
      res.render('home', {
        plugins
      })
    })
  })
}
