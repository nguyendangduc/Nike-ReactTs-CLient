import { useState ,useEffect} from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { NavBarProfile } from "../../components/NavBarProfile";
import { updateInfo, authByToken,getDetailUser } from "../../services/apis";
import { useHistory,useParams } from "react-router-dom";
import {
  useAppSelector,
  userSettingsStatus,
  userFetchSuccess,
  userFetchError,
} from "../../services/store";
import * as Yup from "yup";
import AuthenticatedGuard from "../../components/auth/authentication/authenticatedGuard/AuthenticatedGuard";
let rules = ["user"];

export const UserEditForm = () => {
    const {id} = useParams() as any
  const history = useHistory();
  const { dataUser, error } = useAppSelector((state) => state.authReducer);
  const [reLoad, setReload] = useState(true as boolean)
  const [userEditData, setUserEditData] = useState(null as null|User) 

  useEffect(() => {
    getDetailUser(id).then((res) => setUserEditData(res.data)).catch((err) =>console.log(err));
  },[reLoad])
  const { nameInput, message } = useAppSelector(
    (state) => state.settingsReducer
  );

  const dispatch = useDispatch();
  return (
    <AuthenticatedGuard routeRules={rules}>
      <div className="container my-3">
        <div className="col-8 mx-auto">
          {userEditData ? (
            <Formik
              initialValues={{
                email: userEditData.email,
                newEmail: userEditData.email,
                password: userEditData.password,
                address: userEditData.address.address,
                city: userEditData.address.city,
                phone: userEditData.phoneNumber,
                avatar: userEditData.avatar,
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().required("* Required!"),
                newEmail: Yup.string().required("* Required!"),
                password: Yup.string().required("* Required!"),
                address: Yup.string().required("* Required!"),
                city: Yup.string().required("* Required!"),
                phone: Yup.string().required("* Required!"),
              })}
              onReset={() =>{}}
              onSubmit={(values) => {
                // userEditData.email = values.email;
                // userEditData.address.address = values.address;
                // userEditData.address.city = values.city;
                // userEditData.phone = values.phone;

                const dataBody:BodyUpdateUser = {
                  email: values.newEmail,
                  address: { address: values.address, city: values.city },
                  password: values.password,
                  phoneNumber: values.phone+'',
                  avatar: values.avatar,
                };
                updateInfo(userEditData.id, dataBody)
                  .then((res) => {
                    dispatch(
                      userSettingsStatus({
                        nameInput: "",
                        message: "",
                      })
                    );
                    if (localStorage.getItem("token")) {
                      authByToken()
                        .then((res: any) => {
                          dispatch(userFetchSuccess(res.data));
                        })
                        .catch((err: any) =>
                          dispatch(userFetchError(err.response.data.message))
                        );
                    }
                    alert("Setting Successfully!");
                    setReload(!reLoad);
                  })
                  .catch((error) => {
                    dispatch(
                      userSettingsStatus({
                        nameInput: error.response.data.nameInput,
                        message: error.response.data.message,
                      })
                    );
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
                          <small className="text-danger">
                            {nameInput == "email" ? message : ""}
                          </small>
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
                            style={{ width: "12rem", padding: "1rem", }}
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
                  <div className="">
                  <button className="btn btn-dark my-2 " type="submit">
                    Submit
                  </button>
                  <button onClick={()=>props.setValues({...props.values, newEmail:'',address:'',city:'',phone:'',avatar:''})} className="btn btn-secondary m-2" >
                    Clear
                  </button>
                  </div>
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
