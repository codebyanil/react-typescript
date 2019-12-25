import React, { FormEvent, useRef, useState } from 'react';
import { notification } from 'antd';
import ModalPageLoading from '../../components/elements/Loading/ModelPageLoading';
import { RequestData } from '../../types';
import { storyAdd } from '../../api/story';

interface Props {
  addStory: any,
}

const AddStory = ({ addStory }: Props) => {
  const title: any = useRef();
  const address: any = useRef();
  const date: any = useRef();
  const description: any = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    address: '',
    description: '',
    date: '',
  });

  const handleSubmit = (event: FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    // clear errors
    setErrors({
      title: '',
      address: '',
      description: '',
      date: '',
    });
    const story = {
      title: title.current.value,
      address: address.current.value,
      date: date.current.value,
      description: description.current.value,
    };
    storyAdd(story).then((response: RequestData) => {
      if (response) {
        // passing props to parent to child component
        addStory();
        // clearing an input field after form submit
        title.current.value = '';
        address.current.value = '';
        date.current.value = '';
        description.current.value = '';
        // // close modal
        const el: HTMLElement | null = document.getElementById('btnCloseAddStoryModal');
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
      id="AddStoryModal"
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
              <i className="fa fa-book mr-2" />
              Create
              a new story
            </h5>
            <button
              type="button"
              id="btnCloseAddStoryModal"
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
                  ref={title}
                  className="form-control"
                  name="crawler_name"
                  required
                />
                <small className="text-danger">{errors.title}</small>
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
                  <label htmlFor="title">Date:</label>
                  <input
                    type="date"
                    ref={date}
                    className="form-control"
                    name="dob"
                  />
                  <small className="text-danger">{errors.date}</small>
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
export default AddStory;
