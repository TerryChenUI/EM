'use strict';
const BaseController = require('../core/baseController');

class AccountController extends BaseController {
  async getCurrent(ctx) {
    if (!ctx.isAuthenticated()) {
      this.failure({
        data: ctx.user,
        state: 401
      });
      return;
    }

    const userInfo = await ctx.service.auth.user.show(ctx.user.id);

    this.success({
      id: userInfo._id,
      name: userInfo.name,
      account: userInfo.account,
      email: userInfo.email
    });
  }

  async getMenu(ctx) {
    if (!ctx.isAuthenticated()) {
      this.failure({
        data: ctx.user,
        state: 401
      });
      return;
    }

    const userInfo = await this.ctx.model.User.findById(ctx.user.id)
      .populate(
        {
          path: 'auth_role',
          match: { is_delete: false },
          select: '-is_delete',
          populate: {
            path: 'auth_modules',
            match: { is_delete: false, is_menu: true },
            select: '-is_delete',
            options: {
              sort: {
                display_order: 1
              }
            }
          }
        }
      );

    const modules = userInfo.auth_role.auth_modules.map(t => {
      return {
        id: t.id,
        name: t.name,
        path: t.path,
        hideInMenu: t.hide_in_menu,
        icon: t.icon,
        parent: t.parent_module
      }
    });

    const menus = ctx.helper.arrayToTree(modules, 'id', 'parent');

    this.success(menus);
  }

  async login(ctx) {
    const { userName, password } = ctx.request.body;
    const userInfo = await ctx.service.auth.user.getByQuery({
      account: userName,
      password: ctx.helper.getHashResult(password)
    });

    if (userInfo) {
      const roleInfo = await ctx.service.auth.role.show(userInfo.auth_role);

      ctx.login({
        id: userInfo._id,
        username: userName,
        password
      });
      this.success({
        _id: userInfo._id,
        account: userInfo.account,
        role: {
          name: roleInfo.name,
          key: roleInfo.key
        }
      });
    } else {
      this.failure({
        code: 4001,
        msg: '账号或密码错误',
        state: 200
      });
    }
  }

  async logout(ctx) {
    ctx.logout();
    this.success();
  }
}

module.exports = AccountController;
