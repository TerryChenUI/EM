'use strict';

module.exports = action => {
  return async (ctx, next) => {

    const isLogin = ctx.isAuthenticated();
    const currentUser = ctx.user;

    const noAccess = () => {
      ctx.status = 403;
      ctx.body = {
        code: '403',
        msg: ctx.helper.errorCode['403'],
        result: {
          userId: currentUser,
          uri: action
        },
      };
    };

    if (!isLogin) {
      if (ctx.acceptJSON) {
        ctx.body = {
          code: '401',
          msg: ctx.helper.errorCode['401'],
          result: {
            userId: currentUser,
            uri: action
          },
        };
        ctx.status = 401;
      } else {
        ctx.redirect('/login?redirect=' + encodeURIComponent(ctx.originalUrl));
      }
      return;
    }

    const userInfo = await ctx.model.User.findById(currentUser.id)
      .populate(
        {
          path: 'auth_role',
          match: { is_delete: false },
          select: '-is_delete',
          populate: {
            path: 'auth_modules',
            match: { is_delete: false },
            select: '-is_delete'
          }
        }
      );

    const moduleInfo = userInfo.auth_role.auth_modules.find(t => t.key === action);
    if (moduleInfo) {
      await next();
      return;
    }

    noAccess();
  };
};
