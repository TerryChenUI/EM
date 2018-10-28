'use strict';

module.exports = app => {
  const { router, controller } = app;

  const isAuthorized = app.middleware.authorized;

  router.get('/api/v1/account/currentuser', controller.account.getCurrent);
  router.get('/api/v1/account/menu', controller.account.getMenu);
  router.post('/api/v1/account/login', controller.account.login);
  router.post('/api/v1/account/logout', controller.account.logout);
  router.put('/api/v1/account/updatepassword', controller.account.updatePassword);

  // 用户管理
  router.get('/api/v1/auth/users', isAuthorized('auth.user.index'), controller.auth.user.index); // 用户列表
  router.get('/api/v1/auth/users/:id', isAuthorized('auth.user.show'), controller.auth.user.show); // 用户详情
  router.post('/api/v1/auth/users', isAuthorized('auth.user.create'), controller.auth.user.create); // 添加用户
  router.put('/api/v1/auth/users/:id', isAuthorized('auth.user.update'), controller.auth.user.update); // 更新用户
  router.delete('/api/v1/auth/users/:id', isAuthorized('auth.user.destroy'), controller.auth.user.destroy); // 删除用户
  router.put('/api/v1/auth/resetpassword/:id', isAuthorized('auth.user.resetPassword'), controller.auth.user.resetPassword); // 重置密码

  // 角色管理
  router.get('/api/v1/auth/roles', isAuthorized('auth.role.index'), controller.auth.role.index); // 角色列表
  router.get('/api/v1/auth/roles/:id', isAuthorized('auth.role.show'), controller.auth.role.show); // 角色详情
  router.post('/api/v1/auth/roles', isAuthorized('auth.role.create'), controller.auth.role.create); // 添加角色
  router.put('/api/v1/auth/roles/:id', isAuthorized('auth.role.update'), controller.auth.role.update); // 更新角色
  router.delete('/api/v1/auth/roles/:id', isAuthorized('auth.role.destroy'), controller.auth.role.destroy); // 删除角色

  // 模块管理
  router.get('/api/v1/auth/modules', isAuthorized('auth.module.index'), controller.auth.module.index); // 模块列表
  router.get('/api/v1/auth/modules/system', controller.auth.module.getSystem); // 菜单列表
  router.get('/api/v1/auth/modules/:id', isAuthorized('auth.module.show'), controller.auth.module.show); // 模块详情
  router.post('/api/v1/auth/modules', isAuthorized('auth.module.create'), controller.auth.module.create); // 添加模块
  router.put('/api/v1/auth/modules/:id', isAuthorized('auth.module.update'), controller.auth.module.update); // 更新模块
  router.delete('/api/v1/auth/modules/:id', isAuthorized('auth.module.destroy'), controller.auth.module.destroy); // 删除模块

  router.resources('categories', '/api/v1/categories', controller.content.category);
  router.resources('articles', '/api/v1/articles', controller.content.article);
};
