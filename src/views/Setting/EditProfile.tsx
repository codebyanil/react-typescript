import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { updateProfile } from '../../api/user';
import ModalPageLoading
  from '../../components/elements/Loading/ModelPageLoading';

interface Props {
  contact: any;
  profile: any;
}
const EditProfile = ({ contact, profile }: Props) => {
  const [currentMember, setCurrentMember] = useState(contact);
  const [isLoading, setIsLoading] = useState(false);
  const last_name: any = useRef();
  const first_name: any = useRef();
  const email: any = useRef();
  const phone: any = useRef();
  const address: any = useRef();

  useEffect(() => {
    setCurrentMember(contact);
  }, [setCurrentMember, currentMember, contact]);


  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      first_name: first_name.current.value,
      last_name: last_name.current.value,
      email: email.current.value,
      phone: phone.current.value,
      address: address.current.value,
    };
    updateProfile(data).then(() => {
      setIsLoading(false);
      profile();
      const el = document.getElementById('btnCloseProfileModal');
      if (el) {
        el.click();
      }
    }).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <section className="section-modal">
      {/* Modal-start */}
      <div
        className="modal fade"
        id="editProfileModal"
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
                <i className="fa fa-pen mr-2" />
                Edit
                Profile
              </h5>
              <button
                id="btnCloseProfileModal"
                type="button"
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
            {/* End Modal-header */}
            <div className="modal-body pb-0 position-relative">
              <ModalPageLoading isLoading={isLoading} />
              {/* Loading integration */}
              {/* Form open */}
              <form onSubmit={onSubmit}>
                {/* <!--First name--!> */}
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="first_name"> First Name</label>
                    <input
                      type="text"
                      ref={first_name}
                      className="form-control"
                      name="first_name"
                      defaultValue={currentMember.first_name}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="last_name"> Last Name</label>
                    <input
                      type="text"
                      ref={last_name}
                      className="form-control"
                      name="last_name"
                      defaultValue={currentMember.last_name}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="dob"> Email</label>
                    <input
                      type="email"
                      ref={email}
                      className="form-control"
                      name="dob "
                      defaultValue={currentMember.email}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="dob"> Phone</label>
                    <input
                      type="string"
                      ref={phone}
                      className="form-control"
                      name="dob"
                      defaultValue={currentMember.phone}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="dob"> Address</label>
                  <input
                    type="text"
                    ref={address}
                    className="form-control"
                    name="dob"
                    defaultValue={currentMember.address}
                  />
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
export default EditProfile;
