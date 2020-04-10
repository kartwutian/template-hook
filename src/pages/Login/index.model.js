import { delay } from 'utils/helper';

export default {
  name: 'bhz',
  changeName() {
    console.log(this);
    this.name = this.name + 1;
  },
};
