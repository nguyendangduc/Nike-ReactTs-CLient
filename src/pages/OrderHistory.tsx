import { useContext, useEffect, useState } from "react";
import { NavBarProfile } from "../components/NavBarProfile";
import { Order } from "../components/ordersHistory/Order";
import {
  getOrders,
  getOrdersByKey,
} from "../services/apis/functions/ordersApi";
import { useAppSelector } from "../services/store";
import AuthenticatedGuard from "../components/auth/authentication/authenticatedGuard/AuthenticatedGuard";
import { ContextElement } from "../App";
let rules = ["user"];

export const OrdersHistory = () => {
  const { dataUser } = useAppSelector((state) => state.authReducer);
  const [orders, setOrders] = useState([] as IOrder[]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  let { setToDashBoard } = useContext(ContextElement);

  useEffect(() => {
    setToDashBoard(false);
    if (dataUser) {
      getOrders(dataUser.id)
        .then((res) => {
          setOrders(res.data);
          setCurrentPage(1);
        })
        .catch((err) => console.error(err));
    }
  }, [search]);

  let totalOrders = orders.length;

  let limit = 3;

  let totalPage = Math.ceil(totalOrders / limit);
  let totalPageArr = [];
  for (let i = 0; i < totalPage; i++) {
    totalPageArr.push(i + 1);
  }

  function handlePrev() {
    currentPage > 1
      ? setCurrentPage(Number(currentPage) - 1)
      : setCurrentPage(1);
  }

  function handleNext() {
    currentPage < totalPage
      ? setCurrentPage(Number(currentPage) + 1)
      : setCurrentPage(totalPage);
  }

  return (
    <AuthenticatedGuard routeRules={rules}>
      <div className="container my-3">
        <div className="col-8 mx-auto">
          <NavBarProfile />
          <input
            type="text"
            className="form-control search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {orders.length > 0 ? (
            orders.map((order, index) =>
              limit * (currentPage - 1) <= index &&
              index < limit * currentPage ? (
                <Order key={order.id} order={order} />
              ) : null
            )
          ) : (
            <div className="mt-3">History empty</div>
          )}

          {orders.length > 0 ? (
            <ul className="home-pagination">
              <li className="page-item">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1 ? true : false}
                  className="page-item-btn"
                >
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPage ? true : false}
                  className="page-item-btn"
                >
                  Next
                </button>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </AuthenticatedGuard>
  );
};
