import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import UnAuthenticatedGuard from "../../components/auth/authentication/unAuthenticatedGuard/UnAuthenticatedGuard";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory, useParams, Link } from "react-router-dom";
import { postLogin } from "../../services/apis";
import { userFetchSuccess, userFetchError } from "../../services/store";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch() as any;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  } as FormData);
  const handleChange = (event: ChangeEvent<any>): void => {
    const newData = { ...formData, [event.target.name]: event.target.value };
    setFormData(newData);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    console.log(1);
    event.preventDefault();
    const { email, password } = formData;
    if (email && password) {
      postLogin(formData)
        .then((res) => {
          dispatch(userFetchSuccess(res.data));
        })
        .catch((error) => {
          dispatch(userFetchError(error.message));
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
                  <br/>
                  <p>
                    <span>You don't have an account?</span>
                    <Link to="/" className="text-danger">Register</Link>
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
