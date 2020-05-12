import { delay } from 'utils/helper';
import {} from './_service.Company.js';

const modelAdminCompanyCreate = {
  name: 'modelAdminCompanyCreate',
  changeName() {
    console.log(this);
    this.name = this.name + 1;
  },
};

export default modelAdminCompanyCreate;
