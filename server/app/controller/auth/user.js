'use strict';
const BaseController = require('../../core/baseController');

class UserController extends BaseController {
  async index(ctx) {
    const { currentPage, pageSize } = ctx.query;

    const query = ctx.helper.getFilterQuery(ctx.query, ['key', 'auth_role']);

    if (query.key) {
      query.$or = [
        { account: { $regex: new RegExp(query.key, 'i') } },
        { name: { $regex: new RegExp(query.key, 'i') } },
        { email: { $regex: new RegExp(query.key, 'i') } }
      ];
      delete query.key;
    }

    const options = {
      page: parseInt(currentPage) || 1,
      limit: parseInt(pageSize) || 10,
      sort: '-create_date',
      select: '-is_delete'
    };

    const result = await ctx.service.auth.user.getAll(query, options);
    this.success(result);
  }

  async show(ctx) {
    const { id } = ctx.params;

    const result = await ctx.service.auth.user.show(id);

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
      account: {
        type: 'string',
        required: true
      },
      password: {
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

    const authUser = await ctx.service.auth.user.getByQuery({
      account: data.account,
      is_delete: 0
    });
    if (authUser) {
      this.failure({
        msg: '用户名已存在',
        state: 422
      });
      return;
    }

    data.password = ctx.helper.getHashResult(data.password);

    const result = await ctx.service.auth.user.create(data);
    this.success(result);
  }

  async update(ctx) {
    const data = ctx.request.body;

    const result = await ctx.service.auth.user.update(data);
    this.success(result);
  }

  async resetPassword(ctx) {
    const data = ctx.request.body;
    data.password = ctx.helper.getHashResult(data.password);

    const result = await ctx.service.auth.user.update(data);
    this.success(result);
  }

  async destroy(ctx) {
    const result = await ctx.service.auth.user.remove(ctx.params.id);
    this.success(result);
  }
}

module.exports = UserController;
