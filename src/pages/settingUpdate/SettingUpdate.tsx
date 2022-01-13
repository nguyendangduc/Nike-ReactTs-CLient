import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { NavBarProfile } from "../../components/NavBarProfile";
import { updateInfo } from "../../services/apis";
import { useAppSelector, userFetchError, userFetchSuccess } from "../../services/store";
import * as Yup from 'yup';

export const SettingUpdate = () => {
    const { dataUser } = useAppSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    console.log(dataUser);
    
  return (
    <div className="container my-3">
      <NavBarProfile />
      <div className="col-8 mx-auto">
        <Formik
          initialValues={{
            email: dataUser.email,
            address: dataUser.address.address,
            city: dataUser.address.city,
            phone: dataUser.phone
          }}
          validationSchema={Yup.object().shape({
              email: Yup.string()
                .required('Require'),
            address: Yup.string()
                .required('Require'),
            city: Yup.string()
                .required('Require'),
            phone: Yup.string()
                .required('Require'),
          })
            
        }
          onSubmit={(values) => {
            // dataUser.email = values.email;
            // dataUser.address.address = values.address;
            // dataUser.address.city = values.city;
            // dataUser.phone = values.phone;
            // updateInfo(dataUser)
            // .then((res) => {
            //     dispatch(userFetchSuccess(res.data));
            //   })
            //   .catch((error) => {
            //     dispatch(userFetchError(error.response.data.message));
            //   });
            alert('Update Success!');
          }}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                id="email"
                name="email"
                className="form-control my-2"
              />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address: </label>
              <Field
                id="address"
                name="address"
                className="form-control my-2"
              />
              <ErrorMessage name="address" component="div"/>
            </div>
            <div className="form-group">
              <label htmlFor="city">City: </label>
              <Field
                id="city"
                name="city"
                className="form-control my-2"
              />
              <ErrorMessage name="city" component="div" />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <Field
                id="phone"
                name="phone"
                className="form-control my-2"
                />
                <ErrorMessage name="phone" component="div" />
            </div>
            <button className="btn btn-dark w-100 mt-2" type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
