import { delay } from 'utils/helper';
import {} from './_service.Company.js';

const modelAdminCompanyList = {
  name: 'modelAdminCompanyList',
  changeName() {
    console.log(this);
    this.name = this.name + 1;
  },
};

export default modelAdminCompanyList;
