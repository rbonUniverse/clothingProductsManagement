import interceptorService from "./Services/InterceptorService";
import Layout from "./Components/LayoutArea/Layout/Layout";
import { productsStore } from "../src/Redux/ClothingProductsState";
import { authStore } from "../src/Redux/AuthState";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";

interceptorService.createInterceptor();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={authStore}>
    <Provider store={productsStore}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
