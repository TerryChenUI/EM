'use strict';
const Service = require('egg').Service;

class ModuleService extends Service {
  async getAll(query, options) {
    const result = await this.ctx.model.Module.paginate(query, options);
    return {
      data: result.docs,
      pagination: {
        currentPage: result.page,
        pageSize: result.limit,
        total: result.total
      }
    }
  }

  async getSystem(options) {
    const isAll = !options.filterHide;
    const id = options.parentModule;

    const result = await this.ctx.model.Module.find().select('-is_delete');
    const modules = result.map(model => model.toObject());
    return this.ctx.helper.arrayToTree(modules, 'id', 'parent_module');
  }

  async show(id) {
    const result = await this.ctx.model.Module.findOne({ _id: id }).select('-is_delete');
    return result;
  }

  async getByQuery(query) {
    const result = await this.ctx.model.Module.findOne(query).select('-is_delete');
    return result;
  }

  async create(data) {
    const result = await this.ctx.model.Module.create(data);
    return result;
  }

  async update(data) {
    const result = await this.ctx.model.Module.findByIdAndUpdate(data.id, data, { new: true }).select('-is_delete');
    return result;
  }

  async remove(id) {
    const result = await this.ctx.model.Module.deleteOne({ _id: id });

    this.ctx.model.Role.updateMany({},
      {
        $pull: { auth_modules: id }
      }
    );

    return result;
  }
}

module.exports = ModuleService;