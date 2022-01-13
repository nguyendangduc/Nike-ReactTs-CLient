import React, { useEffect, useState } from "react";
import AuthenticatedGuard from "../../components/auth/authentication/authenticatedGuard/AuthenticatedGuard";
import {
  getAllProducts,
  getUsers,
} from "../../services/apis/functions/adminApi";
import style from "./Admin.module.scss";

const rules = ["admin"];

interface Props {
  setToDashBoard: (value: boolean) => void;
  products: Array<Product>;
}

const Admin: React.FC<Props> = ({ setToDashBoard, products }) => {
  const [usersList, setUsersList] = useState<Array<User>>([]);
  const [productsList, setProductsList] = useState<Array<Product>>([]);
  const [manageType, setManageType] = useState("user");

  useEffect(() => {
    setToDashBoard(true);
    getUsers()
      .then((res) => {
        setUsersList(res.data);
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
      <nav className="admin">
        <div className="admin-sidebar mt-4">
          <span
            className={`mb-3 ${style.admin_sidebar_item}`}
            onClick={() => setManageType("user")}
          >
            User
          </span>
          <span
            className={`mb-3 ${style.admin_sidebar_item}`}
            onClick={() => setManageType("product")}
          >
            Product
          </span>
        </div>
      </nav>

      <div className="container mt-4">
        <h1 className="text-center mb-4">Admin Dashboard</h1>

        {manageType === "user" ? (
          <table className="table table-striped table-hover">
            <thead className="table-dark ">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Address</th>
                <th scope="col">City</th>
                <th scope="col">Avatar</th>
                <th scope="col">Phone number</th>
                <th scope="col">Rules</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {usersList ? (
                usersList.map((user) => {
                  return (
                    <tr key={user.id}>
                      <th scope="row">{user.id}</th>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>{user.address.address}</td>
                      <td>{user.address.city}</td>
                      <td>{user.avatar}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.rules}</td>
                      <td>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            type="button"
                            className="btn btn-outline-dark"
                          >
                            Edit
                          </button>
                          <button type="button" className="btn btn-dark">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
        ) : (
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Color</th>
                <th scope="col">Thumbnail</th>
                <th scope="col">Detail Image</th>
                <th scope="col">Color Image</th>
                <th scope="col">Size</th>
                <th scope="col">Type</th>
                <th scope="col">Gender</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {productsList ? (
                productsList.map((product) => {
                  return (
                    <tr key={product.id}>
                      <th scope="row">{product.id}</th>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.color}</td>
                      <td>{`${product.thumbnail.substring(0, 20)}...`}</td>
                      <td>
                        {product.detailimg.map((url: string) => {
                          return <p>{`${url.substring(0, 20)}...`}</p>;
                        })}
                      </td>
                      <td>
                        {product.colorimg.map((url: string) => {
                          return <p>{`${url.substring(0, 20)}...`}</p>;
                        })}
                      </td>
                      <td>
                        {product.size.map((size: string) => {
                          return <p>{size}</p>;
                        })}
                      </td>
                      <td>{product.type}</td>
                      <td>{product.gender}</td>
                      <td>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            type="button"
                            className="btn btn-outline-dark"
                          >
                            Edit
                          </button>
                          <button type="button" className="btn btn-dark">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
        )}
      </div>
    </AuthenticatedGuard>
  );
};

export default Admin;
