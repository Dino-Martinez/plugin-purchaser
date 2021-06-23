const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const PluginSchema = new Schema(
  {
    name: { type: String, required: true },
    picUrl: { type: String },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Plugin', PluginSchema)
