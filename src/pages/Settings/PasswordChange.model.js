import { delay } from 'utils/helper';
import {} from './_service.Settings.js';

const modelSettingsPasswordChange = {
  name: 'modelSettingsPasswordChange',
  changeName() {
    console.log(this);
    this.name = this.name + 1;
  },
};

export default modelSettingsPasswordChange;
