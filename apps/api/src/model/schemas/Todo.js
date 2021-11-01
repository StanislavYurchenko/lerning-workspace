const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema, SchemaTypes } = mongoose;


const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is require'],
  },
  description: String,
  ready: Boolean,
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  }
}, { versionKey: false, timestamps: true });

todoSchema.plugin(mongoosePaginate);

const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;
