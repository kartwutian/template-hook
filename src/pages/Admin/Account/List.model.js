import { delay } from 'utils/helper';
import {} from './_service.Account.js';

const modelAdminAccountList = {
  name: 'modelAdminAccountList',
  changeName() {
    console.log(this);
    this.name = this.name + 1;
  },
};

export default modelAdminAccountList;
