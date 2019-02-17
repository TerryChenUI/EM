export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/ContainerLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/dashboard' },
      { path: '/dashboard', name: 'home', component: './Dashboard/Index' },
      {
        path: '/content',
        name: 'content',
        routes: [
          {
            path: '/content/categories',
            name: 'category-list',
            component: './Content/Category/List'
          },
          {
            path: '/content/categories/add',
            name: 'category-add',
            component: './Content/Category/Edit'
          },
          {
            path: '/content/categories/:id',
            name: 'category-edit',
            component: './Content/Category/Edit'
          },
          {
            path: '/content/articles',
            name: 'article-list',
            component: './Content/Article/List'
          },
          {
            path: '/content/articles/add',
            name: 'article-add',
            component: './Content/Article/Edit'
          },
          {
            path: '/content/articles/:id',
            name: 'article-edit',
            component: './Content/Article/Edit'
          }
        ],
      },
      {
        path: '/auth',
        name: 'auth',
        routes: [
          {
            path: '/auth/users',
            name: 'user-list',
            component: './Auth/User/List'
          },
          {
            path: '/auth/users/add',
            name: 'user-add',
            component: './Auth/User/Edit'
          },
          {
            path: '/auth/users/:id',
            name: 'user-edit',
            component: './Auth/User/Edit'
          },
          {
            path: '/auth/roles',
            name: 'role-list',
            component: './Auth/Role/List'
          },
          {
            path: '/auth/roles/add',
            name: 'role-add',
            component: './Auth/Role/Edit'
          },
          {
            path: '/auth/roles/:id',
            name: 'role-edit',
            component: './Auth/Role/Edit'
          },
          {
            path: '/auth/modules',
            name: 'module-list',
            component: './Auth/Module/List'
          },
          {
            path: '/auth/modules/add',
            name: 'module-add',
            component: './Auth/Module/Edit'
          },
          {
            path: '/auth/modules/:id',
            name: 'module-edit',
            component: './Auth/Module/Edit'
          }
        ],
      },
      {
        path: '/account',
        name: 'account',
        isCommon: true,
        hideInMenu: true,
        hideInBreadcrumb: true,
        routes: [
          {
            path: '/account/settings',
            name: 'setting',
            component: './Account/Setting',
          },
          {
            path: '/account/updatepassword',
            name: 'update-password',
            component: './Account/UpdatePwd'
          },
        ]
      },
      {
        name: 'exception',
        path: '/exception',
        isCommon: true,
        hideInMenu: true,
        routes: [
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403'
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404'
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500'
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            component: './Exception/TriggerException'
          },
        ]
      },
      {
        component: '404'
      },
    ],
  },
];
