import { useState, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import {
  updateInfo,
  getDetailUser,
  deleteUser,
} from "../../services/apis";
import { useHistory, useParams } from "react-router-dom";
import {
  useAppSelector,
} from "../../services/store";
import * as Yup from "yup";
import AuthenticatedGuard from "../../components/auth/authentication/authenticatedGuard/AuthenticatedGuard";
let rules = ["user"];

interface Props {
  usersList: Array<User>;
}

interface Param {
  id: string;
}

export const UserEditForm: React.FC<Props> = ({ usersList }) => {
  const param: Param = useParams();
  let id = Number(param.id);

  const history = useHistory();
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
  return (
    <AuthenticatedGuard routeRules={rules}>
      <div className="container my-3">
        <div className="row">
          <div className="col-sm-3">
            <h4 className="text-decoration-underline">Profile Settings</h4>
          </div>
          <div className="col-sm-8 mx-auto">
            {userEditData ? (
              <Formik
                initialValues={{
                  email: userEditData.email,
                  address: userEditData.address.address,
                  city: userEditData.address.city,
                  phone: userEditData.phoneNumber,
                  avatar: userEditData.avatar,
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().required("* Required!"),
                  address: Yup.string().required("* Required!"),
                  city: Yup.string().required("* Required!"),
                  phone: Yup.string().required("* Required!"),
                  avatar: Yup.string().required("* Required!"),
                })}
                onReset={() => { }}
                onSubmit={(values) => {
                  const dataBody: BodyUpdateUser = {
                    email: userEditData.email,
                    address: { address: values.address, city: values.city },
                    password: userEditData.password,
                    phoneNumber: values.phone + "",
                    avatar: values.avatar,
                  };
                  updateInfo(userEditData.id, dataBody)
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
                        <div className="col-sm-6">
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
                        
                          <div className="d-flex justify-content-center py-2 w-100">
                            {!props.values.avatar ? (
                              <img
                                style={{ width: "12rem", padding: "1rem" }}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY-hjuFaNMnEAp28Q9Mo7x6QK_IyHnKdOqqA&usqp=CAU"
                                alt=""
                              />
                            ) : (
                              <img
                                style={{ width: "12rem", padding: "1rem" }}
                                src={props.values.avatar}
                                alt=""
                              />
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="address">Address: </label>
                            <Field
                              id="address"
                              name="address"
                              className="form-control my-2"
                            />
                            <ErrorMessage
                              name="address"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="city">City: </label>
                            <Field
                              id="city"
                              name="city"
                              className="form-control my-2"
                            />
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="phone">Phone:</label>
                            <Field
                              type="number"
                              id="phone"
                              name="phone"
                              className="form-control my-2"
                            />
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="avatar">Avatar: </label>
                      <Field
                        id="avatar"
                        name="avatar"
                        className="form-control my-2"
                      />
                      <ErrorMessage
                        name="avatar"
                        component="div"
                        className="text-danger"
                      />
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
                          className="btn btn-danger my-2  me-2"
                          onClick={() =>
                            props.setValues({
                              ...props.values,
                              address: "",
                              city: "",
                              phone: "",
                              avatar: "",
                            })
                          }
                        >
                          Clear Form
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning me-2"
                        >
                          <Link to="/admin">Cancel</Link>
                        </button>

                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-danger float-right my-2"
                          onClick={() => handleDelete(id)}
                        >
                          Delete user
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
