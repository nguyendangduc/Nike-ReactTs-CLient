interface Props {
  usersList: Array<User>;
}

const UserList: React.FC<Props> = ({ usersList }) => {
  return (
    <>
      <div className="btn btn-dark mb-4">Add user</div>

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
                      <button type="button" className="btn btn-outline-dark">
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
    </>
  );
};

export default UserList;
