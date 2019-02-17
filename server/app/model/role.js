'use strict';
const mongoosePaginate = require('mongoose-paginate');
const common = require('./common');

module.exports = app => {
  const mongoose = app.mongoose;

  const role = {
    name: { type: String, required: true },
    key: { type: String, required: true },
    description: { type: String },
    display_order: { type: Number },
    auth_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AuthUser' }],
    auth_modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AuthModule' }],
    ...common
  };

  const roleSchema = new mongoose.Schema(role);
  roleSchema.set('toObject', { getters: true });
  roleSchema.plugin(mongoosePaginate);
  roleSchema.pre('findOneAndUpdate', function (next) {
    this.findOneAndUpdate({}, { update_time: Date.now() });
    next();
  });

  return mongoose.model('AuthRole', roleSchema, 'auth_roles');
}