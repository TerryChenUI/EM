'use strict';
const Service = require('egg').Service;

class RoleService extends Service {
  async getAll(query, options) {
    const result = await this.ctx.model.Role.paginate(query, options);
    return result.docs;
  }

  async show(id) {
    const result = await this.ctx.model.Role.findById(id).select('-is_delete');
    return result;
  }

  async getByQuery(query) {
    const result = await this.ctx.model.Role.findOne(query).select('-is_delete');
    return result;
  }

  async create(data) {
    const result = await this.ctx.model.Role.create(data);
    return result;
  }

  async update(data) {
    const result = await this.ctx.model.Role.findByIdAndUpdate(data.id, data, { new: true }).select('-is_delete');
    return result;
  }

  async remove(id) {
    const result = await this.ctx.model.Role.deleteOne({ _id: id });

    this.ctx.model.User.updateMany({},
      {
        $pull: { auth_role: id }
      }
    );

    return result;
  }
}

module.exports = RoleService;