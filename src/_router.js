/* eslint-disable */

const router = [
  {
    route: '/login',
    routes: [],
    path: 'pages/Login/index',
    name: '登录',
    isInLayout: false,
  },
  {
    route: '/home',
    routes: [],
    path: 'pages/Home/index',
    name: '首页',
  },
  {
    route: '/project',
    routes: [
      {
        route: '/project/list',
        routes: [],
        path: 'pages/Project/List',
        name: '项目列表',
        hasBread: true,
      },
      {
        route: '/project/Developing',
        routes: [],
        path: 'pages/Project/Developing',
        name: '项目开发',
        template: 'list',
        hasBread: true,
      },
    ],
    name: '项目',
  },
];

export default router;
