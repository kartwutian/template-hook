/* eslint-disable */

const router = [
  {
    "route": "/login",
    "routes": [
      {
        "route": "/login/forget",
        "routes": [],
        "path": "pages/Login/Forget",
        "name": "忘记密码",
        "isInLayout": false,
        "isHideInMenus": true
      }
    ],
    "path": "pages/Login/index",
    "name": "登录",
    "isInLayout": false,
    "isHideInMenus": true
  },
  {
    "route": "/settings",
    "routes": [
      {
        "route": "/settings/password_change",
        "routes": [],
        "path": "pages/Settings/PasswordChange",
        "name": "修改密码",
        "isHideInMenus": true
      }
    ],
    "name": "设置",
    "isHideInMenus": true
  },
  {
    "route": "/company",
    "routes": [
      {
        "route": "/company/list",
        "routes": [],
        "path": "pages/Admin/Company/List",
        "name": "白名单列表",
        "authority": [
          "admin"
        ],
        "template": "list"
      },
      {
        "route": "/company/create",
        "routes": [],
        "path": "pages/Admin/Company/Create",
        "name": "新增企业白名单",
        "authority": [
          "admin"
        ],
        "isHideInMenus": true
      },
      {
        "route": "/company/update",
        "routes": [],
        "path": "pages/Admin/Company/Update",
        "name": "编辑企业白名单",
        "authority": [
          "admin"
        ],
        "isHideInMenus": true
      }
    ],
    "name": "企业白名单管理",
    "authority": [
      "admin"
    ],
    "icon": "icongengduo"
  },
  {
    "route": "/account",
    "routes": [
      {
        "route": "/account/list",
        "routes": [],
        "path": "pages/Admin/Account/List",
        "name": "账号列表",
        "authority": [
          "admin"
        ],
        "template": "list"
      }
    ],
    "name": "账号管理",
    "authority": [
      "admin"
    ],
    "icon": "icongengduo"
  },
  {
    "route": "/car_subsidy_review",
    "routes": [
      {
        "route": "/car_subsidy_review/value_add_tax",
        "routes": [],
        "path": "pages/Admin/CarSubsidyReview/ValueAddTax/List",
        "name": "增值税审核",
        "authority": [
          "admin"
        ],
        "template": "list"
      },
      {
        "route": "/car_subsidy_review/purchase_tax",
        "routes": [],
        "path": "pages/Admin/CarSubsidyReview/PurchaseTax/List",
        "name": "购置税审核",
        "authority": [
          "admin"
        ],
        "template": "list"
      }
    ],
    "name": "购车补贴审核",
    "authority": [
      "admin"
    ],
    "icon": "icongengduo"
  },
  {
    "route": "/car_subsidy_mng",
    "routes": [
      {
        "route": "/car_subsidy_mng/value_add_tax",
        "routes": [],
        "path": "pages/User/CarSubsidyMng/ValueAddTax/List",
        "name": "增值税补贴申请",
        "template": "list",
        "authority": [
          "user"
        ]
      },
      {
        "route": "/car_subsidy_mng/purchase_tax",
        "routes": [],
        "path": "pages/User/CarSubsidyMng/PurchaseTax/List",
        "name": "购置税补贴申请",
        "template": "list",
        "authority": [
          "user"
        ]
      }
    ],
    "name": "购车补贴管理",
    "authority": [
      "user"
    ],
    "icon": "icongengduo"
  }
]

export default router;
