const BaseController = require('../../core/baseController');

class UserController extends BaseController {
  async index(ctx) {
    const { name, currentPage, pageSize } = ctx.query;
    const query = {};

    if (name) {
      query.name = new RegExp(`${name}`);
    }

    const options = {
      page: parseInt(currentPage) || 1,
      limit: parseInt(pageSize) || 10,
      sort: '-create_date'
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

    const authUser = await ctx.service.auth.user.getByKey(data.account);
    if (authUser) {
      this.failure({
        msg: '用户名已存在',
        state: 422
      });
      return;
    }

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
    const result = await ctx.service.auth.user.update(data);

    this.success(result);
  }

  async destroy(ctx) {
    const result = await ctx.service.auth.user.remove(ctx.params.id);
    this.success(result);
  }
}

module.exports = UserController;
