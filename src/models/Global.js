import router from '@/_router';
import storage from 'store';

const USER_INFO = 'user_info';
const AUTHORITY = 'authority';

export default {
  router,
  USER_INFO: storage.get(USER_INFO) || undefined, // 保存用户登录后的信息

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
  login(userInfo) {
    storage.set(USER_INFO, userInfo);
    storage.set(AUTHORITY, 'admin');
    this.USER_INFO = userInfo;
  },
  logout() {
    storage.remove(USER_INFO);
    storage.remove(AUTHORITY);
    this.USER_INFO = undefined;
  },
};
