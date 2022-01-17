import { useState, ChangeEvent, FormEvent } from "react";
import UnAuthenticatedGuard from "../../components/auth/authentication/unAuthenticatedGuard/UnAuthenticatedGuard";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link,useHistory } from "react-router-dom";
import { postRegister } from "../../services/apis";
import {
  userFetchSuccess,
  userFetchError,
  useAppSelector,
  logoutSuccess
} from "../../services/store";
import { useDispatch } from "react-redux";
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}
const Register = () => {
  const dispatch = useDispatch() as any;
  const { error } = useAppSelector((state) => state.authReducer);
  const history = useHistory() as any

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  } as FormData);

  const handleChange = (event: ChangeEvent<any>): void => {
    const newData = { ...formData, [event.target.name]: event.target.value };
    setFormData(newData);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { email, password, confirmPassword } = formData;
    if(password != confirmPassword) alert("Confirm password don't match!")
    if (email && password && confirmPassword && password === confirmPassword) {
      postRegister({ email, password })
        .then((res) => {
          dispatch(userFetchSuccess(res.data));
          setTimeout(function () {
            dispatch(logoutSuccess())
            history.push('/login')
          },new Date(res.data.expired).getTime() - new Date().getTime())
        })
        .catch((error) => {
          dispatch(userFetchError(error.response.data.message));
        });
    }
  };
  return (
    <>
      <UnAuthenticatedGuard>
        <br />
        <br />
        <br />
        <br />
        <div className="container">
          <Row>
            <Col sm={4}></Col>
            <Col>
              <p className="text-center px-5">
                <h4>
                  <b>YOUR ACCOUNT FOR EVERYTHING NIKE</b>
                </h4>
              </p>
              <br />
              <p className="text-danger">{error}</p>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>UserName</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={formData.email}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    onChange={handleChange}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                  />
                </Form.Group>
                <div style={{ textAlign: "right" }}>
                  <Button className="w-100" type="submit" variant="dark">
                    Register
                  </Button>
                  <br />
                  <br />
                  <p>
                    <span>You have an account?</span>
                    <Link to="/login" className="text-danger">
                      Sign In
                    </Link>
                  </p>
                </div>
              </Form>
            </Col>
            <Col sm={4}></Col>
          </Row>
        </div>
        <br />
        <br />
        <br />
        <br />
      </UnAuthenticatedGuard>
    </>
  );
};

export default Register;
