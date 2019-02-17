'use strict';

module.exports = app => {
  const { router, controller, config } = app;

  const isAuthorized = app.middleware.authorized;

  // 账号操作
  router.get(`${config.server.apiPrefix}/account/currentuser`, controller.account.getCurrent);
  router.get(`${config.server.apiPrefix}/account/menu`, controller.account.getMenu);
  router.post(`${config.server.apiPrefix}/account/login`, controller.account.login);
  router.post(`${config.server.apiPrefix}/account/logout`, controller.account.logout);
  router.put(`${config.server.apiPrefix}/account/updatepassword`, controller.account.updatePassword);

  // 文章分类管理
  router.get(`${config.server.apiPrefix}/categories`, controller.content.category.index);
  router.get(`${config.server.apiPrefix}/categories/:id`, controller.content.category.show);
  router.post(`${config.server.apiPrefix}/categories`, isAuthorized('content.category.create'), controller.content.category.create);
  router.put(`${config.server.apiPrefix}/categories/:id`, isAuthorized('content.category.update'), controller.content.category.update);
  router.delete(`${config.server.apiPrefix}/categories/:id`, isAuthorized('content.category.destroy'), controller.content.category.destroy);

  // 文章管理
  router.get(`${config.server.apiPrefix}/articles`, controller.content.article.index);
  router.get(`${config.server.apiPrefix}/articles/:id`, controller.content.article.show);
  router.post(`${config.server.apiPrefix}/articles`, isAuthorized('content.article.create'), controller.content.article.create);
  router.put(`${config.server.apiPrefix}/articles/:id`, isAuthorized('content.article.update'), controller.content.article.update);
  router.delete(`${config.server.apiPrefix}/articles/:id`, isAuthorized('content.article.destroy'), controller.content.article.destroy);

  // 用户管理
  router.get(`${config.server.apiPrefix}/auth/users`, isAuthorized('auth.user.index'), controller.auth.user.index);
  router.get(`${config.server.apiPrefix}/auth/users/:id`, isAuthorized('auth.user.show'), controller.auth.user.show);
  router.post(`${config.server.apiPrefix}/auth/users`, isAuthorized('auth.user.create'), controller.auth.user.create);
  router.put(`${config.server.apiPrefix}/auth/users/:id`, isAuthorized('auth.user.update'), controller.auth.user.update);
  router.delete(`${config.server.apiPrefix}/auth/users/:id`, isAuthorized('auth.user.destroy'), controller.auth.user.destroy);
  router.put(`${config.server.apiPrefix}/auth/resetpassword/:id`, isAuthorized('auth.user.resetPassword'), controller.auth.user.resetPassword);

  // 角色管理
  router.get(`${config.server.apiPrefix}/auth/roles`, isAuthorized('auth.role.index'), controller.auth.role.index);
  router.get(`${config.server.apiPrefix}/auth/roles/:id`, isAuthorized('auth.role.show'), controller.auth.role.show);
  router.post(`${config.server.apiPrefix}/auth/roles`, isAuthorized('auth.role.create'), controller.auth.role.create);
  router.put(`${config.server.apiPrefix}/auth/roles/:id`, isAuthorized('auth.role.update'), controller.auth.role.update);
  router.delete(`${config.server.apiPrefix}/auth/roles/:id`, isAuthorized('auth.role.destroy'), controller.auth.role.destroy);

  // 模块管理
  router.get(`${config.server.apiPrefix}/auth/modules`, isAuthorized('auth.module.index'), controller.auth.module.index);
  router.get(`${config.server.apiPrefix}/auth/modules/tree`, controller.auth.module.getTreeList);
  router.get(`${config.server.apiPrefix}/auth/modules/:id`, isAuthorized('auth.module.show'), controller.auth.module.show);
  router.post(`${config.server.apiPrefix}/auth/modules`, isAuthorized('auth.module.create'), controller.auth.module.create);
  router.put(`${config.server.apiPrefix}/auth/modules/:id`, isAuthorized('auth.module.update'), controller.auth.module.update);
  router.delete(`${config.server.apiPrefix}/auth/modules/:id`, isAuthorized('auth.module.destroy'), controller.auth.module.destroy);

  router.resources('categories', `${config.server.apiPrefix}/categories`, controller.content.category);
  router.resources('articles', `${config.server.apiPrefix}/articles`, controller.content.article);
};
