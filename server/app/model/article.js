const mongoosePaginate = require('mongoose-paginate');
const common = require('./common');

module.exports = app => {
  const mongoose = app.mongoose;

  const article = {
    title: { type: String, required: true },
    keyword: { type: String },
    author: { type: String },
    source: { type: String },
    description: { type: String },
    thumb_pictures: [{ type: String }],
    content: { type: String, required: true },
    status: { type: Number, required: true, default: 1 }, // 1.草稿，2.已发布，3.回收站
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    ...common
  };

  const articleSchema = new mongoose.Schema(article);
  articleSchema.set('toObject', { getters: true });
  articleSchema.plugin(mongoosePaginate);
  articleSchema.pre('findOneAndUpdate', function (next) {
    this.findOneAndUpdate({}, { update_time: Date.now() });
    next();
  });

  return mongoose.model('ContentArticle', articleSchema);
}
