import { useState, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDetailUser,
  deleteUser,
  putAccountSetting,
} from "../../services/apis";
import { useHistory, useParams } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import * as Yup from "yup";
import AuthenticatedGuard from "../../components/auth/authentication/authenticatedGuard/AuthenticatedGuard";
let rules = ["user"];
interface Props {
  usersList: Array<User>;
}
export const AccountSetting: React.FC<Props> = ({ usersList }) => {
  const { id } = useParams() as any;
  const history = useHistory();
  const { dataUser, error } = useAppSelector((state) => state.authReducer);
  const [reLoad, setReload] = useState(true as boolean);
  const [userEditData, setUserEditData] = useState(null as null | User);

  useEffect(() => {
    getDetailUser(id)
      .then((res) => setUserEditData(res.data))
      .catch((err) => console.log(err));
  }, [reLoad]);
  const { nameInput, message } = useAppSelector(
    (state) => state.settingsReducer
  );
  function handleDelete(id: number) {
    deleteUser(id).then((res) => {
      alert("Delete user successfully!.Go back admin to check");
      history.push("/admin");
    });
  }
  const dispatch = useDispatch();
  return (
    <AuthenticatedGuard routeRules={rules}>
      <div className="container my-3">
        <div className="row">
          <div className="col-sm-3">
            <h4 className="text-decoration-underline">Account Settings</h4>
          </div>
          <div className="col-sm-8 mx-auto">
            {userEditData ? (
              <Formik
                initialValues={{
                  email: userEditData.email,
                  newEmail: userEditData.email,
                  newPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().required("* Required!"),
                  newEmail: Yup.string().required("* Required!"),
                  newPassword: Yup.string().required("* Required!"),
                  confirmPassword: Yup.string()
                    .required("* Required!")
                    .oneOf(
                      [Yup.ref("newPassword"), null],
                      "Passwords must match"
                    ),
                })}
                onSubmit={(values) => {
                  const dataBody: AccountSetting = {
                    newEmail: values.newEmail,
                    newPassword: values.newPassword,
                  };
                  putAccountSetting(userEditData.id, dataBody)
                    .then((res) => {
                      setReload(!reLoad);
                      alert("Setting Successfully!");
                      setTimeout(() => {
                        history.push("/admin");
                      }, 1000);
                    })
                    .catch((error) => {
                      alert(error.response.data.message);
                    });
                }}
              >
                {(props) => (
                  <Form>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-12">
                          <h5 className="font-weight-bold">Account Settings</h5>
                          <br />
                          <label htmlFor="email">Email:</label>
                          <Field
                            value={userEditData.email}
                            disabled
                            id="email"
                            name="email"
                            type="email"
                            className="form-control my-2"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                          <div className="form-group">
                            <label htmlFor="newEmail">New Email:</label>
                            <Field
                              id="newEmail"
                              name="newEmail"
                              type="email"
                              className="form-control my-2"
                            />
                            <ErrorMessage
                              name="newEmail"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-sm-12">
                          <br />
                          <h5 className="font-weight-bold">Change Password</h5>
                          <br />
                          <div className="form-group">
                            <label htmlFor="newPassword">New Password:</label>
                            <Field
                              type="password"
                              id="newPassword"
                              name="newPassword"
                              className="form-control my-2"
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="text-danger"
                            />
                            <small className="text-danger">
                              {nameInput == "password" ? message : ""}
                            </small>
                          </div>
                          <div className="form-group">
                            <label htmlFor="password">Confirm Password:</label>
                            <Field
                              type="password"
                              id="confirmPassword"
                              name="confirmPassword"
                              className="form-control my-2"
                            />
                            <ErrorMessage
                              name="confirmPassword"
                              component="div"
                              className="text-danger"
                            />
                            <small className="text-danger">
                              {nameInput == "password" ? message : ""}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" d-flex justify-content-between py-2 w-100">
                      <div className="">
                        {" "}
                        <button
                          className="btn btn-primary my-2  me-2"
                          type="submit"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning me-2"
                        >
                          <Link to="/admin">Cancel</Link>
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            ) : (
              ""
            )}
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    </AuthenticatedGuard>
  );
};
