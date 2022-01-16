import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../../components/admin/Dashboard";
import Navbar from "../../components/admin/Navbar";
import ProductAddForm from "../../components/admin/ProductAddForm";
import ProductEditForm from "../../components/admin/ProductEditForm";
import { UserEditForm } from "../../components/admin/UserEditForm";
import { UserAddForm } from "../../components/admin/UserAddForm";
import { UserRoles } from "../../components/admin/UserRoles";
import { AccountSetting } from "../../components/admin/AcountSetting";
import { useAppSelector } from "../../services/store";
import AuthenticatedGuard from "../../components/auth/authentication/authenticatedGuard/AuthenticatedGuard";
import { getProducts, getUsersBySearchPage } from "../../services/apis";
import { useLocation } from "react-router-dom";

const rules = ["admin", "product_admin", "user_admin"];

interface Props {
  setToDashBoard: (value: boolean) => void;
}

interface LocationState {
  from: {
    pathname: string;
  };
}

const Admin: React.FC<Props> = ({ setToDashBoard }) => {
  const location = useLocation<LocationState>();

  const { dataUser } = useAppSelector((state) => state.authReducer);

  const [usersList, setUsersList] = useState<Array<User>>([]);
  const [productsList, setProductsList] = useState<Array<Product>>([]);
  const [manageType, setManageType] = useState("");
  const [currentPageAdmin, setCurrentPageAdmin] = useState(1);
  const [totalItemAdmin, setTotalItemAdmin] = useState(0);
  const [searchInputAdmin, setSearchInputAdmin] = useState("");

  const LIMIT_ITEM = 10;

  let totalPage = Math.ceil(totalItemAdmin / 10);
  let totalPageArr = [];
  for (let i = 0; i < totalPage; i++) {
    totalPageArr.push(i + 1);
  }

  useEffect(() => {
    if (
      dataUser?.rules.includes("admin") ||
      dataUser?.rules.includes("user_admin")
    ) {
      setManageType("user");
    } else if (dataUser?.rules.includes("product_admin")) {
      setManageType("product");
    }
  }, [dataUser]);
  useEffect(() => {
    if (manageType === "user") {
      setTotalItemAdmin(usersList.length);
      let paginationUrl = "/page/0/" + LIMIT_ITEM;
      getUsersBySearchPage(paginationUrl)
        .then((res) => {
          setUsersList(res.data.results);
          setTotalItemAdmin(res.data.totalRecords);
        })
        .catch((err) => console.log(err.response.data.message));
    } else if (manageType === "product") {
      setTotalItemAdmin(productsList.length);
      let paginationUrl = "/page/0/" + LIMIT_ITEM;
      getProducts(paginationUrl)
        .then((res) => {
          setProductsList(res.data.results);
          setTotalItemAdmin(res.data.totalRecords);
        })
        .catch((err) => console.log(err.response.data.message));
    }
  }, [manageType, location.pathname]);

  useEffect(() => {
    if (manageType === "product") {
      let paginationUrl =
        "/page/" +
        (currentPageAdmin - 1) * Number(LIMIT_ITEM) +
        "/" +
        LIMIT_ITEM;

      let searchUrl =
        searchInputAdmin !== "" ? "/search/" + searchInputAdmin : "";

      const path = searchUrl + paginationUrl;

      getProducts(path)
        .then((res) => {
          setProductsList(res.data.results);
          setTotalItemAdmin(res.data.totalRecords);
        })
        .catch((err) => console.log(err.response.data.message));
    } else if (manageType === "user") {
      //Duc code here
      let paginationUrl =
        "/page/" +
        (currentPageAdmin - 1) * Number(LIMIT_ITEM) +
        "/" +
        LIMIT_ITEM;

      let searchUrl =
        searchInputAdmin !== "" ? "/search/" + searchInputAdmin : "";

      const path = searchUrl + paginationUrl;

      getUsersBySearchPage(path)
        .then((res) => {
          setUsersList(res.data.results);
          setTotalItemAdmin(res.data.totalRecords);
        })
        .catch((err) => console.log(err.response.data.message));
    }
  }, [currentPageAdmin, searchInputAdmin, manageType]);

  useEffect(() => {
    setToDashBoard(true);
  }, []);

  return (
    <AuthenticatedGuard routeRules={rules}>
      <Navbar
        manageType={manageType}
        setManageType={setManageType}
        setToDashBoard={setToDashBoard}
      />

      <h1 className="text-center mb-4">Admin Dashboard</h1>

      <Switch>
        <Route exact path="/admin/addproduct" children={<ProductAddForm />} />
        <Route
          exact
          path="/admin/editproduct/:id"
          children={
            <ProductEditForm
              productsList={productsList}
              setProductsList={setProductsList}
            />
          }
        />
        <Route exact path="/admin/adduser" children={<UserAddForm />} />
        <Route
          exact
          path="/admin/setting/profile/:id"
          children={<UserEditForm usersList={usersList} />}
        />
        <Route
          exact
          path="/admin/setting/roles/:id"
          children={<UserRoles usersList={usersList} />}
        />
        <Route
          exact
          path="/admin/setting/account/:id"
          children={<AccountSetting usersList={usersList} />}
        />
        <Route
          exact
          path="/admin"
          children={
            <Dashboard
              setUsersList={setUsersList}
              setSearchInputAdmin={setSearchInputAdmin}
              manageType={manageType}
              usersList={usersList}
              productsList={productsList}
              setProductsList={setProductsList}
              currentPageAdmin={currentPageAdmin}
              setCurrentPageAdmin={setCurrentPageAdmin}
              totalPage={totalPage}
              totalPageArr={totalPageArr}
            />
          }
        />
      </Switch>
    </AuthenticatedGuard>
  );
};

export default Admin;
