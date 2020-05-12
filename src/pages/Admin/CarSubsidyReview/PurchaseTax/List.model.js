import { delay } from 'utils/helper';
import {} from './_service.PurchaseTax.js';

const modelAdminCarSubsidyReviewPurchaseTaxList = {
  name: 'modelAdminCarSubsidyReviewPurchaseTaxList',
  changeName() {
    console.log(this);
    this.name = this.name + 1;
  },
};

export default modelAdminCarSubsidyReviewPurchaseTaxList;
