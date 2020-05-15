import { delay } from 'utils/helper';
import {} from './_service.ValueAddTax.js';

const modelUserCarSubsidyMngValueAddTaxUpdate = {
  name: 'modelUserCarSubsidyMngValueAddTaxUpdate',
  changeName() {
    console.log(this);
    this.name = this.name + 1;
  },
};

export default modelUserCarSubsidyMngValueAddTaxUpdate;
