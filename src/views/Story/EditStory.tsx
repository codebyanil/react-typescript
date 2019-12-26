import React, { FormEvent, useEffect, useRef, useState } from 'react';
import ModalPageLoading from '../../components/elements/Loading/ModelPageLoading';
import { storyUpdate } from '../../api/story';

interface Props {
  story: any,
  updateStory:any
}

const EditStory = ({ story, updateStory }:Props) => {
  // int the data
  const [currentStory, setCurrentStory] = useState(story);
  const [isLoading, setIsLoading] = useState(false);
  // using useEffect
  useEffect(() => {
    setCurrentStory(story);
  }, [story, setCurrentStory]);

  // useRef
  const title: any = useRef();
  const address: any = useRef();
  const date: any = useRef();
  const description: any = useRef();

  // formSubmit
  const handleSubmit = (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const user = {
      title: title.current.value,
      address: address.current.value,
      date: date.current.value,
      description: description.current.value,
    };
    const StoryId = story.id;
    storyUpdate(StoryId, user).then(() => {
      // passing data to child through props
      updateStory(story, story.id);
      // hide modal
      const el = document.getElementById('btnCloseEditStoryModal');
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
      id="EditStoryModal"
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
              Edit
              story
            </h5>
            <button
              type="button"
              id="btnCloseEditStoryModal"
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
                  ref={title}
                  className="form-control"
                  name="name"
                  defaultValue={currentStory.title}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="title">Address:</label>
                  <input
                    type="text"
                    ref={address}
                    className="form-control"
                    name="address"
                    defaultValue={currentStory.address}
                    required
                  />
                </div>
                <div className="form-group col-mod-6">
                  <label htmlFor="title">Date:</label>
                  <input
                    type="datetime"
                    ref={date}
                    className="form-control"
                    name="dob"
                    defaultValue={currentStory.date}
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
                  defaultValue={currentStory.description}
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

export default EditStory;
