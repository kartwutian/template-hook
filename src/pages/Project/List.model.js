import { delay } from 'utils/helper';
import {  } from './_service.Project.js';

const modelProjectList = {
  name: 'modelProjectList',
  changeName() {
    console.log(this);
    this.name = this.name + 1;
  },
}

export default modelProjectList;
