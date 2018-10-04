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

    const result = await this.ctx.model.Module.find();
    const modules = result.map(model => model.toObject());
    return this.ctx.helper.arrayToTree(modules, 'id', 'parent_module');

    // let originalObj = null;

    // if (isAll) {
    //   // originalObj = await this.ctx.model.AuthModule.find({}, {
    //   //   name: 1,
    //   //   display_order: 1,
    //   //   parent_module: 1,
    //   // });
    //   originalObj = await this.ctx.model.Module.find().populate({
    //     path: 'auth_user',
    //     match: { is_delete: false }
    //   });;
    // } else {
    //   originalObj = await this.ctx.model.Module.find();
    // }

    // const subset = function(parentId) { // 根据父级id遍历子集
    //   const arr = [];

    //   // 查询该id下的所有子集
    //   originalObj.forEach(function(obj) {
    //     if ((obj.parent_module ? obj.parent_module.toString() : obj.parent_module) === parentId) {
    //       arr.push(Object.assign(obj.toJSON(), {
    //         id: obj.id,
    //         children: subset(obj.id.toString()),
    //       }));
    //     }
    //   });

    //   // 如果没有子集 直接退出
    //   if (arr.length === 0) {
    //     return [];
    //   }

    //   // 对子集进行排序
    //   arr.sort(function(val1, val2) {
    //     if (val1.display_order < val2.display_order) {
    //       return -1;
    //     } else if (val1.display_order > val2.display_order) {
    //       return 1;
    //     }
    //     return 0;
    //   });

    //   return arr;
    // };

    // return subset(id || '');
  }

  async show(id) {
    const result = await this.ctx.model.Module.findOne({ _id: id }, 'name');
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

    const result = await this.ctx.model.Module.findOne(query)
    return result;
  }

  async create(data) {
    const result = await this.ctx.model.Module.create(data)
    return result;
  }

  async update(data) {
    const result = await this.ctx.model.Module.findByIdAndUpdate(data.id, data, { new: true })
    return result;
  }

  async remove(id) {
    const result = await this.ctx.model.Module.remove({ _id: id });

    await this.ctx.model.Role.update({},
      {
        $pull: { auth_modules: id }
      }
    );

    return result;
  }
}

module.exports = ModuleService;