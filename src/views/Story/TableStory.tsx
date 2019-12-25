import React from 'react';
import { Link } from 'react-router-dom';
import { Story } from '../../types';

interface Props {
  stories: Array<Story>,
  setSelectedStoryId: any,
  setCurrentStory: any,
  isLoading: boolean;
}

const TableStory = ({ stories, setSelectedStoryId, setCurrentStory }: Props) => {
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col"><i className="fa fa-star" /></th>
            <th scope="col">title</th>
            <th scope="col">Address</th>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th
              scope="col"
              className="text-center"
            >
            Action
            </th>
          </tr>
        </thead>
        <tbody>
          {stories.map((story) => (
            <tr key={story.id}>
              <td>{story.id}</td>
              <td><Link to={`stories/${story.id}`}>{story.title}</Link></td>
              <td>{story.address}</td>
              <td>{story.date}</td>
              <td>{story.description}</td>
              <td className="text-center d-flex">
                <Link
                  to={`stories/${story.id}`}
                  className="btn btn-primary mr-2"
                >
                  <i
                    className="fa fa-eye"
                  />
                </Link>
                <button
                  onClick={() => {
                    setCurrentStory(story);
                  }}
                  className="btn btn-success mr-2"
                  data-toggle="modal"
                  data-target="#EditStoryModal"
                >
                  <i className="fa fa-pen" />
                </button>
                <button
                  onClick={() => {
                    setSelectedStoryId(story.id);
                  }}
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target="#DeleteStoryModal"
                >
                  <i className="fa fa-trash" />
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};
export default TableStory;
