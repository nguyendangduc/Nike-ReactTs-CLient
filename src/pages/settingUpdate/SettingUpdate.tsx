import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { NavBarProfile } from "../../components/NavBarProfile";
import { updateInfo } from "../../services/apis";
import { useHistory } from "react-router-dom";
import { useAppSelector, userSettingsStatus } from "../../services/store";
import * as Yup from "yup";
import AuthenticatedGuard from "../../components/auth/authentication/authenticatedGuard/AuthenticatedGuard";
let rules = ["user"];

export const SettingUpdate = () => {
  const history = useHistory();
  const { dataUser, error } = useAppSelector((state) => state.authReducer);
  // const { status,message } = useAppSelector((state) => state.settingsReducer);

  const dispatch = useDispatch();
  console.log(dataUser);

  return (
    <AuthenticatedGuard routeRules={rules}>
      <div className="container my-3">
        <NavBarProfile />
        <div className="col-8 mx-auto">
          {dataUser ? (
            <Formik
              initialValues={{
                email: dataUser.email,
                newEmail: dataUser.email,
                password: "",
                address: dataUser.address.address,
                city: dataUser.address.city,
                phone: dataUser.phoneNumber,
                avatar: dataUser.avatar,
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().required("* Required!"),
                newEmail: Yup.string().required("* Required!"),
                password: Yup.string().required("* Required!"),
                address: Yup.string().required("* Required!"),
                city: Yup.string().required("* Required!"),
                phone: Yup.string().required("* Required!"),
              })}
              onSubmit={(values) => {
                // dataUser.email = values.email;
                // dataUser.address.address = values.address;
                // dataUser.address.city = values.city;
                // dataUser.phone = values.phone;

                const dataBody = {
                  id: dataUser?.id,
                  email: values.newEmail,
                  address: { address: values.address, city: values.city },
                  password: values.password,
                  phoneNumber: values.phone,
                  avatar: values.avatar,
                };
                updateInfo(dataUser.id, dataBody)
                  .then((res) => {
                    console.log(res);
                    alert("Setting Successfully!");
                    
                    dispatch(userSettingsStatus({status:200,message:'Setting Successfully!'}));
                  })
                  .catch((error) => {
                    alert(error.response.data.message);

                    // dispatch(userSettingsStatus({status:error.response.status,message:error.response.data.message}));
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
                        <div className="form-group">
                          <label htmlFor="password">Confirm Password:</label>
                          <Field
                            type="password"
                            id="password"
                            name="password"
                            className="form-control my-2"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-danger"
                          />
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
                    <img
                      style={{ width: "14rem", padding: "1rem" }}
                      src={props.values.avatar}
                      alt=""
                    />
                  </div>
                  <p>{error}</p>
                  <button className="btn btn-dark w-100 mt-2" type="submit">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            ""
          )}
        </div>
      </div>
    </AuthenticatedGuard>
  );
};
