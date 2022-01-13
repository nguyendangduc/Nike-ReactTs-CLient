import "./App.css";
import { useEffect, useState, createContext } from "react";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail";
import NavBar from "./components/NavBar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import {
  checkItemsInCart,
  getLocalStorage,
} from "./services/functions/getLocalstorage";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import AppNike from "./pages/AppNike";
import { getProducts } from "./services/apis/functions/productsApi";
import { OrdersHistory } from "./pages/OrderHistory";
import { Profile } from "./pages/profile/Profile";
import { SettingUpdate } from "./pages/settingUpdate/SettingUpdate";
import { authByToken } from "./services/apis";
import {
  useAppDispatch,
  userFetchError,
  userFetchSuccess,
} from "./services/store";
import Admin from "./pages/admin/Admin";
import { Checkout } from "./components/cart/Checkout";

export const ContextElement = createContext("") as any;

const REACT_APP_LIMIT_PER_PAGE = "10";

function App() {
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortInput, setSortInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pageLimit, setPageLimit] = useState(REACT_APP_LIMIT_PER_PAGE);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  const [itemsInCart, setItemsInCart] = useState(checkItemsInCart());
  const [addItemToCartMessage, setAddItemToCartMessage] = useState(false);

  let { dataUser } = useSelector((state: any) => state.authReducer);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      authByToken()
        .then((res: any) => {
          dispatch(userFetchSuccess(res.data));
        })
        .catch((err: any) =>
          dispatch(userFetchError(err.response.data.message))
        );
    }


  }, []);
  useEffect(() => {
    let sortUrl = sortInput !== "" ? `/sort/price/${sortInput}` : "";
    let paginationUrl = "/page/" + currentPage + "/" + pageLimit;
    let searchUrl = searchInput !== "" ? "/search/" + searchInput : "";
    let categoryUrl =
      category !== "" && category !== "All" ? `/type/${category}` : "";
    const path = categoryUrl + searchUrl + sortUrl + paginationUrl;
    if (sortInput !== null || searchInput !== null || category !== null) {
      getProducts(path)
        .then((response) => {
          setLoading(true);
          setTotalProducts(Number(response.data.totalRecords));
          return response.data;
        })
        .then((data) => {
          setLoading(false);
          setProducts(data.results);
        })
        .catch((error) => console.log(error));
    }
  }, [sortInput, currentPage, searchInput, pageLimit, category]);

  return (
    <>
      <ContextElement.Provider
        value={{
          itemsInCart,
          setItemsInCart,
          addItemToCartMessage,
          setAddItemToCartMessage,
        }}
      >
        <Router>
          <NavBar />

          <Switch>
            <Route path="/login" children={<Login />} />
            <Route path="/register" children={<Register />} />

            <Route exact path="/cart" children={<Cart />} />
            <Route path="/cart/checkout" children={<Checkout />} />

            <Route path="/ordershistory" children={<OrdersHistory />} />
            <Route path="/profile" children={<Profile />} />
            <Route path="/update" children={<SettingUpdate />} />

            <Route path="/app" children={<AppNike />} />

            <Route
              path="/products/:id"
              children={<ProductDetail products={products} loading={loading} />}
            />

            <Route
              path="/products"
              children={
                <Products
                  setSortInput={setSortInput}
                  products={products}
                  totalProducts={totalProducts}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageLimit={pageLimit}
                  setPageLimit={setPageLimit}
                  loading={loading}
                  setSearchInput={setSearchInput}
                  setCategory={setCategory}
                  category={category}
                />
              }
            />

            <Route path="/admin" children={<Admin />} />
            <Route
              path="/"
              children={
                <Home
                // setSortInput={setSortInput}
                // products={products}
                // totalProducts={totalProducts}
                // currentPage={currentPage}
                // setCurrentPage={setCurrentPage}
                // pageLimit={pageLimit}
                // setPageLimit={setPageLimit}
                // loading={loading}
                />
              }
            />
          </Switch>
        </Router>
      </ContextElement.Provider>
      <Footer />
    </>
  );
}

export default App;
