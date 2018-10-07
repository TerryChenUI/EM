'use strict';
const BaseController = require('../../core/baseController');

class RoleController extends BaseController {
  async index(ctx) {
    const query = ctx.helper.getFilterQuery(ctx.query);

    const options = {
      page: 1,
      limit: 100,
      sort: 'display_order',
      select: '-is_delete'
    };

    const result = await ctx.service.auth.role.getAll(query, options);
    this.success(result);
  }

  async show(ctx) {
    const { id } = ctx.params;

    const result = await ctx.service.auth.role.show(id);

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

    const authRole = await ctx.service.auth.role.getByQuery({
      key: data.key,
      is_delete: 0
    });
    if (authRole) {
      this.failure({
        msg: '角色标识已存在',
        state: 422
      });
      return;
    }

    const result = await ctx.service.auth.role.create(data);
    this.success(result);
  }

  async update(ctx) {
    const data = ctx.request.body;

    const result = await ctx.service.auth.role.update(data);
    this.success(result);
  }

  async destroy(ctx) {
    const result = await ctx.service.auth.role.remove(ctx.params.id);
    this.success(result);
  }
}

module.exports = RoleController;
