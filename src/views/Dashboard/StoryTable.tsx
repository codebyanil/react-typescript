import React from 'react';
import { Link } from 'react-router-dom';
import PageLoading from '../../components/elements/Loading';

interface Props {
  books:Array<any>,
  isLoading:any
}

const StoryTable = ({ books, isLoading }:Props) => {
  return (
    <div className="row">
      <div className="card col-md-12 mb-3">
        <div className="card-body">
          <div className="panel panel-default">
            <PageLoading isLoading={isLoading} />
            <div className="panel-heading">
              <h3 className="text-left"><small>Stories</small></h3>
            </div>
            <div className="panel-body ">
              {books && books.length > 0 ? (
                <div>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col"><i className="fa fa-star" /></th>
                        <th scope="col">title</th>
                        <th scope="col">Address</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map((book) => (
                        <tr key={book.id}>
                          <td>{book.id}</td>
                          <td>
                            <Link to={`stories/${book.id}`}>{book.title}</Link>
                          </td>
                          <td>{book.address}</td>
                          <td>{book.description ? book.description : 'N/A'}</td>
                          <td>{(book.date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="card-footer com-card-footer">
                    <Link
                      to="/story"
                      className="btn btn-primary py-2 px-3 mx-0 float-right"
                    >
                      <i className=" fa fa-eye mr-1" />
View Story
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="container-fluid">
                  <p className=" text-center mb-0 pb-4 border border-light pt-4 bg-white">
                    {isLoading ? (<span>loading...</span>) : (
                      <span>No stories available</span>)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
export default StoryTable;
