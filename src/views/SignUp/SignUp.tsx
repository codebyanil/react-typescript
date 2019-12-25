import React, {FormEvent, useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {History} from 'history';
import {registerUser} from '../../api/auth';
import {notification} from 'antd';
import {getToken} from '../../library/auth';
import Container from '../../components/elements/Container';
import HeroLayout from '../../layouts/HeroLayout';
import {RequestData} from '../../types';

interface Props {
  history: History;
}

const SignUp = ({history}: Props) => {
  const first_name: any = useRef();
  const last_name: any = useRef();
  const phone: any = useRef();
  const email: any = useRef();
  const address: any = useRef();
  const password: any = useRef();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
  });

  useEffect(() => {
    if (getToken()) {
      history.push('/');
    } else {
      history.push('/register');
    }
  }, [loading, setLoading, history]);


  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    // clear errors
    setErrors({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      address: '',
    });
    const signUp = {
      first_name: first_name.current.value,
      last_name: last_name.current.value,
      email: email.current.value,
      phone: phone.current.value,
      password: password.current.value,
      address: address.current.value,
    };
    registerUser(signUp)
      .then((response: RequestData) => {
        // check response
        if (response) {
          setLoading(true);
          localStorage.setItem('X-Auth-Token', response.token);
          history.push('/');
        }
      })
      .catch(({message, errors: errs }) => {
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
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image"/>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">
                      Create an
                      Account!
                    </h1>
                  </div>
                  <form
                    className="user"
                    onSubmit={onSubmit}
                  >
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          ref={first_name}
                          className="form-control form-control-user"
                          id="exampleFirstName"
                          placeholder="First Name"
                        />
                        <small
                          className="text-danger"
                        >
                          {errors.first_name}
                        </small>
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          ref={last_name}
                          className="form-control form-control-user"
                          id="exampleLastName"
                          placeholder="Last Name"
                        />
                        <small
                          className="text-danger"
                        >
                          {errors.last_name}
                        </small>
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        ref={email}
                        className="form-control form-control-user"
                        id="exampleInputEmail"
                        placeholder="Email Address"
                      />
                      <small className="text-danger">{errors.email}</small>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        ref={address}
                        className="form-control form-control-user"
                        id="exampleInputAddress"
                        placeholder=" Address"
                      />
                      <small className="text-danger">{errors.address}</small>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="password"
                          ref={password}
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                        />
                        <small className="text-danger">{errors.password}</small>
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          ref={phone}
                          className="form-control form-control-user"
                          id="exampleRepeatPassword"
                          placeholder="phone"
                        />
                        <small className="text-danger">{errors.phone}</small>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Register
                      Account
                    </button>
                  </form>
                  <div className="text-center">
                    <Link
                      to=""
                      className="small"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link
                      className="small"
                      to="/login"
                    >
                      Already have an
                      account? Login!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </HeroLayout>
  );
};

export default SignUp;
