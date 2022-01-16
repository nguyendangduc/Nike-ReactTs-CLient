import { ErrorMessage, Field, Form, Formik } from "formik";
import { addUser } from "../../services/apis";
import { useHistory, Link } from "react-router-dom";
import * as Yup from "yup";
import AuthenticatedGuard from "../../components/auth/authentication/authenticatedGuard/AuthenticatedGuard";
let rules = ["user"];

export const UserAddForm = () => {
  const history = useHistory();

  return (
    <AuthenticatedGuard routeRules={rules}>
      <div className="container my-3">
        <div className="col-8 mx-auto">
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              address: "",
              city: "",
              phone: "",
              avatar: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().required("* Required!"),
              password: Yup.string().required("Password is required"),
              confirmPassword: Yup.string()
                .required("*Required!")
                .oneOf([Yup.ref("password"), null], "Passwords must match"),

              address: Yup.string().required("* Required!"),
              city: Yup.string().required("* Required!"),
              phone: Yup.string().required("* Required!"),
            })}
            onSubmit={(values) => {
              const dataBody: BodyCreateUser = {
                email: values.email,
                address: { address: values.address, city: values.city },
                password: values.password,
                phoneNumber: values.phone,
                avatar: values.avatar,
              };
              addUser(dataBody)
                .then((res) => {
                  alert("Setting Successfully!");
                  history.push("/admin");
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
                        <label htmlFor="password">Password:</label>
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
                      </div>
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
                <button className="btn btn-dark my-2" type="submit">
                  Submit
                </button>
                <button
                  onClick={() =>
                    props.setValues({
                      ...props.values,
                      email: "",
                      password: "",
                      confirmPassword: "",
                      address: "",
                      city: "",
                      phone: "",
                      avatar: "",
                    })
                  }
                  className="btn btn-secondary m-2"
                >
                  Clear
                </button>
                <button type="button" className="btn btn-outline-dark me-4">
                  <Link to="/admin">Cancel</Link>
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </AuthenticatedGuard>
  );
};
