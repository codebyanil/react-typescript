import React from 'react';
import { Link } from 'react-router-dom';
import { Contact } from '../../types';

interface Props {
  contacts: Array<Contact>,
  setSelectedContactId:any,
  setCurrentContact:any,
  isLoading: boolean;
}

const Table = ({ contacts, setSelectedContactId, setCurrentContact }:Props) => {
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col"><i className="fa fa-star" /></th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">DOB</th>
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
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td><Link to={`data/${contact.id}`}>{contact.name}</Link></td>
              <td>{contact.email}</td>
              <td>{contact.address}</td>
              <td>{contact.phone}</td>
              <td>{contact.dob}</td>
              <td>{contact.description}</td>
              <td className="text-center d-flex">
                <Link
                  to={`data/${contact.id}`}
                  className="btn btn-primary mr-2"
                >
                  <i
                    className="fa fa-eye"
                  />
                </Link>
                <button
                  onClick={() => {
                    setCurrentContact(contact);
                  }}
                  className="btn btn-success mr-2"
                  data-toggle="modal"
                  data-target="#EditContactModal"
                >
                  <i className="fa fa-pen" />
                </button>
                <button
                  onClick={() => {
                    setSelectedContactId(contact.id);
                  }}
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target="#DeleteContactModal"
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
export default Table;
