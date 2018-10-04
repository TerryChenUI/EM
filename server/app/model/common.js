const mongoose = require('mongoose');

const common = {
  is_delete: { type: Boolean, required: true, default: 0 },
  create_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth_User' },
  create_date: { type: Date, default: Date.now },
  update_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth_User' },
  update_date: { type: Date, default: Date.now }
};

module.exports = common;