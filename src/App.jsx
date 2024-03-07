import { lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Aos from "aos";

// Reseller Dashboard
const ResellerDashboard = lazy(() => import("./pages/affiliatedashboard"));
const ResellerSetting = lazy(() => import("./pages/affiliatedashboard/setting"));
const ResellerSupport = lazy(() => import("./pages/affiliatedashboard/support"));
const ResellerSupportAdd = lazy(() => import("./pages/affiliatedashboard/support/add"));
const ResellerProduct = lazy(() => import("./pages/affiliatedashboard/product"));
const ResellerAddProduct = lazy(() => import("./pages/affiliatedashboard/product/add-product"));
const ResellerProductVideo = lazy(() => import("./pages/affiliatedashboard/product/add-video"));
const ResellerProductFiles = lazy(() => import("./pages/affiliatedashboard/product/add-files"));
const ResellerProductEdit = lazy(() => import("./pages/affiliatedashboard/product/edit-product"));
const ReselerInventory = lazy(() => import("./pages/affiliatedashboard/inventory"));
const AddResellerInventory = lazy(() => import("./pages/affiliatedashboard/inventory/add-inventory"));
const ResellerHire = lazy(() => import("./pages/affiliatedashboard/hire"));
const ResellerHireDetail = lazy(() => import("./pages/affiliatedashboard/hire/hire-detail"));
const ResellerChat = lazy(() => import("./pages/affiliatedashboard/chat"));
const ResellerFollow = lazy(() => import("./pages/affiliatedashboard/follow"));
const ResellerMyStreaming = lazy(() => import("./pages/affiliatedashboard/streaming"));
const ResellerAddStreaming = lazy(() => import("./pages/affiliatedashboard/streaming/add-streaming"));
const ResellerStreaming = lazy(() => import("./pages/affiliatedashboard/streaming/streaming"));
const ResellerStreamingDetail = lazy(() => import("./pages/affiliatedashboard/streaming/detail"));

// Seller Dashboard
const SellerDashboard = lazy(() => import("./pages/sellerdashboard"));
const Category = lazy(() => import("./pages/sellerdashboard/category"));
const SellerProduct = lazy(() => import("./pages/sellerdashboard/product"));
const AddProduct = lazy(() => import("./pages/sellerdashboard/product/add-product"));
const EditProduct = lazy(() => import("./pages/sellerdashboard/product/edit-product"));
const ProductVideo = lazy(() => import("./pages/sellerdashboard/product/add-video"));
const FilesProduct = lazy(() => import("./pages/sellerdashboard/product/add-files"));
const Bazar = lazy(() => import("./pages/sellerdashboard/Bazar"));
const SellerOrder = lazy(() => import("./pages/sellerdashboard/order"));
const SellerOrderInfo = lazy(() => import("./pages/sellerdashboard/order/order-info"));
const SellerOrderInvoice = lazy(() => import("./pages/sellerdashboard/order/order-invoice"));
const Video = lazy(() => import("./pages/sellerdashboard/video"));
const Package = lazy(() => import("./pages/sellerdashboard/package"));
const SellerSetting = lazy(() => import("./pages/sellerdashboard/setting"));
const SellerSupport = lazy(() => import("./pages/sellerdashboard/support"));
const AddSellerSupport = lazy(() => import("./pages/sellerdashboard/support/add"));
const SellerInventory = lazy(() => import("./pages/sellerdashboard/inventory"));
const AddInventory = lazy(() => import("./pages/sellerdashboard/inventory/add-inventory"));
const SellerChat = lazy(() => import("./pages/sellerdashboard/chat"));
const SellerBrand = lazy(() => import("./pages/sellerdashboard/brand"));
const SellerAddBrand = lazy(() => import("./pages/sellerdashboard/brand/add-brand"));
const MyStreaming = lazy(() => import("./pages/sellerdashboard/streaming"));
const AddStreaming = lazy(() => import("./pages/sellerdashboard/streaming/add-streaming"));
const SellerStreaming = lazy(() => import("./pages/sellerdashboard/streaming/streaming"));
const SellerStreamingDetail = lazy(() => import("./pages/sellerdashboard/streaming/detail"));
const SellerFollow = lazy(() => import("./pages/sellerdashboard/follow"));
const SellerVehicle = lazy(() => import("./pages/sellerdashboard/vehicle"));
const AddSellerVehicle = lazy(() => import("./pages/sellerdashboard/vehicle/add-vehicle"));
const EditSellerVehicle = lazy(() => import("./pages/sellerdashboard/vehicle/edit-vehicle"));
const SellerFilesVehicle = lazy(() => import("./pages/sellerdashboard/vehicle/add-files"));
const SellerVideoVehicle = lazy(() => import("./pages/sellerdashboard/vehicle/add-video"));
const SellerVehicleAmenities = lazy(() => import("./pages/sellerdashboard/vehicle/add-features"));
const SellerPropertylisting = lazy(() => import("./pages/sellerdashboard/property"));
const SellerPropertyAdd = lazy(() => import("./pages/sellerdashboard/property/add-property"));
const SellerPropertyVideo = lazy(() => import("./pages/sellerdashboard/property/add-video"));
const SellerPropertyFiles = lazy(() => import("./pages/sellerdashboard/property/add-files"));
const SellerPropertyEdit = lazy(() => import("./pages/sellerdashboard/property/edit-property"));
const SellerPropertyAmenities = lazy(() => import("./pages/sellerdashboard/property/add-amenities"));
// User  Dashboard
const Dashboard = lazy(() => import("./pages/userdashboard"));
const Profile = lazy(() => import("./pages/userdashboard/profile"));
const Orders = lazy(() => import("./pages/userdashboard/orders"));
const OrderInvoice = lazy(() => import("./pages/userdashboard/orders/order-invoice"));
const Wishlist = lazy(() => import("./pages/userdashboard/wishlist"));
const Settings = lazy(() => import("./pages/userdashboard/settings"));
const Support = lazy(() => import("./pages/userdashboard/support"));
const AddSupport = lazy(() => import("./pages/userdashboard/support/add"));
const OrderTrack = lazy(() => import("./pages/userdashboard/trackorder"));
const OrderInfo = lazy(() => import("./pages/userdashboard/orderinfo"));
const ReviewProduct = lazy(() => import("./pages/userdashboard/reviewProduct"));
const UserHire = lazy(() => import("./pages/userdashboard/hire"));
const UserProduct = lazy(() => import("./pages/userdashboard/product"));
const HireDetail = lazy(() => import("./pages/userdashboard/hire/hire-detail"));
const UserChat = lazy(() => import("./pages/userdashboard/chat"));
const UserFollow = lazy(() => import("./pages/userdashboard/follow"));
// Website
const Home = lazy(() => import("./pages/website/home"));
const About = lazy(() => import("./pages/website/about"));
const Contact = lazy(() => import("./pages/website/contact"));
const Product = lazy(() => import("./pages/website/product"));
const Products = lazy(() => import("./pages/website/products"));
const Streaming = lazy(() => import("./pages/website/sundaybazar"));
const PrivacyPolicy = lazy(() => import("./pages/website/privacypolicy"));
const Chat = lazy(() => import("./pages/website/chat"));
const PurchaseProtection = lazy(() => import("./pages/website/purchaseProtection"));
const HelpCenter = lazy(() => import("./pages/website/helpCenter"));
const ResellerHireForm = lazy(() => import("./pages/website/resellerHireForm"));
const TermsAndCondition = lazy(() => import("./pages/website/termsandconditions"));
const Shop = lazy(() => import("./pages/website/shop"));
const Cart = lazy(() => import("./pages/website/cart"));
const ShopListing = lazy(() => import("./pages/website/shoplisting"));
const SundayBazarListing = lazy(() => import("./pages/website/sundaybazarlisting"));
const SundayBazarCategoryListing = lazy(() => import("./pages/website/sundaybazarcategorylisting"));
const CompareProduct = lazy(() => import("./pages/website/compare"));
const ShortListing = lazy(() => import("./pages/website/shortsListing"));
const Checkout = lazy(() => import("./pages/website/checkout"));
const Faq = lazy(() => import("./pages/website/faq"));
const Refund = lazy(() => import("./pages/website/refund"));
const Invoice = lazy(() => import("./pages/website/invoice"));
const WebsiteCategory = lazy(() => import("./pages/website/category"));
const Resellers = lazy(() => import("./pages/website/resellers"));
const Reseller = lazy(() => import("./pages/website/reseller"));
const WebsiteSubCategory = lazy(() => import("./pages/website/subcategory"));
const SearchResults = lazy(() => import("./pages/website/searchresults"));
const PricingPlans = lazy(() => import("./pages/website/pricingplans"));
const Properties = lazy(() => import("./pages/website/properties"));
const PropertyDetails = lazy(() => import("./pages/website/propertydetails"));
const SelectLogin = lazy(() => import("./pages/website/selectlogin"));
const VehicleListing = lazy(() => import("./pages/website/vehiclelisting"));
const VehicleDetail = lazy(() => import("./pages/website/vehicledetail"));

// User Auth
const Login = lazy(() => import("./pages/website/login"));
const Register = lazy(() => import("./pages/website/register"));
const Forgot = lazy(() => import("./pages/website/forgot"));
const Otp = lazy(() => import("./pages/website/otp"));
const ChangePassword = lazy(() => import("./pages/website/changepassword"));

// Seller Auth
const SellerLogin = lazy(() => import("./pages/website/sellerlogin"));
const SellerSignup = lazy(() => import("./pages/website/sellersignup"));
const SellerOtp = lazy(() => import("./pages/website/sellerotp"));
const SellerForgot = lazy(() => import("./pages/website/sellerforgot"));
const SellerChangePassword = lazy(() => import("./pages/website/sellerchangepassword"));

// Reseller Auth
const ResellerLogin = lazy(() => import("./pages/website/resellerLogin"));
const ResellerSignup = lazy(() => import("./pages/website/resellersignup"));
const ResellerOtp = lazy(() => import("./pages/website/resellerotp"));
const ResellerForgot = lazy(() => import("./pages/website/resellerforgot"));
const ResellerChangePassoword = lazy(() => import("./pages/website/resellerchangepassword"));

// Recover
const UserRecover = lazy(() => import("./pages/recover/user"));
const SellerRecover = lazy(() => import("./pages/recover/seller"));
const ResellerRecover = lazy(() => import("./pages/recover/reseller"));

// Layouts
import Layout from "./layout/Layout";
import WebisteLayout from "./layout/WebsiteLayout";
import SellerLayout from "./layout/sellerLayout";
import AffiliateLayout from "./layout/affiliateLayout";

import {
  recoverRoutes,
  resellerDashboardRoutes,
  sellerDashboardRoutes,
  userDashboardRoutes,
  websiteRoutes,
} from "./constant/routes";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "./store/category/slice";
import { fetchCountries } from "./store/country/slice";
import { fetchMake } from "./store/make/slice";
import Error from "./pages/404";
import { fetchType } from "./store/propertyType/slice";

function App() {
  const { error } = useSelector((state) => state.categories);
  // const {config} = useSelector(state => state.streaming)
  const dispatch = useDispatch();

  useEffect(() => {
    if (error === null) {
      dispatch(fetchCategories());
      dispatch(fetchCountries());
      dispatch(fetchMake());
      dispatch(fetchType());
    }
  }, [error, dispatch]);

  useEffect(() => {
    Aos.init();

    return () => {};
  }, []);

  return (
    <main className="App relative">
      <Routes>
        {/* Website */}

        <Route path="/" element={<WebisteLayout />}>
          <Route index element={<Home />} />
          <Route path={websiteRoutes.about} element={<About />} />
          <Route path={websiteRoutes.contact} element={<Contact />} />
          <Route path={websiteRoutes.productListing} element={<Products />} />
          <Route path={websiteRoutes.productDetails} element={<Product />} />
          <Route path={websiteRoutes.sundaybazarCategoryListing} element={<SundayBazarCategoryListing />} />
          <Route path={websiteRoutes.sundaybazarListing} element={<SundayBazarListing />} />
          <Route path={websiteRoutes.sundaybazarDetails} element={<Streaming />} />
          <Route path={websiteRoutes.userLogin} element={<Login />} />
          <Route path={websiteRoutes.userRegister} element={<Register />} />
          <Route path={websiteRoutes.userForgotPassword} element={<Forgot />} />
          <Route path={websiteRoutes.userOtp} element={<Otp />} />
          <Route path={websiteRoutes.userChangePassword} element={<ChangePassword />} />
          <Route path={websiteRoutes.privacyPolicy} element={<PrivacyPolicy />} />
          <Route path={websiteRoutes.purchaseProtection} element={<PurchaseProtection />} />
          <Route path={websiteRoutes.helpCenter} element={<HelpCenter />} />
          <Route path={websiteRoutes.chat} element={<Chat />} />
          <Route path={websiteRoutes.termsAndConditions} element={<TermsAndCondition />} />
          <Route path={websiteRoutes.resellerLogin} element={<ResellerLogin />} />
          <Route path={websiteRoutes.resellerSignup} element={<ResellerSignup />} />
          <Route path={websiteRoutes.resellerOtp} element={<ResellerOtp />} />
          <Route path={websiteRoutes.resellerForgot} element={<ResellerForgot />} />
          <Route path={websiteRoutes.resellerChangePassword} element={<ResellerChangePassoword />} />
          <Route path={websiteRoutes.sellerLogin} element={<SellerLogin />} />
          <Route path={websiteRoutes.sellerSignup} element={<SellerSignup />} />
          <Route path={websiteRoutes.sellerForgotPassword} element={<SellerForgot />} />
          <Route path={websiteRoutes.sellerChangePassword} element={<SellerChangePassword />} />
          <Route path={websiteRoutes.sellerOtp} element={<SellerOtp />} />
          <Route path={websiteRoutes.sellerListing} element={<ShopListing />} />
          <Route path={websiteRoutes.sellerDetails} element={<Shop />} />
          <Route path={websiteRoutes.cart} element={<Cart />} />
          <Route path={websiteRoutes.compare} element={<CompareProduct />} />
          <Route path={websiteRoutes.shorts} element={<ShortListing />} />
          <Route path={websiteRoutes.checkout} element={<Checkout />} />
          <Route path={websiteRoutes.faq} element={<Faq />} />
          <Route path={websiteRoutes.refundPolicy} element={<Refund />} />
          <Route path={websiteRoutes.invoice} element={<Invoice />} />
          <Route path={websiteRoutes.pricingPlans} element={<PricingPlans />} />
          <Route path={websiteRoutes.resellerListing} element={<Resellers />} />
          <Route path={websiteRoutes.vehicleListing} element={<VehicleListing />} />
          <Route path={websiteRoutes.vehicleDetail} element={<VehicleDetail />} />
          <Route path={websiteRoutes.category} element={<WebsiteCategory />} />
          <Route path={websiteRoutes.subCategory} element={<WebsiteSubCategory />} />
          <Route path={websiteRoutes.reseller} element={<Reseller />} />
          <Route path={websiteRoutes.resellerHire} element={<ResellerHireForm />} />
          <Route path={websiteRoutes.searchResult} element={<SearchResults />} />
          <Route path={websiteRoutes.properties} element={<Properties />} />
          <Route path={websiteRoutes.propertyDetail} element={<PropertyDetails />} />
          <Route path={websiteRoutes.login} element={<SelectLogin />} />
        </Route>

        {/* Website */}

        {/* User */}

        <Route path={userDashboardRoutes.dashboard} element={<Layout />}>
          <Route path={userDashboardRoutes.home} element={<Dashboard />} />
          <Route path={userDashboardRoutes.profile} element={<Profile />} />
          <Route path={userDashboardRoutes.order} element={<Orders />} />
          <Route path={userDashboardRoutes.orderTrack} element={<OrderTrack />} />
          <Route path={userDashboardRoutes.orderInfo} element={<OrderInfo />} />
          <Route path={userDashboardRoutes.orderInvoice} element={<OrderInvoice />} />
          <Route path={userDashboardRoutes.reviewProduct} element={<ReviewProduct />} />
          <Route path={userDashboardRoutes.wishlist} element={<Wishlist />} />
          <Route path={userDashboardRoutes.userHire} element={<UserHire />} />
          <Route path={userDashboardRoutes.hireDetail} element={<HireDetail />} />
          <Route path={userDashboardRoutes.userProduct} element={<UserProduct />} />
          <Route path={userDashboardRoutes.settings} element={<Settings />} />
          <Route path={userDashboardRoutes.support} element={<Support />} />
          <Route path={userDashboardRoutes.addSupport} element={<AddSupport />} />
          <Route path={userDashboardRoutes.chat} element={<UserChat />} />
          <Route path={userDashboardRoutes.follow} element={<UserFollow />} />
        </Route>

        {/* User */}

        {/* Seller */}

        <Route path={sellerDashboardRoutes.dashboard} element={<SellerLayout />}>
          <Route path={sellerDashboardRoutes.home} element={<SellerDashboard />} />
          <Route path={sellerDashboardRoutes.category} element={<Category />} />
          <Route path={sellerDashboardRoutes.inventory} element={<SellerInventory />} />
          <Route path={sellerDashboardRoutes.addInventory} element={<AddInventory />} />
          <Route path={sellerDashboardRoutes.product} element={<SellerProduct />} />
          <Route path={sellerDashboardRoutes.addProduct} element={<AddProduct />} />
          <Route path={sellerDashboardRoutes.editProduct} element={<EditProduct />} />
          <Route path={sellerDashboardRoutes.productVideo} element={<ProductVideo />} />
          <Route path={sellerDashboardRoutes.productFiles} element={<FilesProduct />} />
          <Route path={sellerDashboardRoutes.vehicle} element={<SellerVehicle />} />
          <Route path={sellerDashboardRoutes.addVehicle} element={<AddSellerVehicle />} />
          <Route path={sellerDashboardRoutes.editVehicle} element={<EditSellerVehicle />} />
          <Route path={sellerDashboardRoutes.vehicleFiles} element={<SellerFilesVehicle />} />
          <Route path={sellerDashboardRoutes.vehicleVideo} element={<SellerVideoVehicle />} />
          <Route path={sellerDashboardRoutes.vehicleFeatures} element={<SellerVehicleAmenities />} />
          <Route path={sellerDashboardRoutes.bazar} element={<Bazar />} />
          <Route path={sellerDashboardRoutes.order} element={<SellerOrder />} />
          <Route path={sellerDashboardRoutes.orderInfo} element={<SellerOrderInfo />} />
          <Route path={sellerDashboardRoutes.orderInvoice} element={<SellerOrderInvoice />} />
          <Route path={sellerDashboardRoutes.video} element={<Video />} />
          <Route path={sellerDashboardRoutes.package} element={<Package />} />
          <Route path={sellerDashboardRoutes.settings} element={<SellerSetting />} />
          <Route path={sellerDashboardRoutes.chat} element={<SellerChat />} />
          <Route path={sellerDashboardRoutes.follow} element={<SellerFollow />} />
          <Route path={sellerDashboardRoutes.brand} element={<SellerBrand />} />
          <Route path={sellerDashboardRoutes.addBrand} element={<SellerAddBrand />} />
          <Route path={sellerDashboardRoutes.support} element={<SellerSupport />} />
          <Route path={sellerDashboardRoutes.addSupport} element={<AddSellerSupport />} />
          <Route path={sellerDashboardRoutes.streaming} element={<MyStreaming />} />
          <Route path={sellerDashboardRoutes.addStreaming} element={<AddStreaming />} />
          <Route path={sellerDashboardRoutes.sellerStreaming} element={<SellerStreaming />} />
          <Route path={sellerDashboardRoutes.streamingInfo} element={<SellerStreamingDetail />} />
          <Route path={sellerDashboardRoutes.propertyListing} element={<SellerPropertylisting />} />
          <Route path={sellerDashboardRoutes.propertyadd} element={<SellerPropertyAdd />} />
          <Route path={sellerDashboardRoutes.propertyVideo} element={<SellerPropertyVideo />} />
          <Route path={sellerDashboardRoutes.propertyFiles} element={<SellerPropertyFiles />} />
          <Route path={sellerDashboardRoutes.propertyEdit} element={<SellerPropertyEdit />} />
          <Route path={sellerDashboardRoutes.propertyAmenities} element={<SellerPropertyAmenities />} />
        </Route>

        {/* Seller */}

        {/* Reseller */}

        <Route path={resellerDashboardRoutes.dashboard} element={<AffiliateLayout />}>
          <Route path={resellerDashboardRoutes.home} element={<ResellerDashboard />} />
          <Route path={resellerDashboardRoutes.product} element={<ResellerProduct />} />
          <Route path={resellerDashboardRoutes.productVideo} element={<ResellerProductVideo />} />
          <Route path={resellerDashboardRoutes.productFiles} element={<ResellerProductFiles />} />
          <Route path={resellerDashboardRoutes.productEdit} element={<ResellerProductEdit />} />
          <Route path={resellerDashboardRoutes.inventry} element={<ReselerInventory />} />
          <Route path={resellerDashboardRoutes.addInventory} element={<AddResellerInventory />} />
          <Route path={resellerDashboardRoutes.addProduct} element={<ResellerAddProduct />} />
          <Route path={resellerDashboardRoutes.hire} element={<ResellerHire />} />
          <Route path={resellerDashboardRoutes.hireDetail} element={<ResellerHireDetail />} />
          <Route path={resellerDashboardRoutes.settings} element={<ResellerSetting />} />
          <Route path={resellerDashboardRoutes.support} element={<ResellerSupport />} />
          <Route path={resellerDashboardRoutes.addSupport} element={<ResellerSupportAdd />} />
          <Route path={resellerDashboardRoutes.chat} element={<ResellerChat />} />
          <Route path={resellerDashboardRoutes.follow} element={<ResellerFollow />} />
          <Route path={resellerDashboardRoutes.streaming} element={<ResellerMyStreaming />} />
          <Route path={resellerDashboardRoutes.addStreaming} element={<ResellerAddStreaming />} />
          <Route path={resellerDashboardRoutes.resellerStreaming} element={<ResellerStreaming />} />
          <Route path={resellerDashboardRoutes.streamingInfo} element={<ResellerStreamingDetail />} />
        </Route>
        {/* Reseller */}

        <Route path={recoverRoutes.user} element={<UserRecover />} />
        <Route path={recoverRoutes.seller} element={<SellerRecover />} />
        <Route path={recoverRoutes.reseller} element={<ResellerRecover />} />
        {/* NOT FOUND */}

        <Route path="*" element={<Error />} />

        {/* NOT FOUND */}
      </Routes>
    </main>
  );
}

export default App;
