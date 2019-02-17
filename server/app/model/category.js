'use strict';
const mongoosePaginate = require('mongoose-paginate');
const common = require('./common');

module.exports = app => {
  const mongoose = app.mongoose;

  const category = {
    name: { type: String, required: true },
    slug: { type: String },
    description: { type: String },
    display_order: { type: Number, required: true, default: 1 },
    parent_category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    ...common
  }

  const categorySchema = new mongoose.Schema(category);
  categorySchema.set('toObject', { getters: true });
  categorySchema.plugin(mongoosePaginate);
  categorySchema.pre('findOneAndUpdate', function (next) {
    this.findOneAndUpdate({}, { update_time: Date.now() });
    next();
  });

  return mongoose.model('Category', categorySchema);
}
