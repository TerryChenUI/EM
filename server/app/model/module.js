const mongoosePaginate = require('mongoose-paginate');
const common = require('./common');

module.exports = app => {
  const mongoose = app.mongoose;

  const module = {
    name: { type: String, required: true }, // 模块名称
    is_menu: { type: Boolean, default: false }, // 是否菜单
    key: { type: String }, // 权限标识
    url: { type: String }, // url路径
    icon: { type: String }, // 图标
    display_order: { type: Number, required: true, default: 1 },
    description: { type: String },
    parent_module: { type: mongoose.Schema.Types.ObjectId, ref: 'AuthModule' },
    ...common
  };

  const moduleSchema = new mongoose.Schema(module);
  moduleSchema.set('toObject', { getters: true });
  moduleSchema.plugin(mongoosePaginate);
  moduleSchema.pre('findOneAndUpdate', function (next) {
    this.findOneAndUpdate({}, { update_time: Date.now() });
    next();
  });

  return mongoose.model('AuthModule', moduleSchema, 'auth_modules')
}
