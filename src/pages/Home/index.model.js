import { delay } from 'utils/helper';
import {} from './_service.Home.js';

const modelHome = {
  name: 'modelHome',
  changeName() {
    console.log(this);
    this.name = this.name + 1;
  },
};

export default modelHome;
