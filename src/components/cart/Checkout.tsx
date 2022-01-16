import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAppSelector } from "../../services/store";
import * as Yup from "yup";
import { checkOut } from "../../services/apis";
import { useState } from "react";
import { CheckoutMessage } from "./CheckoutMessage";

export const Checkout = () => {
  const { dataUser } = useAppSelector((state) => state.authReducer);
  const [checkoutMessage, setCheckoutMessage] = useState(false);
  return (
    <>
      <div className="d-flex flex-column my-5">
        <div className="">
          <CheckoutMessage
            checkoutMessage={checkoutMessage}
            setCheckoutMessage={setCheckoutMessage}
          />
          <div className="row">
            <div className="col-lg-7 mx-auto">
              <h2 className="text-center">Checkout</h2>
              <p className="text-end">Shipping cod</p>

              {dataUser ? (
                <Formik
                  initialValues={{
                    name: "",
                    address: dataUser.address.address,
                    city: dataUser.address.city,
                    phoneNumber: dataUser.phoneNumber,
                  }}
                  validationSchema={Yup.object().shape({
                    name: Yup.string().required("* Required!"),
                    address: Yup.string().required("* Required!"),
                    city: Yup.string().required("* Required!"),
                    phoneNumber: Yup.string().required("* Required!"),
                  })}
                  onSubmit={(values) => {
                    checkOut(dataUser.id, values)
                      .then((res) => console.log("success!"))
                      .catch((err) => console.log("error"));
                    setCheckoutMessage(true);
                  }}
                >
                  {(props) => (
                    <Form>
                      <div className="form-group">
                        <div className="form-group">
                          <label htmlFor="name">Name:</label>
                          <Field
                            id="name"
                            name="name"
                            className="form-control my-2"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-danger"
                          />
                        </div>
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
                          <label htmlFor="phoneNumber">Phone:</label>
                          <Field
                            id="phoneNumber"
                            name="phoneNumber"
                            className="form-control my-2"
                          />
                          <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className="text-danger"
                          />
                        </div>
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
          </div>
        </div>
      </div>
    </>
  );
};
