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
        path: '/auth',
        name: 'auth',
        routes: [
          {
            path: '/auth/users',
            name: 'userlist',
            component: './Auth/User/List'
          },
          {
            path: '/auth/users/add',
            name: 'useradd',
            component: './Auth/User/Edit'
          },
          {
            path: '/auth/users/:id',
            name: 'useredit',
            component: './Auth/User/Edit'
          },
          {
            path: '/auth/roles',
            name: 'rolelist',
            component: './Auth/Role/List'
          },
          {
            path: '/auth/roles/add',
            name: 'roleadd',
            component: './Auth/Role/Edit'
          },
          {
            path: '/auth/roles/:id',
            name: 'roleedit',
            component: './Auth/Role/Edit'
          },
          {
            path: '/auth/modules',
            name: 'modulelist',
            component: './Auth/Module/List'
          },
          {
            path: '/auth/modules/add',
            name: 'moduleadd',
            component: './Auth/Module/Edit'
          },
          {
            path: '/auth/modules/:id',
            name: 'moduleedit',
            component: './Auth/Module/Edit'
          }
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
