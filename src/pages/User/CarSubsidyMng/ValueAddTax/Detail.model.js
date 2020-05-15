import { delay } from 'utils/helper';
import {} from './_service.ValueAddTax.js';

const modelUserCarSubsidyMngValueAddTaxDetail = {
  name: 'modelUserCarSubsidyMngValueAddTaxDetail',
  changeName() {
    console.log(this);
    this.name = this.name + 1;
  },
};

export default modelUserCarSubsidyMngValueAddTaxDetail;
