import "./App.css";
import { useEffect, useState, createContext } from "react";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Login from "./pages/login/Login";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import NavBar from "./components/NavBar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import { checkItemsInCart } from "./Utils";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import AppNike from "./pages/AppNike";
import { getProducts } from "./services/apis";
export const ContextElement = createContext("") as any;

const REACT_APP_LIMIT_PER_PAGE = 10;
function App() {
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
            <Route path="/cart" children={<Cart />} />

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
