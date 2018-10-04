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
    const result = await this.ctx.model.User.findById(id);
    return result;
  }

  async getByKey(key, id) {
    const query = {
      key
    };

    if (id) {
      query.id = {
        $ne: id
      }
    }

    const result = await this.ctx.model.User.findOne(query);
    return result;
  }

  async create(data) {
    const result = await this.ctx.model.User.create(data);
    return result;
  }

  async update(data) {
    const result = await this.ctx.model.User.findByIdAndUpdate(data.id, data, { new: true });
    return result;
  }

  async remove(id) {
    const result = await this.ctx.model.User.remove({ _id: id });
    // this.ctx.model.AuthRole.update({},
    //   {
    //     $pull: { users: id },
    //   }
    // );
    return result;
  }
}

module.exports = UserService;