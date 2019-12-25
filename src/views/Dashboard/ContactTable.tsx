import React from 'react';
import { Link } from 'react-router-dom';
import { Contact } from '../../types';
import PageLoading from '../../components/elements/Loading';

interface Props {
  contacts: Array<Contact>;
  isLoading: boolean;
}

const ContactTable = ({ contacts, isLoading}: Props) => {
  return (
    <div className="row ">
      <div className="card col-md-12 mb-3">
        <div className="card-body">
          <div className="panel panel-default">
            <PageLoading isLoading={isLoading} />
            <div className="panel-heading">
              <h3 className="text-left"><small>Contacts</small></h3>
            </div>
            <div className="panel-body ">
              {contacts && contacts.length > 0 ? (
                <div>
                  <table className="table table-hover responsive">
                    <thead>
                      <tr>
                        <th scope="col"><i className="fa fa-star" /></th>
                        <th scope="col">Name</th>
                        <th scope="col">email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone</th>
                        <th scope="col">DOB</th>
                        <th scope="col">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.id}</td>
                          <td>
                            <Link
                              to={`data/${contact.id}`}
                            >
                              {contact.name}
                            </Link>
                          </td>
                          <td>{contact.email}</td>
                          <td>{contact.address}</td>
                          <td>{contact.phone}</td>
                          <td>{contact.dob}</td>
                          <td>{contact.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="card-footer com-card-footer">
                    <Link
                      to="/contact"
                      className="btn btn-primary py-2 px-3 mx-0 float-right"
                    >
                      <i className=" fa fa-eye mr-1" />
                      View Contact
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="container-fluid">
                  <p
                    className=" text-center mb-0 pb-4 border border-light pt-4 bg-white"
                  >
                    {isLoading ? (<span>loading...</span>) : (
                      <span>No contacts available</span>)}
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
export default ContactTable;
