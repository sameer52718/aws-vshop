const url = "http://192.168.0.110:1000/api/web";
// const url = "https://vshop-api.digitalelliptical.com/api/web";
// const url = "https://vshop-apis.elliptical.website/api/web";
// const url = "https://api.viewnshop.com/api/web";

// Guest
export const guestLogin = `${url}/user/guest`;
// User Authentications
export const userLogin = `${url}/user/login`;
export const registerUser = `${url}/user/register`;
export const userVerifyOtp = `${url}/user/email/verification`;
export const userOtpResend = `${url}/user/otp/resend`;
export const userLogout = `${url}/user/logout`;
export const userAccountRecover = `${url}/user/account/recover`;
export const verifyRecoveryToken = `${url}/user/account/authorization`;
export const userChangePassword = `${url}/user/change/password`;

// Seller Authemtications
export const sellerLogin = `${url}/seller/login`;
export const sellerRegister = `${url}/seller/register`;
export const sellerVerifyOtp = `${url}/seller/email/verification`;
export const sellerOtpResend = `${url}/seller/otp/resend`;
export const sellerLogout = `${url}/seller/logout`;
export const sellerAccountRecover = `${url}/seller/account/recover`;
export const sellerVerifyRecovery = `${url}/seller/account/authorization`;
export const sellerChangePassword = `${url}/seller/change/password`;

// Reseller
export const resellerRegister = `${url}/reseller/register`;
export const resellerOtpVerify = `${url}/reseller/email/verification`;
export const resellerOtpResend = `${url}/reseller/otp/resend`;
export const resellerLogout = `${url}/reseller/logout`;
export const resellerLogin = `${url}/reseller/login`;
export const resellerRecover = `${url}/reseller/account/recover`;
export const resellerVerifyRecovery = `${url}/reseller/account/authorization`;
export const resellerChangePassword = `${url}/reseller/change/password`;

// User Dashboard
export const getUserProfile = `${url}/user/profile`;
export const updateUserProfile = `${url}/user/change/personal`;
export const getUserProducts = `${url}/user/product/get`;
// User Support
export const insertUserSupport = `${url}/user/support/insert`;
export const getUserSupport = `${url}/user/support/get`;
// User Follow
export const getUserFollow = `${url}/user/follow/get`;
// Seller Dashboard
export const getSellerProfile = `${url}/seller/profile`;
export const updateSellerPersonal = `${url}/seller/change/personal`;
export const updateSellerBank = `${url}/seller/change/bank`;
export const updateSellerShop = `${url}/seller/change/shop`;
export const updateSellerAttachments = `${url}/seller/change/attachment`;
export const SellerCategoryUpdate = `${url}/seller/category/update`;
export const getSellerCategories = `${url}/seller/category`;

// Reseller Dashboard
export const updateResellerPersonal = `${url}/reseller/change/personal`;
export const getResellerProfile = `${url}/reseller/profile`;
export const updateResellerBank = `${url}/reseller/change/bank`;
export const updateResellerAttachments = `${url}/reseller/change/attachment`;

// Seller Products
export const productInsert = `${url}/seller/product/insert`;
export const editProduct = `${url}/seller/product/edit`;
export const getSellerProducts = `${url}/seller/product/get`;
export const updateProductStatus = `${url}/seller/product/status`;
export const sellerProductInfo = `${url}/seller/product/info`;
export const productVideoInsert = `${url}/seller/product/video/insert`;
export const getProductVideo = `${url}/seller/product/video/get`;
export const insertProductFiles = `${url}/seller/product/files/insert`;
export const getProductFiles = `${url}/seller/product/files/get`;
export const deleteProductFile = `${url}/seller/product/files/delete`;
export const brandInsert = `${url}/seller/brand/insert`;
export const sellerBrandGet = `${url}/seller/brand/get`;
// Seller inventory
export const insertProductInventory = `${url}/seller/product/inventory/insert`;
export const getProductInventory = `${url}/seller/product/inventory/get`;
export const deleteProductInventory = `${url}/seller/product/inventory/delete`;
export const getProductVariations = `${url}/seller/product/inventory/variation`;
// Seller Vehicle
export const insertSellerVehicle = `${url}/seller/vehicle/insert`;
export const getVehicleVideo = `${url}/seller/vehicle/video/get`;
export const insertVehicleVideo = `${url}/seller/vehicle/video/insert`;
export const insertVehicleFeatures = `${url}/seller/vehicle/features`;
export const getSellerVehicle = `${url}/seller/vehicle/get`;
export const updateVehicleStatus = `${url}/seller/vehicle/status`;
export const getVehicleInfo = `${url}/seller/vehicle/info`;
export const getVehicleFiles = `${url}/seller/vehicle/files/get`;
export const insertVehicleFiles = `${url}/seller/vehicle/files/insert`;
export const deleteVehicleFiles = `${url}/seller/vehicle/files/delete`;
export const sellerVehicleEdit = `${url}/seller/vehicle/edit`;
// Seller Property
export const addSellerProperty = `${url}/seller/property/insert`;
export const insertSellerPropertyVideo = `${url}/seller/property/video/insert`;
export const getSellerPropertyVideo = `${url}/seller/property/video/get`;
export const getSellerProperty = `${url}/seller/property/get`;
export const updateSellerPropertyStatus = `${url}/seller/property/status`;
export const insertSellerPropertyFiles = `${url}/seller/property/files/insert`;
export const deleteSellerPropertyFile = `${url}/seller/property/files/delete`;
export const getSellerPropertyFiles = `${url}/seller/property/files/get`;
export const getSellerPropertyinfo = `${url}/seller/property/info`;
export const editSellerProperty = `${url}/seller/property/edit`;
export const deleteSellerProperty = `${url}/seller/property/delete`;
export const insertSellerPropertyAmenities = `${url}/seller/property/amenities`;
// Seller Streaming
export const createSellerStreaming = `${url}/seller/streaming/insert`;
export const getStreamingProducts = `${url}/seller/streaming/get/product`;
export const addStreamingProducts = `${url}/seller/streaming/insert/product`;
export const getSellerStreaming = `${url}/seller/streaming/get`;
export const getSellerStreamingInfo = `${url}/seller/streaming/info`;
// Seller Support
export const insertSellerSupport = `${url}/seller/support/insert`;
export const getSellerSupport = `${url}/seller/support/get`;
// Seller Follow
export const getSellerFollow = `${url}/seller/follow/get`;
// Reseller Products
export const getResellerProducts = `${url}/reseller/product/get`;
export const insertResellerProducts = `${url}/reseller/product/insert`;
export const resellerupdateProductVideo = `${url}/reseller/product/video/insert`;
export const getResellerProductVideo = `${url}/reseller/product/video/get`;
export const getResellerProductFiles = `${url}/reseller/product/files/get`;
export const insertResellerProductFiles = `${url}/reseller/product/files/insert`;
export const deleteResellerProductFiles = `${url}/reseller/product/files/delete`;
export const getResellerProductInfo = `${url}/reseller/product/info`;
export const editResellerProduct = `${url}/reseller/product/edit`;
export const updateResellerProductStatus = `${url}/reseller/product/status`;
export const deleteResellerProduct = `${url}/reseller/product/delete`;

// Reseller inventory
export const resellerInsertProductInventory = `${url}/reseller/product/inventory/insert`;
export const resellerGetProductInventory = `${url}/reseller/product/inventory/get`;
export const resellerDeleteProductInventory = `${url}/reseller/product/inventory/delete`;
// Reseller Support
export const insertResellerSupport = `${url}/reseller/support/insert`;
export const getResellerSupport = `${url}/reseller/support/get`;
// Reseller Follow
export const getResellerFollow = `${url}/reseller/follow/get`;
// Reseller Streaming
export const createResellerStreaming = `${url}/reseller/streaming/insert`;
export const getResellerStreamingProducts = `${url}/reseller/streaming/get/product`;
export const addResellerStreamingProducts = `${url}/reseller/streaming/insert/product`;
export const getResellerStreaming = `${url}/reseller/streaming/get`;
export const getResellerStreamingInfo = `${url}/reseller/streaming/info`;

// Common Apis
// Locations
export const getCountries = `${url}/country`;
export const getState = `${url}/state`;
export const getCity = `${url}/city`;
// Categories
export const getCategories = `${url}/category`;
export const getSubCategories = `${url}/subcategory`;
// Brands
export const getbrands = `${url}/brand`;
// Vehicle
export const getMakes = `${url}/make`;
export const getModel = `${url}/model`;
// Property
export const getPropertyType = `${url}/type`;
export const getPropertySubType = `${url}/subtype`;

// Product
export const getProduct = `${url}/product`;
export const getProductDetails = `${url}/product/detail`;

// Wishlist
export const updateWishlist = `${url}/user/wishlist/insert`;
export const getWishlist = `${url}/user/wishlist/get`;

// Follow
export const followApi = `${url}/follow`;

// Cart
export const checkCart = `${url}/cart/check`;
export const insertCart = `${url}/cart/insert`;
export const getCart = `${url}/cart/get`;
export const deleteCartItem = `${url}/cart/delete`;

// Shop
export const getShops = `${url}/seller`;
export const shopDetail = `${url}/seller/detail`;
//Vehicle
export const getVehicleDetail = `${url}/vehicle/detail`;
export const getVehicles = `${url}/vehicle`;

// Reseller
export const getResellers = `${url}/reseller`;
export const getResellerDetial = `${url}/reseller/detail`;
//Property
export const getProperty = `${url}/property`;
export const getPropertyDetail = `${url}/property/detail`;

// Hire Form
export const insertHireForm = `${url}/user/hire/insert`;
export const getUserHireRequests = `${url}/user/hire/get`;
export const getUserHireDetails = `${url}/user/hire/detail`;

export const getHireRequests = `${url}/reseller/hire/get`;
export const getHireDetails = `${url}/reseller/hire/detail`;
export const getHireinfo = `${url}/reseller/hire/info`;
export const updateHireStatus = `${url}/reseller/hire/status`;

// Home
export const getHomeData = `${url}/home/get`;
//Search

export const homeSearch = `${url}/search`;
// contact us
export const insertContactData = `${url}/contact/insert`;
// Streaming
export const getStreamings = `${url}/streaming`;
export const getStreamingDetail = `${url}/streaming/detail`;

// Insert Review
export const insertReview = `${url}/review/insert`;
// Like Insert
export const insertLike = `${url}/like/insert`;
// Switch Profile
export const switchProfile = `${url}/profile`;

export const imgUrl = "http://192.168.0.110:1000";
// export const imgUrl = "https://api.viewnshop.com";
// export const imgUrl = "https://vshop-api.digitalelliptical.com";
// export const imgUrl = "https://vshop-apis.elliptical.website";

// PICTURES ROUTES
export const logoRoute = `${imgUrl}/uploads/shop/logo`;
export const bannerRoute = `${imgUrl}/uploads/shop/cover`;
export const frontCnicRoute = `${imgUrl}/uploads/seller/cnic/front`;
export const BackCnicRoute = `${imgUrl}/uploads/seller/cnic/back`;
export const SellerProfile = `${imgUrl}/uploads/seller/profile`;
export const userProfile = `${imgUrl}/uploads/user/profile`;

export const productVideoRoute = `${imgUrl}/uploads/shop/product/video`;
export const productThumbnailRoute = `${imgUrl}/uploads/shop/product/thumbnail`;
export const productFilesRoute = `${imgUrl}/uploads/shop/product/file`;

export const UserHireImagesRoute = `${imgUrl}/uploads/user/hire/images`;
export const streamingThumbnail = `${imgUrl}/uploads/streaming/thumbnail`;

export const resellerProfileRoute = `${imgUrl}/uploads/reseller/profile`;
export const resellerBackCnicRoute = `${imgUrl}/uploads/reseller/cnic/back`;
export const resellerFrontCnicRoute = `${imgUrl}/uploads/reseller/cnic/front`;

export const supportFile = `${imgUrl}/uploads/support/file`;

export const categoryIcon = `${imgUrl}/uploads/category/web/icon`;
export const categoryBanner = `${imgUrl}/uploads/category/banner`;
export const subcategoryBanner = `${imgUrl}/uploads/subcategory/banner`;
export const subcategoryIcon = `${imgUrl}/uploads/subcategory/icon`;

export const brandLogoRoute = `${imgUrl}uploads/brand/logo`;

export const vehicleVideoRoute = `${imgUrl}/uploads/vehicle/video`;
export const vehicleThumbnailRoute = `${imgUrl}/uploads/vehicle/thumbnail`;
export const vehicleFilesRoute = `${imgUrl}/uploads/vehicle/file`;

export const propertyVideoRoute = `${imgUrl}/uploads/property/video`;
export const propertyThumbnailRoute = `${imgUrl}/uploads/property/thumbnail`;
export const propertyFilesRoute = `${imgUrl}/uploads/property/file`;
