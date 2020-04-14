import router from '@/_router';

const USER_INFO = 'user_info';

export default {
  router,
  USER_INFO: localStorage.getItem(USER_INFO) || undefined, // 保存用户登录后的信息

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
    localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
    this.USER_INFO = userInfo;
  },
  logout() {
    localStorage.removeItem(USER_INFO);
    this.USER_INFO = undefined;
  },
};
