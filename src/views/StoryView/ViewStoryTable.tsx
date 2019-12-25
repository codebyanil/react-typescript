import React from 'react';
import { Link } from 'react-router-dom';
import PageLoading from '../../components/elements/Loading';

interface Props{
  stories:any,
  isLoading:boolean
}

const ViewStoryTable = ({ stories = [], isLoading }:Props) => {
  return (
    <div className="container">
      <div className="panel panel-default">
        <h1>
          <i className="fa fa-book" />
          View Story
        </h1>
        <div className="panel-heading" />
        <div className="panel-body ">
          <PageLoading isLoading={isLoading} />
          <div className="d-flex">
            <h4>
              <Link
                to="/story"
                className="btn btn-primary mr-2 float-right"
              >
                <i className="fa fa-arrow-left" />
                Back
              </Link>
            </h4>
          </div>
          <div className="table-responsive">
            <table className="table table-hover">
              <tbody>
                <tr>
                  <th
                    scope="row"
                    className="p-2"
                  >
                  Title:
                  </th>
                  <td className="p-2">{stories.title}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="p-2"
                  >
                  Address:
                  </th>
                  <td className="p-2">{stories.address}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="p-2"
                  >
                  Date:
                  </th>
                  <td className="p-2">{stories.date ? stories.date : 'N/A'}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="p-2"
                  >
                  Description:
                  </th>
                  <td className="p-2">{stories.description ? stories.description : 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStoryTable;
