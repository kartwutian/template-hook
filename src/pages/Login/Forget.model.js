import { delay } from 'utils/helper';
import {} from './_service.Login.js';

const modelLoginForget = {
  name: 'modelLoginForget',
  changeName() {
    console.log(this);
    this.name = this.name + 1;
  },
};

export default modelLoginForget;
