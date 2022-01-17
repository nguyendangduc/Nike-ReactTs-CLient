import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail";
import NavBar from "./components/NavBar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import AppNike from "./pages/appNike/AppNike";
import { getProducts } from "./services/apis/functions/productsApi";
import { OrdersHistory } from "./pages/OrderHistory";
import { Profile } from "./pages/profile/Profile";
import { SettingUpdate } from "./pages/settingUpdate/SettingUpdate";
import { authByToken, getCarts } from "./services/apis";
import {
  logoutSuccess,
  useAppDispatch,
  useAppSelector,
  userFetchError,
  userFetchSuccess,
} from "./services/store";
import Admin from "./pages/admin/Admin";
import { Checkout } from "./components/cart/Checkout";

export const ContextElement = createContext("") as any;

const REACT_APP_LIMIT_PER_PAGE = "10";

function App() {
  const dispatch = useAppDispatch();
  const { dataUser } = useAppSelector((state) => state.authReducer);
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortInput, setSortInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pageLimit, setPageLimit] = useState(REACT_APP_LIMIT_PER_PAGE);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  const [itemsInCart, setItemsInCart] = useState([] as CartItem[]);
  useEffect(() => {
    if (dataUser) {
      if (localStorage.getItem("token")) {
        getCarts(dataUser.id)
          .then((res) => setItemsInCart(res.data))
          .catch((err) => {
            if (err?.response?.status === 401) {
              if (localStorage.getItem("token")) {
                localStorage.removeItem("token");
              }
            }
          });
      }
    }
  });

  const [addItemToCartMessage, setAddItemToCartMessage] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [toDashboard, setToDashBoard] = useState(false);

  const [gender, setGender] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      authByToken()
        .then((res) => {
          dispatch(userFetchSuccess(res.data));
          setTimeout(function () {
            dispatch(logoutSuccess())
          },new Date(res.data.expired).getTime() - new Date().getTime())
        })
        .catch((err) => {
          if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
          }
          dispatch(userFetchError(err.response.data.message));
        });
    }
  }, []);

  useEffect(() => {
    let sortUrl = sortInput !== "" ? `/sort/price/${sortInput}` : "";
    let paginationUrl =
      "/page/" + (currentPage - 1) * Number(pageLimit) + "/" + pageLimit;
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
        .catch((error) => console.log(error.response?.data?.message));
    }
  }, [sortInput, currentPage, searchInput, pageLimit, category, gender]);

  useEffect(() => {
    if (dataUser) {
      if (dataUser.rules.includes("admin")) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [dataUser]);

  useEffect(() => {
    let productsClone = [...products];
    productsClone = productsClone.filter((product: Product) => {
      return product.gender === gender;
    });
    // eslint-disable-next-line
    setProducts(productsClone);
    // eslint-disable-next-line
  }, [gender]);

  return (
    <>
      <ContextElement.Provider
        value={{
          itemsInCart,
          setItemsInCart,
          addItemToCartMessage,
          setAddItemToCartMessage,
          setToDashBoard,
        }}
      >
        <Router>
          {!toDashboard ? (
            <NavBar
              isAdmin={isAdmin}
              setToDashBoard={setToDashBoard}
              gender={gender}
              setGender={setGender}
            />
          ) : null}

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
                  gender={gender}
                />
              }
            />

            <Route
              path="/admin"
              children={<Admin setToDashBoard={setToDashBoard} />}
            />
            <Route path="/" children={<Home />} />
          </Switch>
        </Router>
      </ContextElement.Provider>

      {!toDashboard ? <Footer /> : null}
    </>
  );
}

export default App;
