'use strict';
const BaseController = require('../../core/baseController');

class ModuleController extends BaseController {
  async index(ctx) {
    const { currentPage, pageSize } = ctx.query;

    const query = ctx.helper.getFilterQuery(ctx.query, ['name', 'parent_module']);

    if (query.name) {
      query.name = new RegExp(query.name);
    }

    const options = {
      page: parseInt(currentPage) || 1,
      limit: parseInt(pageSize) || 10,
      sort: 'display_order',
      select: '-is_delete'
    };

    const result = await ctx.service.auth.module.getAll(query, options);
    this.success(result);
  }

  async getSystem(ctx) {
    const result = await ctx.service.auth.module.getSystem({});
    this.success(result);
  }

  async show(ctx) {
    const { id } = ctx.params;

    const result = await ctx.service.auth.module.show(id);

    if (result) {
      this.success(result);
    } else {
      this.failure({
        state: 404
      });
    }
  }

  async create(ctx) {
    const data = ctx.request.body;

    const paramRule = {
      name: {
        type: 'string',
        required: true
      },
      key: {
        type: 'string',
        required: true
      }
    };

    try {
      ctx.validate(paramRule);
    } catch (err) {
      this.validateError(err);
      return;
    }

    const authModule = await ctx.service.auth.module.getByQuery({
      key: data.key,
      is_delete: 0
    });
    if (authModule) {
      this.failure({
        msg: '权限标识已存在',
        state: 422
      });
      return;
    }

    const result = await ctx.service.auth.module.create(data);
    this.success(result);
  }

  async update(ctx) {
    const data = ctx.request.body;

    const paramRule = {
      name: {
        type: 'string',
        required: true
      },
      key: {
        type: 'string',
        required: true
      }
    };

    try {
      ctx.validate(paramRule);
    } catch (err) {
      this.validateError(err);
      return;
    }

    const result = await ctx.service.auth.module.update(data);
    this.success(result);
  }

  async destroy(ctx) {
    const result = await ctx.service.auth.module.remove(ctx.params.id);
    this.success(result);
  }
}

module.exports = ModuleController;
