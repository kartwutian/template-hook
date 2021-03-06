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
    "route": "/car_subsidy_review",
    "routes": [
      {
        "route": "/car_subsidy_review/value_add_tax",
        "routes": [
          {
            "route": "/car_subsidy_review/value_add_tax/detail",
            "routes": [],
            "path": "pages/Admin/CarSubsidyReview/ValueAddTax/Detail",
            "name": "购车发票审核详情",
            "authority": [
              "admin"
            ],
            "isHideInMenus": true,
            "hasBread": true
          }
        ],
        "path": "pages/Admin/CarSubsidyReview/ValueAddTax/List",
        "name": "购车发票审核",
        "authority": [
          "admin"
        ],
        "template": "list",
        "isHideChildrenInMenu": true
      },
      {
        "route": "/car_subsidy_review/purchase_tax",
        "routes": [
          {
            "route": "/car_subsidy_review/purchase_tax/detail",
            "routes": [],
            "path": "pages/Admin/CarSubsidyReview/PurchaseTax/Detail",
            "name": "购置税发票审核详情",
            "authority": [
              "admin"
            ],
            "isHideInMenus": true,
            "hasBread": true
          }
        ],
        "path": "pages/Admin/CarSubsidyReview/PurchaseTax/List",
        "name": "购置税发票审核",
        "authority": [
          "admin"
        ],
        "template": "list",
        "isHideChildrenInMenu": true
      }
    ],
    "name": "购车补贴审核",
    "authority": [
      "admin"
    ],
    "icon": "iconlinecar104"
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
    "icon": "iconqiye"
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
    "icon": "icongengduo",
    "isHideInMenus": true
  },
  {
    "route": "/car_subsidy_mng",
    "routes": [
      {
        "route": "/car_subsidy_mng/value_add_tax",
        "routes": [
          {
            "route": "/car_subsidy_mng/value_add_tax/create",
            "routes": [],
            "path": "pages/User/CarSubsidyMng/ValueAddTax/Create",
            "name": "上报购车发票",
            "authority": [
              "user"
            ],
            "isHideInMenus": true
          },
          {
            "route": "/car_subsidy_mng/value_add_tax/update",
            "routes": [],
            "path": "pages/User/CarSubsidyMng/ValueAddTax/Update",
            "name": "修改购车发票",
            "authority": [
              "user"
            ],
            "isHideInMenus": true
          },
          {
            "route": "/car_subsidy_mng/value_add_tax/detail",
            "routes": [],
            "path": "pages/User/CarSubsidyMng/ValueAddTax/Detail",
            "name": "购车发票详情",
            "authority": [
              "user"
            ],
            "isHideInMenus": true,
            "hasBread": true
          }
        ],
        "path": "pages/User/CarSubsidyMng/ValueAddTax/List",
        "name": "提交购车发票审核",
        "template": "list",
        "authority": [
          "user"
        ],
        "isHideChildrenInMenu": true
      },
      {
        "route": "/car_subsidy_mng/purchase_tax",
        "routes": [
          {
            "route": "/car_subsidy_mng/purchase_tax/create",
            "routes": [],
            "path": "pages/User/CarSubsidyMng/PurchaseTax/Create",
            "name": "上报购置税发票",
            "authority": [
              "user"
            ],
            "isHideInMenus": true
          },
          {
            "route": "/car_subsidy_mng/purchase_tax/update",
            "routes": [],
            "path": "pages/User/CarSubsidyMng/PurchaseTax/Update",
            "name": "修改购置税发票",
            "authority": [
              "user"
            ],
            "isHideInMenus": true
          },
          {
            "route": "/car_subsidy_mng/purchase_tax/detail",
            "routes": [],
            "path": "pages/User/CarSubsidyMng/PurchaseTax/Detail",
            "name": "购置税发票详情",
            "authority": [
              "user"
            ],
            "isHideInMenus": true,
            "hasBread": true
          }
        ],
        "path": "pages/User/CarSubsidyMng/PurchaseTax/List",
        "name": "提交购置税发票审核",
        "template": "list",
        "authority": [
          "user"
        ],
        "isHideChildrenInMenu": true
      }
    ],
    "name": "购车补贴申请",
    "authority": [
      "user"
    ],
    "icon": "icongengduo"
  },
  {
    "route": "/analysis",
    "routes": [
      {
        "route": "/analysis/data_analysis",
        "routes": [],
        "path": "pages/Admin/Analysis/index",
        "name": "统计分析",
        "authority": [
          "admin"
        ]
      }
    ],
    "name": "统计分析",
    "authority": [
      "admin"
    ],
    "icon": "iconlinecar104",
    "isHideInMenus": true
  },
  {
    "route": "/statistical_analysis",
    "routes": [
      {
        "route": "/statistical_analysis/data_analysis",
        "routes": [],
        "path": "pages/User/Analysis/index",
        "name": "统计分析",
        "authority": [
          "user"
        ]
      }
    ],
    "name": "统计分析",
    "authority": [
      "user"
    ],
    "icon": "iconlinecar104",
    "isHideInMenus": true
  }
]

export default router;
