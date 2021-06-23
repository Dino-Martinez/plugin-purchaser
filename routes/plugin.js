// MODELS
const Plugin = require('../models/plugin')

// PLUGIN ROUTES
module.exports = app => {
  // SEARCH PLUGIN
  app.get('/search', (req,res)=>{
    const query = new RegExp(req.query.query, 'i')
    Plugin.find({$or: [
        {'name': query},
        {'description': query}
      ]
    })
    .lean()
    .then(plugins => {
      res.render('plugins-search', {
        plugins
      })
    })
  })

  // PURCHASE PLUGIN
  app.post('/plugins/:id/purchase', (req,res) => {
      let stripe = require("stripe")(process.env.PRIVATE_STRIPE_API_KEY)

      let token = req.body.stripeToken

      Plugin.findById(req.params.id).lean().then(plugin => {
        const charge = stripe.charges.create({
          amount: plugin.price,
          currency: 'usd',
          description: plugin.description,
          source: token
        }).then(()=>{
          res.redirect(`/plugins/${req.params.id}`)
        })
      })
   })

  // NEW PLUGIN
  app.get('/plugins/new', (req, res) => {
    res.render('plugins-new')
  })

  // CREATE PLUGIN
  app.post('/plugins', (req, res) => {
    req.body.price = req.body.price * 100
    const plugin = new Plugin(req.body)
    plugin.save().then(doc => {
      res.send({plugin: doc})
    }).catch(err => {
      res.status(400).send(err.errors)
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
