import { delay } from 'utils/helper';
import {} from './_service.ValueAddTax.js';

const modelAdminCarSubsidyReviewValueAddTaxDetail = {
  name: 'modelAdminCarSubsidyReviewValueAddTaxDetail',
  changeName() {
    console.log(this);
    this.name = this.name + 1;
  },
};

export default modelAdminCarSubsidyReviewValueAddTaxDetail;
