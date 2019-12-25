import React, { FormEvent, useEffect, useRef, useState } from 'react';
import ModalPageLoading from '../../components/elements/Loading/ModelPageLoading';
import { contactUpdate } from '../../api/contact';

interface Props {
  contact: any,
  updateContact:any
}

const EditContact = ({ contact, updateContact }:Props) => {
  // int the data
  const [currentContact, setCurrentContact] = useState(contact);
  const [isLoading, setIsLoading] = useState(false);

  // using useEffect
  useEffect(() => {
    setCurrentContact(contact);
  }, [contact, setCurrentContact]);

  // useRef
  const name: any = useRef();
  const email: any = useRef();
  const address: any = useRef();
  const phone: any = useRef();
  const dob: any = useRef();
  const description: any = useRef();

  // formSubmit
  const handleSubmit = (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const user = {
      name: name.current.value,
      email: email.current.value,
      address: address.current.value,
      phone: phone.current.value,
      dob: dob.current.value,
      description: description.current.value,
    };
    const ContactId = contact.id;
    contactUpdate(ContactId, user).then(() => {
      // passing data to child through props
      updateContact(contact, contact.id);
      // hide modal
      const el = document.getElementById('btnCloseEditContactModal');
      if (el) {
        el.click();
      }
    }).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div
      className="modal fade"
      id="EditContactModal"
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
              Edit
              contact
            </h5>
            <button
              type="button"
              id="btnCloseEditContactModal"
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
                <label htmlFor="title"> Name:</label>
                <input
                  type="text"
                  ref={name}
                  className="form-control"
                  name="name"
                  defaultValue={currentContact.name}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group col-mod-6">
                  <label htmlFor="title">Phone:</label>
                  <input
                    type="text"
                    ref={phone}
                    className="form-control"
                    name="phone"
                    defaultValue={currentContact.phone}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="title">Email:</label>
                  <input
                    type="email"
                    ref={email}
                    className="form-control"
                    name="email"
                    defaultValue={currentContact.email}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="title">Address:</label>
                  <input
                    type="text"
                    ref={address}
                    className="form-control"
                    name="address"
                    defaultValue={currentContact.address}
                    required
                  />
                </div>
                <div className="form-group col-mod-6">
                  <label htmlFor="title">DOB:</label>
                  <input
                    type="date"
                    ref={dob}
                    className="form-control"
                    name="dob"
                    defaultValue={currentContact.dob}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="title">Description:</label>
                <input
                  type="text"
                  ref={description}
                  className="form-control"
                  name="description"
                  defaultValue={currentContact.description}
                />
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
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContact;
