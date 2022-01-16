import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { deleteUser } from "../../services/apis";
import PasswordItem from "../../components/admin/PasswordItem";
interface Props {
  usersList: Array<User>;
  setUsersList: (value: Array<User>) => void;
  setCurrentPageAdmin: (value: number) => void;
}

const UserList: React.FC<Props> = ({
  usersList,
  setUsersList,
  setCurrentPageAdmin,
}) => {
  let listRoles = [
    { id: "admin", name: "Senior administrator" },
    { id: "user", name: "User" },
    { id: "product_admin", name: "Product administrator" },
    { id: "user_admin", name: "User administrator" },
  ];
  function handleDelete(id: number) {
    deleteUser(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    let userListClone = [...usersList];
    userListClone = userListClone.filter((product) => product.id !== id);

    setUsersList(userListClone);
  }

  useEffect(() => {
    setCurrentPageAdmin(1);
  }, []);

  return (
    <>
      <NavLink to="/admin/adduser">
        <div className="btn btn-dark mb-4">Add user</div>
      </NavLink>

      <table className="table table-striped table-hover">
        <thead className="table-dark ">
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Rules</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {usersList ? (
            usersList.map((user,index) => {
              return (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>
                    <PasswordItem password={user.password} />
                  </td>
                  <td>
                    {user.rules.map((rule, index) => (
                      <b key={index}>
                        {listRoles?.find((role) => role.id == rule)?.name}
                        {index != user.rules.length - 1 ? ", " : ""}
                      </b>
                    ))}
                  </td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <NavLink to={`/admin/setting/profile/${user.id}`}>
                        <button type="button" className="btn btn-dark">
                          Profile Setting
                        </button>
                      </NavLink>
                      <NavLink to={`/admin/setting/account/${user.id}`}>
                        <button type="button" className="btn btn-outline-dark">
                          Account Setting
                        </button>
                      </NavLink>
                      <NavLink to={`/admin/setting/roles/${user.id}`}>
                        <button type="button" className="btn btn-dark">
                          User Roles
                        </button>
                      </NavLink>
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
    </>
  );
};

export default UserList;
