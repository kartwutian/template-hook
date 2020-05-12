module.exports = {
  webpack: {
    dll: {}, // 扩展dll动态链接库
    //存放需要变动的webpack的配置参数
    publicPath: '/dist/', // 打包时候的前缀配置，注意一定要/开头，/结尾，因为我偷懒了,不会用在开发环境
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
    //   isHideInMenus: true, // 代表在菜单栏隐藏菜单
    // },
    {
      path: 'pages/Login/index',
      route: '/login',
      name: '登录',
      isInLayout: false, // 标记不包括layout
      isHideInMenus: true, // 代表在菜单栏隐藏菜单
    },
    {
      path: 'pages/Login/Forget',
      route: '/login/forget',
      name: '忘记密码',
      isInLayout: false, // 标记不包括layout
      isHideInMenus: true, // 代表在菜单栏隐藏菜单
    },
    {
      route: '/settings',
      name: '设置',
      isHideInMenus: true, // 代表在菜单栏隐藏菜单
    },
    {
      path: 'pages/Settings/PasswordChange',
      route: '/settings/password_change',
      name: '修改密码',
      isHideInMenus: true, // 代表在菜单栏隐藏菜单
    },
    {
      route: '/company',
      name: '企业白名单管理',
      authority: ['admin'], // 用于权限控制，菜单和路由
      icon: 'icongengduo',
    },
    {
      path: 'pages/Admin/Company/List',
      route: '/company/list',
      name: '白名单列表',
      authority: ['admin'], // 用于权限控制，菜单和路由
      template: 'list',
    },
    {
      path: 'pages/Admin/Company/Create',
      route: '/company/create',
      name: '新增企业白名单',
      authority: ['admin'], // 用于权限控制，菜单和路由
      isHideInMenus: true, // 代表在菜单栏隐藏菜单
    },
    {
      path: 'pages/Admin/Company/Update',
      route: '/company/update',
      name: '编辑企业白名单',
      authority: ['admin'], // 用于权限控制，菜单和路由
      isHideInMenus: true, // 代表在菜单栏隐藏菜单
    },
    {
      route: '/account',
      name: '账号管理',
      authority: ['admin'], // 用于权限控制，菜单和路由
      icon: 'icongengduo',
    },
    {
      path: 'pages/Admin/Account/List',
      route: '/account/list',
      name: '账号列表',
      authority: ['admin'], // 用于权限控制，菜单和路由
      template: 'list',
    },
    {
      route: '/car_subsidy_review',
      name: '购车补贴审核',
      authority: ['admin'], // 用于权限控制，菜单和路由
      icon: 'icongengduo',
    },
    {
      path: 'pages/Admin/CarSubsidyReview/ValueAddTax/List',
      route: '/car_subsidy_review/value_add_tax',
      name: '增值税审核',
      authority: ['admin'], // 用于权限控制，菜单和路由
      template: 'list',
    },
    {
      path: 'pages/Admin/CarSubsidyReview/PurchaseTax/List',
      route: '/car_subsidy_review/purchase_tax',
      name: '购置税审核',
      authority: ['admin'], // 用于权限控制，菜单和路由
      template: 'list',
    },
    {
      route: '/car_subsidy_mng',
      name: '购车补贴管理',
      authority: ['user'], // 用于权限控制，菜单和路由
      icon: 'icongengduo',
    },
    {
      path: 'pages/User/CarSubsidyMng/ValueAddTax/List',
      route: '/car_subsidy_mng/value_add_tax',
      name: '增值税补贴申请',
      template: 'list',
      authority: ['user'], // 用于权限控制，菜单和路由
      template: 'list',
    },
    {
      path: 'pages/User/CarSubsidyMng/PurchaseTax/List',
      route: '/car_subsidy_mng/purchase_tax',
      name: '购置税补贴申请',
      template: 'list',
      authority: ['user'], // 用于权限控制，菜单和路由
      template: 'list',
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
