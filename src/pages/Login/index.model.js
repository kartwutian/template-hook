import { delay } from 'utils/helper';
import {} from './_service.Login';

export default {
  name: 'bhz',
  async changeName() {
    console.log(this);
    await delay(2);
    this.name = this.name + 1;
  },
};
