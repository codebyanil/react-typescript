import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { History } from 'history';
import { Link } from 'react-router-dom';
import { notification } from 'antd';
import { login } from '../../api/auth';
import { getToken, setToken } from '../../library/auth';
import HeroLayout from '../../layouts/HeroLayout';
import { RequestData } from '../../types';
import Container from '../../components/elements/Container';

interface Props {
  history: History;
}

const Login = ({ history }: Props) => {
  const password: any = useRef();
  const email: any = useRef();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    password: '',
    email: '',

  });

  interface Response {
    token: string;
    errors?:[];
  }

  useEffect(() => {
    if (getToken()) {
      history.push('/');
    } else {
      history.push('/login');
    }
  }, [loading, setLoading, setErrors, history]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // clear errors
    setErrors({ email: '', password: '' });

    const user = {
      email: email.current.value,
      password: password.current.value,
    };
    login(user)
      .then((response: RequestData) => {
        setToken(response.token);
        history.push('/');
      })
      .catch(({ message, errors: errs }) => {
        if (errs) {
          return setErrors(errs);
        }
        if (message) notification.error({ message });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <HeroLayout>
      <Container>
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                  <form
                    onSubmit={onSubmit}
                    className="text-center border border-light p-5"
                  >
                    <p className="h4 mb-4">Welcome back</p>
                    <div className="form-group">
                      <input
                        type="email"
                        ref={email}
                        className="form-control"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email Address..."
                      />
                      <small className="text-danger">{errors.email}</small>
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        ref={password}
                        className="form-control"
                        id="exampleInputPassword"
                        placeholder="Password"
                      />
                      <small className="text-danger">{errors.password}</small>
                    </div>
                    <div className="d-flex justify-content-around">
                      <div>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="defaultLoginFormRemember"
                          />
                          <label className="custom-control-label">
                            Remember
                            me
                          </label>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-info btn-block my-4"
                      type="submit"
                    >
                      Sign in
                    </button>

                    <p>
                      Not a member?
                      <Link to="/register">Register</Link>
                    </p>

                    <p>or sign in with:</p>

                    <a
                      href="#"
                      className="mx-2"
                      role="button"
                    >
                      <i className="fab fa-facebook-f light-blue-text" />
                    </a>
                    <a
                      href="#"
                      className="mx-2"
                      role="button"
                    >
                      <i className="fab fa-twitter light-blue-text" />
                    </a>
                    <a
                      href="#"
                      className="mx-2"
                      role="button"
                    >
                      <i className="fab fa-linkedin-in light-blue-text" />
                    </a>
                    <a
                      href="#"
                      className="mx-2"
                      role="button"
                    >
                      <i className="fab fa-github light-blue-text" />
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </HeroLayout>
  );
};

export default Login;
