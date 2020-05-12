import globalModel from '@/models/global';
import modelLogin from '../pages/Login/index.model';
import modelLoginForget from '../pages/Login/Forget.model';
import modelSettingsPasswordChange from '../pages/Settings/PasswordChange.model';
import modelAdminCompanyList from '../pages/Admin/Company/List.model';
import modelAdminCompanyCreate from '../pages/Admin/Company/Create.model';
import modelAdminCompanyUpdate from '../pages/Admin/Company/Update.model';
import modelAdminAccountList from '../pages/Admin/Account/List.model';
import modelAdminCarSubsidyReviewValueAddTaxList from '../pages/Admin/CarSubsidyReview/ValueAddTax/List.model';
import modelAdminCarSubsidyReviewPurchaseTaxList from '../pages/Admin/CarSubsidyReview/PurchaseTax/List.model';
import modelUserCarSubsidyMngValueAddTaxList from '../pages/User/CarSubsidyMng/ValueAddTax/List.model';
import modelUserCarSubsidyMngPurchaseTaxList from '../pages/User/CarSubsidyMng/PurchaseTax/List.model';

export const createStore = () => ({
  // note the use of this which refers to observable instance of the store
  globalModel,
  modelLogin,
  modelLoginForget,
  modelSettingsPasswordChange,
  modelAdminCompanyList,
  modelAdminCompanyCreate,
  modelAdminCompanyUpdate,
  modelAdminAccountList,
  modelAdminCarSubsidyReviewValueAddTaxList,
  modelAdminCarSubsidyReviewPurchaseTaxList,
  modelUserCarSubsidyMngValueAddTaxList,
  modelUserCarSubsidyMngPurchaseTaxList,
});
