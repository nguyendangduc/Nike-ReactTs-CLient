import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { getDetailUser, putRole } from "../../services/apis";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthenticatedGuard from "../../components/auth/authentication/authenticatedGuard/AuthenticatedGuard";
let rules = ["user"];
interface Props {
  usersList: Array<User>;
}
interface Param {
  id: string;
}
export const UserRoles: React.FC<Props> = ({ usersList }) => {
  const param: Param = useParams();
  let id = Number(param.id);
  const [reLoad, setReload] = useState(true as boolean);
  const [userSettingData, setUserSettingData] = useState(null as null | User);

  const [roleSelected, setRoleSelected] = useState("user" as string);
  const listRoles = [
    { id: "admin", name: "Senior administrator" },
    { id: "user", name: "User" },
    { id: "product_admin", name: "Product administrator" },
    { id: "user_admin", name: "User administrator" },
  ];
  useEffect(() => {
    getDetailUser(id)
      .then((res) => setUserSettingData(res.data))
      .catch((err) => console.log(err));
  }, [reLoad]);
  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setRoleSelected(event.target.value);
  };
  const handleAddRole = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    putRole(id, { role: roleSelected }).then((res) => {
      setReload(!reLoad);
    });
  };
  return (
    <AuthenticatedGuard routeRules={rules}>
      <div className="container my-3">
        <h3 className="text-decoration-underline">User Roles</h3>
        <br />
        <div className="row">
          <div className="col-sm-3">
            <b>{userSettingData?.email}</b>
          </div>
          <div className="col-sm-4">
            <select
              onChange={handleChange}
              value={roleSelected}
              className="form-select"
              aria-label="Default select example"
            >
              {listRoles
                ? listRoles.map((role, index) => (
                  <option value={role.id} key={index}>
                    {role.name}
                  </option>
                ))
                : ""}
            </select>
          </div>
          <div className="col-sm-2">
            <button onClick={handleAddRole} className="btn btn-success">
              Add role
            </button>
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-8">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ROLE</th>
                  <th scope="col">START</th>
                  <th scope="col">EXPIRES</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userSettingData
                  ? userSettingData?.rules?.map((rule, index) => (
                    <tr key={index}>
                      <td>
                        {
                          listRoles?.find((item, index) => item.id == rule)
                            ?.name
                        }
                      </td>
                      <td>___</td>
                      <td>___</td>
                      <td></td>
                    </tr>
                  ))
                  : ""}
              </tbody>
            </table>
            <br />
            <button type="button" className="btn btn-warning me-2">
              <Link to="/admin">Cancel</Link>
            </button>
          </div>
        </div>
      </div>
    </AuthenticatedGuard>
  );
};
