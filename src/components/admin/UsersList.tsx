import {NavLink}  from 'react-router-dom'
import {deleteUser} from '../../services/apis'

interface Props {
  usersList: Array<User>;
  setUsersList: (value: Array<User>) => void;
}

const UserList: React.FC<Props> = ({ usersList,setUsersList }) => {

  function handleDelete(id: number) {
    deleteUser(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    let productsListClone = [...usersList];
    productsListClone = productsListClone.filter(
      (product) => product.id !== id
    );

    setUsersList(productsListClone);
  }

  return (
    <>
      <NavLink to="/admin/adduser">
      <div className="btn btn-dark mb-4">Add user</div>
      </NavLink>
     

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
                      <NavLink to={`/admin/edituser/${user.id}`}>
                      <button type="button" className="btn btn-outline-dark">
                        Edit
                      </button>
                      </NavLink>
                      
                      <button onClick={()=> handleDelete(user.id)} type="button" className="btn btn-dark">
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
    </>
  );
};

export default UserList;
