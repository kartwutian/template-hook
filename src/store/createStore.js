import globalModel from '@/models/global';
import modelLogin from '../pages/Login/index.model';
import modelHome from '../pages/Home/index.model';


export const createStore = () => ({
  // note the use of this which refers to observable instance of the store
  globalModel,
  modelLogin,
  modelHome,

});
