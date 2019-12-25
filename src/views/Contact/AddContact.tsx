import React, { FormEvent, useRef, useState } from 'react';
import { notification } from 'antd';
import { contactAdd } from '../../api/contact';
import ModalPageLoading from '../../components/elements/Loading/ModelPageLoading';
import { RequestData } from '../../types';

interface Props{
  addContact:any,
}

const AddContact = ({ addContact }:Props) => {
  const name:any = useRef();
  const email:any = useRef();
  const address:any = useRef();
  const phone:any = useRef();
  const dob:any = useRef();
  const description:any = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    password: '',
    description: '',
    dob: '',
  });

  const handleSubmit = (event:FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    // clear errors
    setErrors({
      name: '',
      address: '',
      email: '',
      phone: '',
      password: '',
      description: '',
      dob: '',
    });
    const contact = {
      name: name.current.value,
      email: email.current.value,
      address: address.current.value,
      phone: phone.current.value,
      dob: dob.current.value,
      description: description.current.value,
    };
    contactAdd(contact).then((response:RequestData) => {
      if (response) {
        // passing props to parent to child component
        addContact();
        // clearing an input field after form submit
        name.current.value = '';
        email.current.value = '';
        address.current.value = '';
        phone.current.value = '';
        dob.current.value = '';
        description.current.value = '';
        // // close modal
        const el: HTMLElement | null = document.getElementById('btnCloseAddContactModal');
        if (el) {
          el.click();
        }
      }
    }).catch(({ message, errors: errs }) => {
      if (errs) {
        return setErrors(errs);
      }
      if (message) notification.error({ message });
    })
      .finally(() => {
        setIsLoading(false);
      });
  };


  return (
    <div
      className="modal fade"
      id="AddContactModal"
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
              <i className="fa fa-address-book mr-2" />
Create
              a new contact
            </h5>
            <button
              type="button"
              id="btnCloseAddContactModal"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ModalPageLoading isLoading={isLoading} />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title"> Full Name:</label>
                <input
                  type="text"
                  ref={name}
                  className="form-control"
                  name="crawler_name"
                  required
                />
                <small className="text-danger">{errors.name}</small>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="title">Phone:</label>
                  <input
                    type="text"
                    ref={phone}
                    className="form-control"
                    name="crawler_name"
                    required
                  />
                  <small className="text-danger">{errors.phone}</small>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="title">Email:</label>
                  <input
                    type="email"
                    ref={email}
                    className="form-control"
                    name="crawler_name"
                    required
                  />
                  <small className="text-danger">{errors.email}</small>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="title">Address:</label>
                  <input
                    type="text"
                    ref={address}
                    className="form-control"
                    name="crawler_name"
                    required
                  />
                  <small className="text-danger">{errors.address}</small>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="title">DOB:</label>
                  <input
                    type="date"
                    ref={dob}
                    className="form-control"
                    name="dob"
                  />
                  <small className="text-danger">{errors.dob}</small>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Description</label>
                <textarea
                  className="form-control"
                  ref={description}
                  id="exampleFormControlTextarea1"
                />
                <small className="text-danger">{errors.description}</small>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-dismiss="modal"
                >
Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddContact;
