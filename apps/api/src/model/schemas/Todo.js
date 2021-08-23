const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema } = mongoose


const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is require'],
  },
  description: String,
  ready: Boolean
}, { versionKey: false, timestamps: true })

todoSchema.plugin(mongoosePaginate)

const Todo = mongoose.model('todo', todoSchema)

module.exports = Todo