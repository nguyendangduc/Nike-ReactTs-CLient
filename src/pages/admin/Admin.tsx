import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../../components/admin/Dashboard";
import Navbar from "../../components/admin/Navbar";
import Pagination from "../../components/admin/Pagination";
import ProductForm from "../../components/admin/ProductForm";
import ProductsList from "../../components/admin/ProductsList";
import UserList from "../../components/admin/UsersList";
import AuthenticatedGuard from "../../components/auth/authentication/authenticatedGuard/AuthenticatedGuard";
import { getProducts } from "../../services/apis";
import {
  getAllProducts,
  getUsers,
} from "../../services/apis/functions/adminApi";
import style from "./Admin.module.scss";

const rules = ["admin"];

interface Props {
  setToDashBoard: (value: boolean) => void;
}

const Admin: React.FC<Props> = ({ setToDashBoard }) => {
  const [usersList, setUsersList] = useState<Array<User>>([]);
  const [productsList, setProductsList] = useState<Array<Product>>([]);
  const [manageType, setManageType] = useState("user");
  const [currentPageAdmin, setCurrentPageAdmin] = useState(1);
  const [totalItemAdmin, setTotalItemAdmin] = useState(0);
  const [searchInputAdmin, setSearchInputAdmin] = useState("");

  const LIMIT_ITEM = 10;

  //calculate total page
  let totalPage = Math.ceil(totalItemAdmin / 10);
  //create array inclue total page number
  let totalPageArr = [];
  for (let i = 0; i < totalPage; i++) {
    totalPageArr.push(i + 1);
  }

  useEffect(() => {
    if (manageType === "user") {
      setTotalItemAdmin(usersList.length);
      //Duc code here
    } else {
      setTotalItemAdmin(productsList.length);

      let paginationUrl = "/page/0/" + LIMIT_ITEM;

      getProducts(paginationUrl)
        .then((res) => {
          setProductsList(res.data.results);
          setTotalItemAdmin(res.data.totalRecords);
        })
        .catch((err) => console.log(err));
    }
  }, [manageType]);

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
        .catch((err) => console.log(err));
    } else {
      //Duc code here
    }
  }, [currentPageAdmin, searchInputAdmin]);

  useEffect(() => {
    setToDashBoard(true);

    getUsers()
      .then((res) => {
        setUsersList(res.data);
        setTotalItemAdmin(res.data.length);
      })
      .catch((err) => console.log(err));

    getAllProducts()
      .then((res) => {
        setProductsList(res.data);
      })
      .catch((err) => console.log(err));
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
        <Route exact path="/admin/addproduct" children={<ProductForm />} />

        {/* <Route exact path="/admin/adduser" children={<UsertForm />} /> */}

        <Route
          path="/admin"
          children={
            <Dashboard
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
