import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { deleteUser } from '../../services/apis'
import PasswordItem from '../../components/admin/PasswordItem'
interface Props {
  usersList: Array<User>;
  setUsersList: (value: Array<User>) => void;
}


const UserList: React.FC<Props> = ({ usersList, setUsersList }) => {
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
    userListClone = userListClone.filter(
      (product) => product.id !== id
    );

    setUsersList(userListClone);
  }
  useEffect(() => {

  }, [])

  return (
    <>
      <NavLink to="/admin/adduser">
        <div className="btn btn-success mb-4">Add user</div>
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
            usersList.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>
                    <PasswordItem password={user.password} />
                  </td>
                  <td>{user.rules.map((rule, index) => (
                    <b>{listRoles?.find((role) => role.id == rule)?.name}
                      {index != user.rules.length - 1 ? ", " : ''}
                    </b>
                  ))}</td>
                  <td className='d-flex justify-content-end'>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <NavLink to={`/admin/setting/profile/${user.id}`}>
                        <button type="button" className="btn btn-dark me-2">
                          Profile Setting
                        </button>
                      </NavLink>
                      <NavLink to={`/admin/setting/account/${user.id}`}>
                        <button type="button" className="btn btn-outline-dark me-2">
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
