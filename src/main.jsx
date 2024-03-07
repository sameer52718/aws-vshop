import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./hooks/useAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "../src/assets/scss/app.scss";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./store";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "aos/dist/aos.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "swiper/css/pagination";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="241194490668-mdh9mir76io61pfcu33b89d4ar9edm7g.apps.googleusercontent.com">
        <AuthProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </>
);
