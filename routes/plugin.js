// MODELS
const Plugin = require('../models/plugin')

// PLUGIN ROUTES
module.exports = app => {
  // NEW PLUGIN
  app.get('/plugins/new', (req, res) => {
    res.render('plugins-new')
  })

  // CREATE PLUGIN
  app.post('/plugins', (req, res) => {
    const plugin = new Plugin(req.body)
    plugin.save().then(doc => {
      res.redirect('/')
    })
  })

  // SHOW PLUGIN
  app.get('/plugins/:id', (req, res) => {
    Plugin.findById(req.params.id).lean().then((plugin) => {
      res.render('plugins-show', { plugin: plugin })
    })
  })

  // EDIT PLUGIN
  app.get('/plugins/:id/edit', (req, res) => {
    Plugin.findById(req.params.id).lean().then((plugin) => {
      res.render('plugins-edit', { plugin: plugin })
    })
  })

  // UPDATE PLUGIN
  app.put('/plugins/:id', (req, res) => {
    Plugin.findByIdAndUpdate(req.params.id, req.body)
      .then(plugin => {
        res.redirect(`/plugins/${plugin._id}`)
      })
  })

  // DELETE PLUGIN
  app.delete('/plugins/:id', (req, res) => {
    Plugin.findByIdAndDelete(req.params.id).then((plugin) => {
      return res.redirect('/')
    })
  })
}
