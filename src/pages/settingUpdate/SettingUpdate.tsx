import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { NavBarProfile } from "../../components/NavBarProfile";
import { updateInfo, authByToken } from "../../services/apis";
import {UpdateMessage} from './UpdateMessage'
import {
  useAppSelector,
  userSettingsStatus,
  userFetchSuccess,
  userFetchError,
} from "../../services/store";
import * as Yup from "yup";
import AuthenticatedGuard from "../../components/auth/authentication/authenticatedGuard/AuthenticatedGuard";
import { useContext, useEffect, useState } from "react";
import { ContextElement } from "../../App";
let rules = ["user"];

export const SettingUpdate = () => {
  const { dataUser } = useAppSelector((state) => state.authReducer);
  const [updateMessage, setUpdateMessage] = useState(false);

  const dispatch = useDispatch();

  let { setToDashBoard } = useContext(ContextElement);

  useEffect(() => {
    setToDashBoard(false);
  }, []);

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
                address: Yup.string().required("* Required!"),
                city: Yup.string().required("* Required!"),
                phone: Yup.string().required("* Required!"),
              })}
              onSubmit={(values) => {
                const dataBody = {
                  id: dataUser?.id,
                  email: dataUser?.email,
                  address: { address: values.address, city: values.city },
                  password: dataUser?.password,
                  phoneNumber: values.phone,
                  avatar: values.avatar,
                };
                updateInfo(dataUser.id, dataBody)
                  .then((res) => {
                    dispatch(
                      userSettingsStatus({
                        nameInput: "",
                        message: "",
                      })
                    );
                    if (localStorage.getItem("token")) {
                      authByToken()
                        .then((res) => {
                          dispatch(userFetchSuccess(res.data));
                        })
                        .then(() => {
                          setUpdateMessage(true);
                        })
                        .catch((err) =>
                          dispatch(userFetchError(err.response.data.message))
                        );
                    }
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
                          value={dataUser.email}
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
                      </div>
                      <div className="col-sm-6">
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
        <UpdateMessage
          updateMessage={updateMessage}
          setUpdateMessage={setUpdateMessage}
        />
      </div>
    </AuthenticatedGuard>
  );
};
