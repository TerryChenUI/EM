'use strict';
const BaseController = require('../../core/baseController');

class ArticleController extends BaseController {
  async index(ctx) {
    const { currentPage, pageSize } = ctx.query;

    const query = ctx.helper.getFilterQuery(ctx.query, ['title', 'category']);

    if (query.title) {
      query.title = { $regex: new RegExp(query.title, 'i') };
    }

    const options = {
      page: parseInt(currentPage) || 1,
      limit: parseInt(pageSize) || 10,
      sort: '-create_date',
      select: '-is_delete',
      populate: {
        path: 'category',
        match: { is_delete: false },
        select: '_id name'
      }
    };

    const result = await ctx.service.content.article.getAll(query, options);
    this.success(result);
  }

  async show(ctx) {
    const { id } = ctx.params;

    const result = await ctx.service.content.article.show(id);

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
      title: {
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

    const result = await ctx.service.content.article.create(data);
    this.success(result);
  }

  async update(ctx) {
    const id = ctx.params.id;
    const data = ctx.request.body;

    const paramRule = {
      title: {
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

    const result = await ctx.service.content.article.update(id, data);
    this.success(result);
  }

  async destroy(ctx) {
    const result = await ctx.service.content.article.remove(ctx.params.id);
    this.success(result);
  }
}

module.exports = ArticleController;
