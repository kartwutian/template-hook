module.exports = {
  webpack: {
    dll: {}, // 扩展dll动态链接库
    //存放需要变动的webpack的配置参数
    publicPath: '/demo/', // 打包时候的前缀配置，注意一定要/开头，/结尾，因为我偷懒了,不会用在开发环境
    htmlWebpackPlugin: {
      title: 'template-admin',
    }, // html-webpack-plugin 的配置参数，主要可以用来配置title及其meta
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    }, // 开发时候的代理配置
  },
  pages: [
    // pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
    // {
    //   path: 'pages/Home/index', // 生成的页面路径
    //   //   template: 'list', // 配置生成相关页面使用的模板文件，没有则用默认模板文件
    //   route: '/project', // 使用的前端路由
    //   name: '首页',
    //   hasBread: true, // 是否展示自带面包屑
    //   subTitle: '子标题', // 自带header的子标题
    // },
    {
      path: 'pages/Login/index',
      route: '/login',
      name: '登录',
      isInLayout: false, // 标记不包括layout
    },
    {
      path: 'pages/Home/index',
      route: '/home',
      name: '首页',
    },
    {
      route: '/project',
      name: '项目',
    },
    {
      path: 'pages/Project/List',
      route: '/project/list',
      name: '项目列表',
      hasBread: true,
    },
    {
      path: 'pages/Project/Developing',
      route: '/project/Developing',
      name: '项目开发',
      template: 'list',
      hasBread: true,
    },
    // {
    //   path: 'pages/Home/Shop/Demo',
    //   route: '/home/shop/demo',
    //   name: 'demo',
    //   isInLayout: false, // 标记不包括layout
    // },
    // {
    //   route: '/form', // 每一批path,代表不生成页面
    //   name: '表单页',
    // },
    // {
    //   path: 'pages/Form/Basic',
    //   route: '/form/basic',
    //   template: 'list',
    //   name: 'basic',
    //   authority: ['user'], // 用于权限控制，菜单和路由
    // },
    // {
    //   path: 'pages/Form/Step',
    //   route: '/form/step',
    //   template: 'list',
    //   name: 'step',
    //   authority: 'admin', // 用于权限控制，菜单和路由
    // },
    // {
    //   path: 'pages/Maps/index',
    //   route: '/maps',
    //   name: '地图',
    //   isHideInMenus: true, // 代表在菜单栏隐藏菜单
    // },
    // {
    //   path: 'pages/Test/Demo',
    //   template: 'list'
    // }
  ],
};
