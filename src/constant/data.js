export const hiringStatus = {
  all: { name: "all", status: null },
  pending: { name: "pending", status: 0 },
  accepted: { name: "accepted", status: 1 },
  rejected: { name: "rejected", status: 2 },
  deleted: { name: "deleted", status: 3 },
  working: { name: "working", status: 4 },
};
export const likeContentType= {
streming:1
}
export const profileSwitchTypes = {
  user:"user",
  seller:"seller",
  reseller:"reseller"
}

export const menuItems = [
  {
    isHeadr: true,
    title: "menu",
  },

  {
    title: "Dashboard",
    icon: "heroicons-outline:home",
    link: "/dashboard/user/home",
  },
  {
    title: "Profile",
    icon: "clarity:avatar-line",
    link: "/dashboard/user/profile",
  },
  {
    title: "Orders",
    icon: "lets-icons:order-fill",
    link: "/dashboard/user/order",
  },
  {
    title: "Wishlist",
    icon: "mdi:heart-outline",
    link: "/dashboard/user/wishlist",
  },
  {
    title: "Products",
    icon: "icon-park-outline:ad-product",
    link: "/dashboard/user/product",
  },
  {
    title: "My Resellers",
    icon: "ep:avatar",
    isOpen: true,
    isHide: true,
    child: [
      {
        childtitle: "All",
        childlink: `/dashboard/user/hire/${hiringStatus.all.name}`,
      },
      {
        childtitle: "On Working",
        childlink: `/dashboard/user/hire/${hiringStatus.working.name}`,
      },
      {
        childtitle: "Pending",
        childlink: `/dashboard/user/hire/${hiringStatus.pending.name}`,
      },
      {
        childtitle: "Accepted",
        childlink: `/dashboard/user/hire/${hiringStatus.accepted.name}`,
      },
      {
        childtitle: "Rejected",
        childlink: `/dashboard/user/hire/${hiringStatus.rejected.name}`,
      },
    ],
  },
  {
    title: "Chat",
    icon: "humbleicons:chat",
    link: "/dashboard/user/chat",
  },
  {
    title: "Following",
    icon: "mingcute:user-follow-2-line",
    link: "/dashboard/user/follow",
  },
  {
    title: "Settings",
    icon: "material-symbols:settings-outline",
    link: "/dashboard/user/settings",
  },
  {
    title: "Support",
    icon: "ic:baseline-support-agent",
    link: "/dashboard/user/support",
  },
];
export const sellerMenuItems = [
  {
    isHeadr: true,
    title: "menu",
  },

  {
    title: "Dashboard",
    icon: "heroicons-outline:home",
    link: "/dashboard/seller/home",
  },
  {
    title: "Categories",
    icon: "material-symbols-light:category-rounded",
    link: "/dashboard/seller/category",
  },
  {
    title: "Products",
    icon: "icon-park-outline:ad-product",
    link: "/dashboard/seller/product",
    restricted: true,
  },
  {
    title: "Inventory",
    icon: "material-symbols-light:inventory-2-outline-rounded",
    link: "/dashboard/seller/inventory",
    restricted: true,
  },

  {
    title: "Vehicle",
    icon: "ion:car-sport-outline",
    link: "/dashboard/seller/vehicle",
  },
  {
    title: "Property",
    icon: "ic:outline-real-estate-agent",
    link: "/dashboard/seller/property",
  },
  {
    title: "Orders",
    icon: "lets-icons:order-fill",
    link: "/dashboard/seller/order",
  },
  {
    title: "Streaming",
    icon: "material-symbols:package-outline",
    link: "/dashboard/seller/streaming",
  },
  {
    title: "Brand",
    icon: "fluent-mdl2:verified-brand",
    link: "/dashboard/seller/brand",
  },
  {
    title: "Chat",
    icon: "humbleicons:chat",
    link: "/dashboard/seller/chat",
  },
  {
    title: "Following",
    icon: "mingcute:user-follow-2-line",
    link: "/dashboard/seller/follow",
  },
  {
    title: "Settings",
    icon: "material-symbols:settings-outline",
    link: "/dashboard/seller/setting",
  },
  {
    title: "Support",
    icon: "ic:baseline-support-agent",
    link: "/dashboard/seller/support",
  },
];

export const resellerMenuItems = [
  {
    isHeadr: true,
    title: "menu",
  },

  {
    title: "Dashboard",
    icon: "heroicons-outline:home",
    link: "/dashboard/reseller/home",
  },
  {
    title: "Products",
    icon: "icon-park-outline:ad-product",
    link: "/dashboard/reseller/product",
  },
  {
    title: "Inventory",
    icon: "material-symbols-light:inventory-2-outline-rounded",
    link: "/dashboard/reseller/inventory",
  },
  {
    title: "Product Providers",
    icon: "ep:avatar",
    isOpen: true,
    isHide: true,
    child: [
      {
        childtitle: "All",
        childlink: `/dashboard/reseller/hire/${hiringStatus.all.name}`,
      },
      {
        childtitle: "On Working",
        childlink: `/dashboard/reseller/hire/${hiringStatus.working.name}`,
      },
      {
        childtitle: "Pending",
        childlink: `/dashboard/reseller/hire/${hiringStatus.pending.name}`,
      },
      {
        childtitle: "Accepted",
        childlink: `/dashboard/reseller/hire/${hiringStatus.accepted.name}`,
      },
      {
        childtitle: "Rejected",
        childlink: `/dashboard/reseller/hire/${hiringStatus.rejected.name}`,
      },
    ],
  },
  {
    title: "Streaming",
    icon: "material-symbols:package-outline",
    link: "/dashboard/reseller/streaming",
  },
  {
    title: "Chat",
    icon: "humbleicons:chat",
    link: "/dashboard/reseller/chat",
  },
  {
    title: "Following",
    icon: "mingcute:user-follow-2-line",
    link: "/dashboard/reseller/follow",
  },
  {
    title: "Settings",
    icon: "material-symbols:settings-outline",
    link: "/dashboard/reseller/setting",
  },
  {
    title: "Support",
    icon: "ic:baseline-support-agent",
    link: "/dashboard/reseller/support",
  },
];

export const topMenu = [
  {
    title: "Dashboard",
    icon: "heroicons-outline:home",
    link: "/app/home",
    child: [
      {
        childtitle: "Analytics Dashboard",
        childlink: "dashboard",
        childicon: "heroicons:presentation-chart-line",
      },
      {
        childtitle: "Ecommerce Dashboard",
        childlink: "ecommerce",
        childicon: "heroicons:shopping-cart",
      },
      {
        childtitle: "Project  Dashboard",
        childlink: "project",
        childicon: "heroicons:briefcase",
      },
      {
        childtitle: "CRM Dashboard",
        childlink: "crm",
        childicon: "ri:customer-service-2-fill",
      },
      {
        childtitle: "Banking Dashboard",
        childlink: "banking",
        childicon: "heroicons:wrench-screwdriver",
      },
    ],
  },
  {
    title: "App",
    icon: "heroicons-outline:chip",
    link: "/app/home",
    child: [
      {
        childtitle: "Calendar",
        childlink: "calender",
        childicon: "heroicons-outline:calendar",
      },
      {
        childtitle: "Kanban",
        childlink: "kanban",
        childicon: "heroicons-outline:view-boards",
      },
      {
        childtitle: "Todo",
        childlink: "todo",
        childicon: "heroicons-outline:clipboard-check",
      },
      {
        childtitle: "Projects",
        childlink: "projects",
        childicon: "heroicons-outline:document",
      },
    ],
  },
  {
    title: "Pages",
    icon: "heroicons-outline:view-boards",
    link: "/app/home",
    megamenu: [
      {
        megamenutitle: "Authentication",
        megamenuicon: "heroicons-outline:user",
        singleMegamenu: [
          {
            m_childtitle: "Signin One",
            m_childlink: "/",
          },
          {
            m_childtitle: "Signin Two",
            m_childlink: "/login2",
          },
          {
            m_childtitle: "Signin Three",
            m_childlink: "/login3",
          },
          {
            m_childtitle: "Signup One",
            m_childlink: "/register",
          },
          {
            m_childtitle: "Signup Two",
            m_childlink: "/register/register2",
          },
          {
            m_childtitle: "Signup Three",
            m_childlink: "/register/register3",
          },
          {
            m_childtitle: "Forget Password One",
            m_childlink: "/forgot-password",
          },
          {
            m_childtitle: "Forget Password Two",
            m_childlink: "/forgot-password2",
          },
          {
            m_childtitle: "Forget Password Three",
            m_childlink: "/forgot-password3",
          },
          {
            m_childtitle: "Lock Screen One",
            m_childlink: "/lock-screen",
          },
          {
            m_childtitle: "Lock Screen Two",
            m_childlink: "/lock-screen2",
          },
          {
            m_childtitle: "Lock Screen Three",
            m_childlink: "/lock-screen3",
          },
        ],
      },

      {
        megamenutitle: "Components",
        megamenuicon: "heroicons-outline:user",
        singleMegamenu: [
          {
            m_childtitle: "typography",
            m_childlink: "typography",
          },
          {
            m_childtitle: "colors",
            m_childlink: "colors",
          },
          {
            m_childtitle: "alert",
            m_childlink: "alert",
          },
          {
            m_childtitle: "button",
            m_childlink: "button",
          },
          {
            m_childtitle: "card",
            m_childlink: "card",
          },
          {
            m_childtitle: "carousel",
            m_childlink: "carousel",
          },
          {
            m_childtitle: "dropdown",
            m_childlink: "dropdown",
          },
          {
            m_childtitle: "image",
            m_childlink: "image",
          },
          {
            m_childtitle: "modal",
            m_childlink: "modal",
          },
          {
            m_childtitle: "Progress bar",
            m_childlink: "progress-bar",
          },
          {
            m_childtitle: "Placeholder",
            m_childlink: "placeholder",
          },

          {
            m_childtitle: "Tab & Accordion",
            m_childlink: "tab-accordion",
          },
        ],
      },
      {
        megamenutitle: "Forms",
        megamenuicon: "heroicons-outline:user",
        singleMegamenu: [
          {
            m_childtitle: "Input",
            m_childlink: "input",
          },
          {
            m_childtitle: "Input group",
            m_childlink: "input-group",
          },
          {
            m_childtitle: "Input layout",
            m_childlink: "input-layout",
          },
          {
            m_childtitle: "Form validation",
            m_childlink: "form-validation",
          },
          {
            m_childtitle: "Wizard",
            m_childlink: "form-wizard",
          },
          {
            m_childtitle: "Input mask",
            m_childlink: "input-mask",
          },
          {
            m_childtitle: "File input",
            m_childlink: "file-input",
          },
          {
            m_childtitle: "Form repeater",
            m_childlink: "form-repeater",
          },
          {
            m_childtitle: "Textarea",
            m_childlink: "textarea",
          },
          {
            m_childtitle: "Checkbox",
            m_childlink: "checkbox",
          },
          {
            m_childtitle: "Radio button",
            m_childlink: "radio-button",
          },
          {
            m_childtitle: "Switch",
            m_childlink: "switch",
          },
        ],
      },
      {
        megamenutitle: "Utility",
        megamenuicon: "heroicons-outline:user",
        singleMegamenu: [
          {
            m_childtitle: "Invoice",
            m_childlink: "invoice",
          },
          {
            m_childtitle: "Pricing",
            m_childlink: "pricing",
          },

          // {
          //   m_childtitle: "Testimonial",
          //   m_childlink: "testimonial",
          // },
          {
            m_childtitle: "FAQ",
            m_childlink: "faq",
          },
          {
            m_childtitle: "Blank page",
            m_childlink: "blank-page",
          },
          {
            m_childtitle: "Blog",
            m_childlink: "blog",
          },
          {
            m_childtitle: "404 page",
            m_childlink: "/404",
          },
          {
            m_childtitle: "Coming Soon",
            m_childlink: "/coming-soon",
          },
          {
            m_childtitle: "Under Maintanance page",
            m_childlink: "/under-construction",
          },
        ],
      },
    ],
  },

  {
    title: "Widgets",
    icon: "heroicons-outline:view-grid-add",
    link: "form-elements",
    child: [
      {
        childtitle: "Basic",
        childlink: "basic",
        childicon: "heroicons-outline:document-text",
      },
      {
        childtitle: "Statistic",
        childlink: "statistic",
        childicon: "heroicons-outline:document-text",
      },
    ],
  },

  {
    title: "Extra",
    icon: "heroicons-outline:template",

    child: [
      {
        childtitle: "Basic Table",
        childlink: "table-basic",
        childicon: "heroicons-outline:table",
      },
      {
        childtitle: "Advanced table",
        childlink: "table-advanced",
        childicon: "heroicons-outline:table",
      },
      {
        childtitle: "Apex chart",
        childlink: "appex-chart",
        childicon: "heroicons-outline:chart-bar",
      },
      {
        childtitle: "Chart js",
        childlink: "chartjs",
        childicon: "heroicons-outline:chart-bar",
      },
      {
        childtitle: "Map",
        childlink: "map",
        childicon: "heroicons-outline:map",
      },
    ],
  },
];

import User1 from "@/assets/images/all-img/user.png";
import User2 from "@/assets/images/all-img/user2.png";
import User3 from "@/assets/images/all-img/user3.png";
import User4 from "@/assets/images/all-img/user4.png";
export const notifications = [
  {
    title: "Your order is placed",
    desc: "Amet minim mollit non deser unt ullamco est sit aliqua.",

    image: User1,
    link: "#",
  },
  {
    title: "Congratulations Darlene  🎉",
    desc: "Won the monthly best seller badge",
    unread: true,
    image: User2,
    link: "#",
  },
  {
    title: "Revised Order 👋",
    desc: "Won the monthly best seller badge",

    image: User3,
    link: "#",
  },
  {
    title: "Brooklyn Simmons",
    desc: "Added you to Top Secret Project group...",

    image: User4,
    link: "#",
  },
];

export const message = [
  {
    title: "Wade Warren",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: true,
    notification_count: 1,
    image: User1,
    link: "#",
  },
  {
    title: "Savannah Nguyen",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: false,
    image: User2,
    link: "#",
  },
  {
    title: "Ralph Edwards",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: true,
    notification_count: 8,
    image: User3,
    link: "#",
  },
  {
    title: "Cody Fisher",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: false,
    image: User4,
    link: "#",
  },
  {
    title: "Savannah Nguyen",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: false,
    image: User2,
    link: "#",
  },
  {
    title: "Ralph Edwards",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: true,
    notification_count: 8,
    image: User3,
    link: "#",
  },
  {
    title: "Cody Fisher",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: false,
    image: User4,
    link: "#",
  },
];

export const colors = {
  primary: "#4669FA",
  secondary: "#A0AEC0",
  danger: "#F1595C",
  black: "#111112",
  warning: "#FA916B",
  info: "#0CE7FA",
  light: "#425466",
  success: "#50C793",
  "gray-f7": "#F7F8FC",
  dark: "#1E293B",
  "dark-gray": "#0F172A",
  gray: "#68768A",
  gray2: "#EEF1F9",
  "dark-light": "#CBD5E1",
};

export const hexToRGB = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};

export const topFilterLists = [
  {
    name: "Inbox",
    value: "all",
    icon: "uil:image-v",
  },
  {
    name: "Starred",
    value: "fav",
    icon: "heroicons:star",
  },
  {
    name: "Sent",
    value: "sent",
    icon: "heroicons-outline:paper-airplane",
  },

  {
    name: "Drafts",
    value: "drafts",
    icon: "heroicons-outline:pencil-alt",
  },
  {
    name: "Spam",
    value: "spam",
    icon: "heroicons:information-circle",
  },
  {
    name: "Trash",
    value: "trash",
    icon: "heroicons:trash",
  },
];

export const bottomFilterLists = [
  {
    name: "personal",
    value: "personal",
    icon: "heroicons:chevron-double-right",
  },
  {
    name: "Social",
    value: "social",
    icon: "heroicons:chevron-double-right",
  },
  {
    name: "Promotions",
    value: "promotions",
    icon: "heroicons:chevron-double-right",
  },
  {
    name: "Business",
    value: "business",
    icon: "heroicons:chevron-double-right",
  },
];

import meetsImage1 from "@/assets/images/svg/sk.svg";
import meetsImage2 from "@/assets/images/svg/path.svg";
import meetsImage3 from "@/assets/images/svg/dc.svg";
import meetsImage4 from "@/assets/images/svg/sk.svg";

export const meets = [
  {
    img: meetsImage1,
    title: "Meeting with client",
    date: "01 Nov 2021",
    meet: "Zoom meeting",
  },
  {
    img: meetsImage2,
    title: "Design meeting (team)",
    date: "01 Nov 2021",
    meet: "Skyp meeting",
  },
  {
    img: meetsImage3,
    title: "Background research",
    date: "01 Nov 2021",
    meet: "Google meeting",
  },
  {
    img: meetsImage4,
    title: "Meeting with client",
    date: "01 Nov 2021",
    meet: "Zoom meeting",
  },
];
import file1Img from "@/assets/images/icon/file-1.svg";
import file2Img from "@/assets/images/icon/pdf-1.svg";
import file3Img from "@/assets/images/icon/zip-1.svg";
import file4Img from "@/assets/images/icon/pdf-2.svg";
import file5Img from "@/assets/images/icon/scr-1.svg";

export const files = [
  {
    img: file1Img,
    title: "Dashboard.fig",
    date: "06 June 2021 / 155MB",
  },
  {
    img: file2Img,
    title: "Ecommerce.pdf",
    date: "06 June 2021 / 155MB",
  },
  {
    img: file3Img,
    title: "Job portal_app.zip",
    date: "06 June 2021 / 155MB",
  },
  {
    img: file4Img,
    title: "Ecommerce.pdf",
    date: "06 June 2021 / 155MB",
  },
  {
    img: file5Img,
    title: "Screenshot.jpg",
    date: "06 June 2021 / 155MB",
  },
];

//  --------------------------------------------------------------------------------- MY DATA ---------------------------------------------------------------------------------
import Product1 from "../assets/images/product/1.png";
import Product2 from "../assets/images/product/2.png";
import Product3 from "../assets/images/product/3.png";
import Product4 from "../assets/images/product/4.png";
import Product5 from "../assets/images/product/5.png";
import Product6 from "../assets/images/product/6.png";
import Product7 from "../assets/images/product/7.png";
import Product8 from "../assets/images/product/8.png";

import Category1 from "../assets/images/categories/1.png";
import Category2 from "../assets/images/categories/2.png";
import Category3 from "../assets/images/categories/3.png";
import Category4 from "../assets/images/categories/4.png";
import Category5 from "../assets/images/categories/5.png";
import Category6 from "../assets/images/categories/6.png";
import Category7 from "../assets/images/categories/7.png";
import Category8 from "../assets/images/categories/8.png";
import Category9 from "../assets/images/categories/9.png";
import Category10 from "../assets/images/categories/10.png";

import Short1 from "../assets/images/shorts/1.jpg";
import Short2 from "../assets/images/shorts/2.webp";
import Short3 from "../assets/images/shorts/3.jfif";
import Short4 from "../assets/images/shorts/4.jfif";
import Short5 from "../assets/images/shorts/5.jfif";
import Short6 from "../assets/images/shorts/6.jfif";
import ShortProfile1 from "../assets/images/avatar/1.jpg";
import ShortProfile2 from "../assets/images/avatar/2.jpg";
import ShortProfile3 from "../assets/images/avatar/3.jpg";
import ShortProfile4 from "../assets/images/avatar/4.jpg";
import ShortProfile5 from "../assets/images/avatar/5.jpg";
import ShortProfile6 from "../assets/images/avatar/3.jpg";

import img1 from "../../src/assets/images/all-img/property1.jpg";
import img2 from "../../src/assets/images/all-img/property2.jpg";

import car1 from "../assets/images/cars/alsvin.png";
import car2 from "../assets/images/cars/fortuner.png";
import car3 from "../assets/images/cars/cultus.png";
import car4 from "../assets/images/cars/civic.jpg";
import car5 from "../assets/images/cars/corrola.jpg";

import brand1 from "../assets/images/brands/addidas.png";
import brand2 from "../assets/images/brands/amazon.png";
import brand3 from "../assets/images/brands/apple.png";
import brand4 from "../assets/images/brands/nike.png";
import brand5 from "../../src/assets/images/brands/gulahmed.png";
import brand6 from "../../src/assets/images/brands/nishat.png";
import brand7 from "../../src/assets/images/brands/khaadi.png";
import brand8 from "../../src/assets/images/brands/dawlence.png";
import brand9 from "../../src/assets/images/brands/itel.jpg";
import brand10 from "../../src/assets/images/brands/techno.png";

import reseller1 from "../assets/images/reseller/1.jpg";
import reseller2 from "../assets/images/reseller/2.jpg";
import reseller3 from "../assets/images/reseller/3.jpg";
import reseller4 from "../assets/images/reseller/4.avif";
import reseller5 from "../assets/images/reseller/5.jpg";
import { resellerDashboardRoutes, sellerDashboardRoutes, userDashboardRoutes } from "./routes";

export const data = [
  {
    img: "https://media.istockphoto.com/id/1519524622/photo/young-woman-with-grandmother-in-nature.webp?b=1&s=170667a&w=0&k=20&c=RZt2yIMcYExvsFhsXZWlWa_tYNbXubzPVmRYFixpXGI=",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1682878077428-5fa306daa68f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2ZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1682175064711-2e2870132d9c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGl2ZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    img: "https://images.unsplash.com/photo-1607968565043-36af90dde238?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGl2ZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    img: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxpdmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1682294457115-d897c49389de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxpdmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    img: "https://images.unsplash.com/photo-1619961602105-16fa2a5465c2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGxpdmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    img: "https://images.unsplash.com/photo-1549342902-be005322599a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGxpdmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1684107939728-b501cc64f126?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGxpdmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1684107936460-3e7a6a2a8828?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGxpdmV8ZW58MHx8MHx8fDA%3D",
  },
];
export const productData = [
  { img: Product1, video: "" },
  { img: Product2, video: "" },
  { img: Product3, video: "" },
  { img: Product4, video: "" },
  { img: Product5, video: "" },
  { img: Product6, video: "" },
  { img: Product7, video: "" },
  { img: Product8, video: "" },
];

export const reseller = [reseller1, reseller2, reseller3, reseller4, reseller5];

export const shops = [brand1, brand2, brand3, brand4];

export const services = [
  {
    id: 1,
    title: "Free Shipping",
    icon: "mdi:truck-outline",
    description: "Free Shipping on Payment",
    status: 1,
    created_at: "2022-09-20T11:07:40.000000Z",
    updated_at: "2022-09-20T11:07:40.000000Z",
  },

  {
    id: 2,
    title: "Secured Payment",
    icon: "fluent:payment-28-regular",
    description: "Secure Card Payments",
    status: 1,
    created_at: "2022-09-20T11:09:50.000000Z",
    updated_at: "2022-09-20T11:09:50.000000Z",
  },
  {
    id: 3,
    title: "Best Quality",
    icon: "ic:sharp-check-circle",
    description: "Best Quality Products",
    status: 1,
    created_at: "2022-09-20T11:10:27.000000Z",
    updated_at: "2022-09-22T07:24:58.000000Z",
  },
  {
    id: 4,
    title: "Return Policy",
    icon: "material-symbols:assignment-return-outline-sharp",
    description: "24 Hours Return Policy",
    status: 1,
    created_at: "2022-09-20T11:08:44.000000Z",
    updated_at: "2022-09-20T11:08:44.000000Z",
  },
];

export const categories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    icon: "fas fa-anchor",
    image: Category1,
  },
  {
    id: 2,
    name: "Game",
    slug: "game",
    icon: "fas fa-gamepad",
    image: Category2,
  },
  {
    id: 3,
    name: "Mobile",
    slug: "mobile",
    icon: "fas fa-mobile-alt",
    image: Category3,
  },
  {
    id: 4,
    name: "Jwellery",
    slug: "jwellery",
    icon: "fas fa-home",
    image: Category4,
  },
  {
    id: 5,
    name: "Babies & Toys",
    slug: "babies-toys",
    icon: "fas fa-basketball-ball",
    image: Category5,
  },
  {
    id: 6,
    name: "Bike",
    slug: "bike",
    icon: "fas fa-bicycle",
    image: Category6,
  },
  {
    id: 7,
    name: "Men's Fasion",
    slug: "mens-fasion",
    icon: "fas fa-street-view",
    image: Category7,
  },
  {
    id: 8,
    name: "Woman Fashion",
    slug: "woman-fashion",
    icon: "fab fa-android",
    image: Category8,
  },
  {
    id: 9,
    name: "Talevision",
    slug: "talevision",
    icon: "fas fa-adjust",
    image: Category9,
  },
  {
    id: 10,
    name: "Accessories",
    slug: "accessories",
    icon: "fas fa-cogs",
    image: Category10,
  },
];

export const shorts = [
  {
    id: 1,
    name: "Sameer Shaikh",
    slug: "electronics",
    icon: "fas fa-anchor",
    imageBg: Short1,
    imageProfile: ShortProfile1,
    follower: 234.4,
  },
  {
    id: 2,
    name: "Khadim Hussain",
    slug: "game",
    icon: "fas fa-gamepad",
    imageBg: Short2,
    imageProfile: ShortProfile2,
    follower: 421.2,
  },
  {
    id: 3,
    name: "Yazdan Shaikh",
    slug: "mobile",
    icon: "fas fa-mobile-alt",
    imageBg: Short3,
    imageProfile: ShortProfile3,
    follower: 514.3,
  },
  {
    id: 4,
    name: "Bilal Ajmery",
    slug: "jwellery",
    icon: "fas fa-home",
    imageBg: Short4,
    imageProfile: ShortProfile4,
    follower: 865.1,
  },
  {
    id: 5,
    name: "Huzaifa Ali",
    slug: "babies-toys",
    icon: "fas fa-basketball-ball",
    imageBg: Short5,
    imageProfile: ShortProfile5,
    follower: 679.8,
  },
  {
    id: 6,
    name: "Haseen Ali",
    slug: "bike",
    icon: "fas fa-bicycle",
    imageBg: Short6,
    imageProfile: ShortProfile6,
    follower: 201.0,
  },
];

export const cars = [
  {
    name: "Changan Alsvin",
    thumbnail: car1,
    price: "45,79,000",
    year: "2020",
    mileage: "19090",
    color: "Blue",
    door: "4",
  },
  {
    name: "Toyota Fortuner",
    thumbnail: car2,
    price: "1,65,25,000",
    year: "2015",
    mileage: "20945",
    color: "Dark Blue",
    door: "6",
  },
  {
    name: "Toyota Corolla",
    thumbnail: car5,
    price: "28,70,000",
    year: "2012",
    mileage: "65398",
    color: "White",
    door: "4",
  },
  {
    name: "Suzuki Cultus",
    thumbnail: car3,
    price: "25,70,00",
    year: "2019",
    mileage: "36876",
    color: "Blue",
    door: "4",
  },
  {
    name: "Honda Civic",
    thumbnail: car4,
    price: "76,50,000",
    year: "2018",
    mileage: "45198",
    color: "White",
    door: "4",
  },
];

export const properties = [img1, img2, img1, img2, img1, img2, img1, img2];
export const brands = [
  brand5,
  brand6,
  brand7,
  brand8,
  brand9,
  brand10,
  brand5,
  brand6,
  brand7,
  brand8,
  brand9,
  brand10,
];

export const StockFrequencyOptions = [
  { id: 1, name: "Weekly" },
  { id: 2, name: "Monthly" },
  { id: 3, name: "No Matter" },
];

export const sortOptions = [
  { id: 1, name: "Price high to low" },
  { id: 2, name: "Price low to high" },
  { id: 3, name: "Rating" },
  { id: 4, name: "Popularity" },
  { id: 5, name: "Newest" },
  { id: 6, name: "Oldest" },
];

export const DashboardLinks = [
  {},
  { link: `/dashboard/user/${userDashboardRoutes.home}`, name: "User Dashboard" },
  { link: `/dashboard/Seller/${sellerDashboardRoutes.home}`, name: "Seller Dashboard" },
  { link: `/dashboard/reseller/${resellerDashboardRoutes.home}`, name: "Reseller Dashboard" },
  { link: "" , name: "Guest" },
];
