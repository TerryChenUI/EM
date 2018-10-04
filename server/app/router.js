'use strict';

module.exports = app => {
  const { router, controller } = app;
  
  router.put('/api/v1/auth/users/resetpwd', controller.auth.user.resetPassword);
  router.resources('authusers', '/api/v1/auth/users', controller.auth.user);

  router.resources('authroles', '/api/v1/auth/roles', controller.auth.role);

  router.get('/api/v1/auth/modules/system', controller.auth.module.getSystem);
  router.resources('authmodules', '/api/v1/auth/modules', controller.auth.module);
  
  router.resources('categories', '/api/v1/categories', controller.content.category);
  router.resources('articles', '/api/v1/articles', controller.content.article);
};
