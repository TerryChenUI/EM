'use strict';
const Service = require('egg').Service;

class CategoryService extends Service {
  async getAll(query, options) {
    const result = await this.ctx.model.Category.paginate(query, options);
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
    const result = await this.ctx.model.Category.findOne({ _id: id });
    return result;
  }

  async create(data) {
    const result = await this.ctx.model.Category.create(data);
    return result;
  }

  async update(id, data) {
    const result = await this.ctx.model.Category.findByIdAndUpdate(id, data, { new: true });
    return result;
  }

  async remove(id) {
    const result = await this.ctx.model.Category.remove({ _id: id });
    return result;
  }
}

module.exports = CategoryService;