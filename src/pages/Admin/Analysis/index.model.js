import { delay } from 'utils/helper';
import {} from './_service.Analysis.js';

const modelAdminAnalysis = {
  name: 'modelAdminAnalysis',
  changeName() {
    console.log(this);
    this.name = this.name + 1;
  },
};

export default modelAdminAnalysis;
