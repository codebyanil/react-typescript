import React, { useEffect, useState } from 'react';
import { deleteContact } from '../../api/contact';
import ModalPageLoading from '../../components/elements/Loading/ModelPageLoading';

interface Props{
  contactId:any,
  contactDelete:any
}

const DeleteContact = ({ contactId, contactDelete }:Props) => {
  const [contactID, setContactID] = useState(contactId);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      setContactID(contactId);
    },
    [setContactID, contactID, contactId],
  );
  const handleClick = () => {
    setIsLoading(true);
    deleteContact(contactId).then(() => {
      // check response.data
      setIsLoading(false);
      contactDelete(contactId);
      // close modal
      const el = document.getElementById('btnCloseContactDeleteModal');
      if (el) {
        el.click();
      }
    }).finally(() => {
      setIsLoading(false);
    });
  };
  return (
    <section className="section-modal">
      <div
        className="modal fade"
        id="DeleteContactModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          role="document"
        >
          <div className="modal-content position-relative">
            <div className="modal-header bg-primary text-white">
              <h5
                className="modal-title"
                id="exampleModalLongTitle"
              >
                <i className="fa fa-trash mr-2" />
                Confirm
                delete
              </h5>
              <button
                type="button"
                id="btnCloseContactDeleteModal"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body pb-0 position-relative">
              <ModalPageLoading isLoading={isLoading} />
              <p className="text-bold"><strong>Are you sure?</strong></p>
              <p className="text-muted">Delete this contact permanently??</p>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-danger"
                onClick={handleClick}
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default DeleteContact;
