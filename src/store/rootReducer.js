import layout from "./layout";
import auth from "./auth/store"
import categories from "./category/slice"
import product from "./product/slice"
import cart from "./cart/slice"
import shop from "./shop/slice"
import reseller from "./reseller/slice"
import compare from "./compare/slice"
import country from "./country/slice"
import state from "./state/slice"
import city from "./city/slice"
import chat from "./chat/slice"
import streaming from "./streaming/slice"
import vehicle from "./vehicle/slice"
import make from "./make/slice"
import model from "./model/slice"
import propertyType from "./propertyType/slice"
import subType from "./propertySubType/slice"
import property from "./property/slice"
const rootReducer = {
  layout,
  auth,
  categories,
  product,
  cart,
  shop,
  reseller,
  compare,
  country,
  state,
  city,
  chat,
  streaming,
  vehicle,
  make,
  model,
  propertyType,
  subType,
  property
};

export default rootReducer;
