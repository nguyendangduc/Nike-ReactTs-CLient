import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import UnAuthenticatedGuard from "../../components/auth/authentication/unAuthenticatedGuard/UnAuthenticatedGuard";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory, useParams, NavLink } from "react-router-dom";
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
        <div className="container">
          <Row>
            <Col sm={3}></Col>

            <Col>
              <h2 className="text-center">Login</h2>

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
                    type="text"
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                  />
                </Form.Group>

                <div style={{ textAlign: "right" }}>
                  <Button type="submit" variant="dark">
                    Submit
                  </Button>
                </div>
              </Form>
            </Col>
            <Col sm={3}></Col>
          </Row>
        </div>
        <br />
        <br />
      </UnAuthenticatedGuard>
    </>
  );
};

export default Login;
