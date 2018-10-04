const common = require('./common');

module.exports = app => {
  const mongoose = app.mongoose;

  const siteSetting = {
    title: { type: String, required: true },
    sub_title: { type: String, required: true },
    keywords: { type: String },
    description: String,
    site_url: { type: String },
    site_contact: { type: String },
    site_phone: { type: String },
    site_email: { type: String },
    site_icp: { type: String },
    ...common
  };

  const siteSettingSchema = new mongoose.Schema(siteSetting);
  siteSettingSchema.set('toObject', { getters: true });

  return mongoose.model('SettingSite', siteSettingSchema);
}
