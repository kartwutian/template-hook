import router from '@/_router';
import storage from 'store';
import { getSubsidyList } from './_service.global';

const USER_INFO = 'user_info';
const AUTHORITY = 'authority';

const REDIRECT_URL = {
  admin: '/car_subsidy_review/value_add_tax',
  user: '/car_subsidy_mng/value_add_tax',
  default: '/',
};

const getRedirectUrl = () => {
  const role = storage.get(AUTHORITY);
  if (!role) return REDIRECT_URL.default;
  switch (role) {
    case 'admin':
      return REDIRECT_URL.admin;
    case 'user':
      return REDIRECT_URL.admin;
    default:
      return REDIRECT_URL.default;
  }
};

export default {
  router,
  MENU_SELECTKEYS: [], // 菜单选中的key
  USER_INFO: storage.get(USER_INFO) || undefined, // 保存用户登录后的信息
  HOME_ROUTE: getRedirectUrl(), // 登录之后重定向的route
  appEnum: {
    reviewStatus: [
      {
        id: 1,
        name: '未提交',
      },
      {
        id: 2,
        name: '待审核',
      },
      {
        id: 3,
        name: '审核不通过',
      },
      {
        id: 4,
        name: '审核通过',
      },
    ],
    subsidy: [],
  },

  commit(payload) {
    // 只支持根属性级别的变更
    if (!payload) {
      console.log('缺少payload');
      return;
    }
    Object.keys(payload).forEach((prop) => {
      this[prop] = payload[prop];
    });
  },
  async login(userInfo) {
    storage.set(USER_INFO, userInfo);
    if (userInfo.type === 1) {
      storage.set(AUTHORITY, 'admin');
      this.HOME_ROUTE = REDIRECT_URL.admin;
    }
    if (userInfo.type === 2) {
      storage.set(AUTHORITY, 'user');
      this.HOME_ROUTE = REDIRECT_URL.user;
    }
    this.USER_INFO = userInfo;
  },
  logout() {
    storage.remove(USER_INFO);
    storage.remove(AUTHORITY);
    this.USER_INFO = undefined;
  },

  async storeEnums() {
    try {
      const { data } = await getSubsidyList();
      this.appEnum.subsidy = data;
      console.log(this.appEnum);
    } catch (error) {
      console.error(error);
    }
  },
};
