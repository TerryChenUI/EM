'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  async getAll(query, options) {
    const result = await this.ctx.model.User.paginate(query, options);
    return {
      data: result.docs,
      pagination: {
        currentPage: result.page,
        pageSize: result.limit,
        total: result.total
      }
    }
  }

  async show(id) {
    const result = await this.ctx.model.User.findById(id).select('-is_delete');
    return result;
  }

  async getByQuery(query) {
    const result = await this.ctx.model.User.findOne(query).select('-is_delete');
    return result;
  }

  async create(data) {
    const result = await this.ctx.model.User.create(data);
    return result;
  }

  async update(data) {
    const result = await this.ctx.model.User.findByIdAndUpdate(data.id, data, { new: true }).select('-is_delete');
    return result;
  }

  async remove(id) {
    const result = await this.ctx.model.User.deleteOne({ _id: id });

    this.ctx.model.Role.updateMany({},
      {
        $pull: { auth_users: id }
      }
    );
    return result;
  }
}

module.exports = UserService;
