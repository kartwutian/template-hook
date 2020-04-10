import router from '@/_router';

export default {
  name: 'bhz',
  router,
  changeName() {
    this.name = 'zzz';
    console.log(this);
  },
};
