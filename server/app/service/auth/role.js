const Service = require('egg').Service;

class RoleService extends Service {
  async getAll(query, options) {
    const result = await this.ctx.model.Role.paginate(query, options);
    return result.docs;
  }

  async show(id) {
    const result = await this.ctx.model.Role.findById(id);
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

    const result = await this.ctx.model.Role.findOne(query);
    return result;
  }

  async create(data) {
    const result = await this.ctx.model.Role.create(data);
    return result;
  }

  async update(data) {
    const result = await this.ctx.model.Role.findByIdAndUpdate(data.id, data, { new: true });
    return result;
  }

  async remove(id) {
    const result = await this.ctx.model.Role.remove({ _id: id });
    // this.ctx.model.AuthRole.update({},
    //   {
    //     $pull: { users: id },
    //   }
    // );
    return result;
  }
}

module.exports = RoleService;