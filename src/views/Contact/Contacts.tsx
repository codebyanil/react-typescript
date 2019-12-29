import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import PageLoading from '../../components/elements/Loading';
import Table from './Table';
import { Contact, RequestData } from '../../types';
import AddContact from './AddContact';
import { listContact } from '../../api/contact';
import DeleteContact from './DeleteContact';
import EditContact from './EditContact';

const Contacts = () => {
  const [contacts, setContacts] = useState<Array<Contact>>([]);
  const per_page: any = useRef();
  const search: any = useRef();
  const unmounted: any = useRef(false);
  const Page = [5, 10, 20, 50];
  const [perpage] = useState(Page);
  const [page, setPage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [currentContact, setCurrentContact] = useState({
    id: null,
    name: '',
    email: '',
    address: '',
    phone: '',
    photo_url: '',
    dob: '',
    description: '',
  });

  const ContactList = useCallback(() => {
    setIsLoading(true);
    const params = {
      per_page: per_page.current.value || null,
      keyword: search.current.value || null,
    };
    listContact(params)
      .then((response: RequestData) => {
        setContacts(response.data || []);
      })
      .finally(() => {
        if (!unmounted.current) {
          setIsLoading(false);
        }
      });
  }, []);

  const handlePage = (event: any) => {
    const selected = event.target.value;
    if (selected !== page) {
      setPage(event.target.value);
      ContactList();
    }
  };

  // add contact
  function addContact() {
    setIsLoading(true);
    ContactList();
  }

  // delete contact
  function contactDelete(contactId: any) {
    setIsLoading(true);
    setContacts(contacts.filter((contact) => contact.id !== contactId));
    ContactList();
  }

  // update contact
  function updateContact(id: number, updateContact: any) {
    setIsLoading(true);
    setContacts(contacts.map((contact) => (contact.id === id ? updateContact : contact)));
    ContactList();
  }


  useEffect(() => {
    ContactList();
    return () => {
      unmounted.current = true;
    };
  }, [ContactList]);

  return (
    <div className="container">
      <MainLayout />
      <div className="panel panel-default">
        <h1>
          <i className="fa fa-address-book" />
          ContactLists
        </h1>
        <div className="panel-body ">
          <div className="d-flex">
            <h4>
              <button
                type="submit"
                className=" btn btn-primary mr-2"
                data-toggle="modal"
                data-target="#AddContactModal"
              >
                <i className="fa fa-plus mr-1" />
                Create
              </button>
            </h4>
            <h4>
              <Link
                to="/"
                className="btn btn-primary mr-2 float-right"
              >
                <i className="fa fa-arrow-left mr-1" />
                Back
              </Link>
            </h4>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row justify-content-center align-items-center">
              <label className="mr-2">Perpage:</label>
              <select
                ref={per_page}
                onChange={(event) => handlePage(event)}
                className="form-control"
              >
                {perpage.map((page, i) => {
                  return (
                    <option
                      key={i}
                      defaultValue={page}
                    >
                      {page || 10}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group d-flex flex-row float-right w-50">
              <label
                htmlFor="search"
                className="mr-2 mt-2"
              >
                Search:
              </label>
              <input
                type="text"
                className="form-control search-input"
                ref={search}
                onChange={ContactList}
                aria-describedby="search"
                placeholder="search"
              />
            </div>
          </div>
          <PageLoading isLoading={isLoading} />
          {contacts && contacts.length > 0 ? (
            <div>
              <Table
                contacts={contacts}
                isLoading={isLoading}
                setCurrentContact={setCurrentContact}
                setSelectedContactId={setSelectedContactId}
              />
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
        <AddContact addContact={addContact} />
        <DeleteContact
          contactId={selectedContactId}
          contactDelete={contactDelete}
        />
        <EditContact
          contact={currentContact}
          updateContact={updateContact}
        />
      </div>
    </div>
  );
};
export default Contacts;
