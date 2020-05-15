import globalModel from '@/models/global';
import modelLogin from '../pages/Login/index.model';
import modelLoginForget from '../pages/Login/Forget.model';
import modelSettingsPasswordChange from '../pages/Settings/PasswordChange.model';
import modelAdminCarSubsidyReviewValueAddTaxList from '../pages/Admin/CarSubsidyReview/ValueAddTax/List.model';
import modelAdminCarSubsidyReviewValueAddTaxDetail from '../pages/Admin/CarSubsidyReview/ValueAddTax/Detail.model';
import modelAdminCarSubsidyReviewPurchaseTaxList from '../pages/Admin/CarSubsidyReview/PurchaseTax/List.model';
import modelAdminCarSubsidyReviewPurchaseTaxDetail from '../pages/Admin/CarSubsidyReview/PurchaseTax/Detail.model';
import modelAdminCompanyList from '../pages/Admin/Company/List.model';
import modelAdminCompanyCreate from '../pages/Admin/Company/Create.model';
import modelAdminCompanyUpdate from '../pages/Admin/Company/Update.model';
import modelAdminAccountList from '../pages/Admin/Account/List.model';
import modelUserCarSubsidyMngValueAddTaxList from '../pages/User/CarSubsidyMng/ValueAddTax/List.model';
import modelUserCarSubsidyMngValueAddTaxCreate from '../pages/User/CarSubsidyMng/ValueAddTax/Create.model';
import modelUserCarSubsidyMngValueAddTaxUpdate from '../pages/User/CarSubsidyMng/ValueAddTax/Update.model';
import modelUserCarSubsidyMngValueAddTaxDetail from '../pages/User/CarSubsidyMng/ValueAddTax/Detail.model';
import modelUserCarSubsidyMngPurchaseTaxList from '../pages/User/CarSubsidyMng/PurchaseTax/List.model';
import modelUserCarSubsidyMngPurchaseTaxCreate from '../pages/User/CarSubsidyMng/PurchaseTax/Create.model';
import modelUserCarSubsidyMngPurchaseTaxUpdate from '../pages/User/CarSubsidyMng/PurchaseTax/Update.model';
import modelUserCarSubsidyMngPurchaseTaxDetail from '../pages/User/CarSubsidyMng/PurchaseTax/Detail.model';
import modelAdminAnalysis from '../pages/Admin/Analysis/index.model';
import modelUserAnalysis from '../pages/User/Analysis/index.model';

export const createStore = () => ({
  // note the use of this which refers to observable instance of the store
  globalModel,
  modelLogin,
  modelLoginForget,
  modelSettingsPasswordChange,
  modelAdminCarSubsidyReviewValueAddTaxList,
  modelAdminCarSubsidyReviewValueAddTaxDetail,
  modelAdminCarSubsidyReviewPurchaseTaxList,
  modelAdminCarSubsidyReviewPurchaseTaxDetail,
  modelAdminCompanyList,
  modelAdminCompanyCreate,
  modelAdminCompanyUpdate,
  modelAdminAccountList,
  modelUserCarSubsidyMngValueAddTaxList,
  modelUserCarSubsidyMngValueAddTaxCreate,
  modelUserCarSubsidyMngValueAddTaxUpdate,
  modelUserCarSubsidyMngValueAddTaxDetail,
  modelUserCarSubsidyMngPurchaseTaxList,
  modelUserCarSubsidyMngPurchaseTaxCreate,
  modelUserCarSubsidyMngPurchaseTaxUpdate,
  modelUserCarSubsidyMngPurchaseTaxDetail,
  modelAdminAnalysis,
  modelUserAnalysis,
});
