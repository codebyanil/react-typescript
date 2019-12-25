import React from 'react';
import { Link } from 'react-router-dom';
import PageLoading from '../../components/elements/Loading';


interface Props{
  contacts:any,
  isLoading:boolean
}

const ViewTable = ({ contacts= [], isLoading }:Props) => {
  return (
    <div className="container">
      <div className="panel panel-default">
        <h1>
          <i className="fa fa-address-book" />
View Contact
        </h1>
        <div className="panel-heading" />
        <div className="panel-body ">
          <PageLoading isLoading={isLoading} />
          <div className="d-flex">
            <h4>
              <Link
                to="/contact"
                className="btn btn-primary mr-2 float-right"
              >
                <i className="fa fa-arrow-left" />
                {' '}
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
                    {' '}
Name:
                  </th>
                  <td className="p-2">{contacts.name}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="p-2"
                  >
Email:
                  </th>
                  <td className="p-2">{contacts.email}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="p-2"
                  >
Address:
                  </th>
                  <td className="p-2">{contacts.address}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="p-2"
                  >
Phone:
                  </th>
                  <td className="p-2">{contacts.phone}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="p-2"
                  >
DOB:
                  </th>
                  <td className="p-2">{contacts.dob ? contacts.dob : 'N/A'}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="p-2"
                  >
Description:
                  </th>
                  <td className="p-2">{contacts.description ? contacts.description : 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTable;
