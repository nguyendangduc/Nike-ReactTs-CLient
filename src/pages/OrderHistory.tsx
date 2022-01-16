import { useEffect, useState } from "react";
import { NavBarProfile } from "../components/NavBarProfile";
import { Order } from "../components/ordersHistory/Order";
import { getOrders } from "../services/apis/functions/ordersApi";
import { useAppSelector } from "../services/store";
import AuthenticatedGuard from "../components/auth/authentication/authenticatedGuard/AuthenticatedGuard";
let rules = ["user"];

export const OrdersHistory = () => {
  const { dataUser } = useAppSelector((state) => state.authReducer);
  const [orders, setOrders] = useState([] as IOrder[]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([] as IOrder[]);

  useEffect(() => {
    if (dataUser) {
      getOrders(dataUser.id)
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  useEffect(() => {
    const arr = orders.filter((order) =>
      order.productName.toLowerCase().includes(search)
    );
    setFilters(arr);
  }, [search]);

  return (
    <AuthenticatedGuard routeRules={rules}>
      <div className="container my-3">
        <NavBarProfile />
        <input
          type="text"
          className="form-control search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search === "" ? (
          orders.length > 0 ? (
            orders.map((order) => <Order key={order.id} order={order} />)
          ) : (
            <div className="mt-3">History empty</div>
          )
        ) : filters.length > 0 ? (
          filters.map((order) => <Order key={order.id} order={order} />)
        ) : (
          <div className="mt-3">Empty</div>
        )}
      </div>
    </AuthenticatedGuard>
  );
};
