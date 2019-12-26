import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { notification } from 'antd';
import { changePassword } from '../../api/auth';
import ModalPageLoading from '../../components/elements/Loading/ModelPageLoading';
import { RequestData } from '../../types';

interface Props {
  password: any;
}

const ChangePassword = ({ password }: Props) => {
  const current_password: any = useRef();
  const new_password: any = useRef();
  const confirm_password: any = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [matchFailed, setMatchFailed] = useState(false);
  const [failedMsg, setFailedMsg] = useState('New and Confirm password doesn\'t match.');
  const [errorStr, setErrorStr] = useState('');
  const [errors, setErrors] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });


  // match password
  function hideMatchError(e: ChangeEvent) {
    e.preventDefault();
    const newPassword = new_password.current.value;
    const confirmPassword = confirm_password.current.value;
    // match new and confirm password.
    if (newPassword !== confirmPassword) {
      setMatchFailed(true);
    } else {
      setMatchFailed(false);
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // clear errors
    setErrors({
      current_password: '',
      new_password: '',
      confirm_password: '',
    });
    setErrorStr('');

    setIsLoading(true);
    const newPassword = new_password.current.value || '';
    const confirmPassword = confirm_password.current.value || '';
    const Password = {
      current_password: current_password.current.value,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };
    changePassword(Password).then((response: RequestData) => {
      // check response data
      if (response) {
        setIsLoading(false);
        // passing props to parent to child component
        password();
        // clearing an input field after form submit
        current_password.current.value = '';
        new_password.current.value = '';
        confirm_password.current.value = '';
        // close modal
        const el = document.getElementById('btnClosePasswordModal');
        if (el) {
          el.click();
        }
      } else {
        setIsLoading(false);
        setFailedMsg(response);
        setMatchFailed(true);
      }
    }).catch(({ message, errors: errs }) => {
      if (errs) {
        return setErrors(errs);
      }
      if (message) notification.error({ message });
      setErrorStr(message);
    })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="section-modal">
      <div
        className="modal fade"
        id="changePasswordModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5
                className="modal-title"
                id="exampleModalLongTitle"
              >
                <i className="fa fa-lock mr-2" />
                Change
                Password
              </h5>
              <button
                type="button"
                id="btnClosePasswordModal"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span
                  aria-hidden="true"
                  className="text-white"
                >
&times;
                </span>
              </button>
            </div>
            <div className="modal-body pb-0 position-relative">
              <ModalPageLoading isLoading={isLoading} />
              <form onSubmit={handleSubmit}>
                <div
                  className={matchFailed ? 'alert alert-danger' : 'hide-element'}
                  role="alert"
                >
                  {failedMsg}
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div
                  className={errorStr ? 'alert alert-danger' : 'hide-element'}
                  role="alert"
                >
                  {errorStr}
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="form-group">
                  <label htmlFor="old_password"> Current Password</label>
                  <input
                    type="password"
                    ref={current_password}
                    className="form-control"
                    name="current_password"
                    id="current_password"
                    placeholder=" Current Password"
                    onChange={hideMatchError}
                    required
                  />
                  <small
                    className="text-danger"
                  >
                    {errors.current_password}
                  </small>
                </div>
                {/* <!--NewPassword--!> */}
                <div className="form-group">
                  <label htmlFor="new_password">New Password</label>
                  <input
                    type="password"
                    ref={new_password}
                    className="form-control"
                    name="new_password"
                    id="new_password"
                    onChange={hideMatchError}
                    placeholder=" New Password"
                    required
                  />
                  <small className="text-danger">{errors.new_password}</small>
                </div>
                <div className="form-group">
                  <label htmlFor="confirm_password"> Confirm Password</label>
                  <input
                    type="password"
                    ref={confirm_password}
                    className="form-control"
                    name="confirm_password"
                    id="confirm_password"
                    onChange={hideMatchError}
                    placeholder=" Confirm Password"
                    required
                  />
                  <small
                    className="text-danger"
                  >
                    {errors.confirm_password}
                  </small>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ChangePassword;
