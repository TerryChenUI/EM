const mongoosePaginate = require('mongoose-paginate');
const common = require('./common');

module.exports = app => {
  const mongoose = app.mongoose;

  const user = {
    account: { type: String, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    email: { type: String },
    mobile: { type: String },
    status: { type: Number },
    remark: { type: String },
    auth_role: { type: mongoose.Schema.Types.ObjectId, ref: 'AuthRole' },
    ...common
  };

  const userSchema = new mongoose.Schema(user);
  userSchema.set('toObject', { getters: true });
  userSchema.plugin(mongoosePaginate);
  userSchema.pre('findOneAndUpdate', function (next) {
    this.findOneAndUpdate({}, { update_time: Date.now() });
    next();
  });

  return mongoose.model('AuthUser', userSchema, 'auth_users');
}
