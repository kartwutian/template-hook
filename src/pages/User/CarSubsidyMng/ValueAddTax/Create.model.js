import { delay } from 'utils/helper';
import {} from './_service.ValueAddTax.js';

const modelUserCarSubsidyMngValueAddTaxCreate = {
  name: 'modelUserCarSubsidyMngValueAddTaxCreate',
  changeName() {
    console.log(this);
    this.name = this.name + 1;
  },
};

export default modelUserCarSubsidyMngValueAddTaxCreate;
