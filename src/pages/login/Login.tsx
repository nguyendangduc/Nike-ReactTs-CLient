import { useState, ChangeEvent, FormEvent } from "react";
import UnAuthenticatedGuard from "../../components/auth/authentication/unAuthenticatedGuard/UnAuthenticatedGuard";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { postLogin } from "../../services/apis";
import {
  userFetchSuccess,
  userFetchError,
  useAppSelector,
  logoutSuccess,
} from "../../services/store";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory() as any
  const { error } = useAppSelector((state) => state.authReducer);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  } as FormData);
  const handleChange = (event: ChangeEvent<any>): void => {
    const newData = { ...formData, [event.target.name]: event.target.value };
    setFormData(newData);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { email, password } = formData;
    if (email && password) {
      postLogin(formData)
        .then((res) => {
          dispatch(userFetchSuccess(res.data));
          setTimeout(function () {
            dispatch(logoutSuccess());
            history.push('/login')
          }, new Date(res.data.expired).getTime() - new Date().getTime());
        })
        .catch((error) => {
          dispatch(userFetchError(error.response?.data?.message));
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
              <h4 className="text-center px-5">
                <b>YOUR ACCOUNT FOR EVERYTHING NIKE</b>
              </h4>
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
                <div style={{ textAlign: "right" }}>
                  <Button className="w-100" type="submit" variant="dark">
                    Sign in
                  </Button>
                  <br />
                  <br />
                  <p>
                    <span>You don't have an account?</span>
                    <Link to="/register" className="text-danger">
                      Register
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
        <br />
        <br />
      </UnAuthenticatedGuard>
    </>
  );
};

export default Login;
