'use strict';
const BaseController = require('../../core/baseController');

class CategoryController extends BaseController {
  async index(ctx) {
    const { currentPage, pageSize } = ctx.query;
    const query = {};
    const options = {
      page: parseInt(currentPage) || 1,
      limit: parseInt(pageSize) || 10,
      sort: 'display_order'
    };

    const result = await ctx.service.content.category.getAll(query, options);
    this.success(result);
  }

  async show(ctx) {
    const { id } = ctx.params;

    const result = await ctx.service.content.category.show(id);

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
        required: true,
      }
    };

    try {
      ctx.validate(paramRule);
    } catch (err) {
      this.validateError(err);
      return;
    }

    const result = await ctx.service.content.category.create(data);
    this.success(result);
  }

  async update(ctx) {
    const id = ctx.params.id;
    const data = ctx.request.body;

    const paramRule = {
      name: {
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

    const result = await ctx.service.content.category.update(id, data);
    this.success(result);
  }

  async destroy(ctx) {
    const result = await ctx.service.content.category.remove(ctx.params.id);
    this.success(result);
  }
}

module.exports = CategoryController;
