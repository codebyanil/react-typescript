import React, { useEffect, useState } from 'react';
import { History } from 'history';
import MainLayout from '../../layouts/MainLayout';
import ContactTable from './ContactTable';
import StoryTable from './StoryTable';
import { listContact } from '../../api/contact';
import { listStory } from '../../api/story';
import { getToken } from '../../library/auth';
import { RequestData } from '../../types';
import { aggregate } from '../../api/report';
import Card from './Card';

interface Props {
  history: History
}

const Dashboard = ({ history }: Props) => {
  const [contacts, setContacts] = useState([]);
  const [book, setBook] = useState([]);
  const [count, setCount] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // fetch contacts
  const ContactList = () => {
    setIsLoading(true);
    const params = {
      per_page: 5,
    };
    listContact(params)
      .then((response: RequestData) => {
        setContacts(response.data || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const Report = () => {
    aggregate()
      .then((response: RequestData) => {
        setCount(response || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // fetch  story
  const BookList = () => {
    setIsLoading(true);
    const params = {
      per_page: 5,
    };
    listStory(params)
      .then((response) => {
        setBook(response.data || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!getToken()) {
      history.push('/login');
    }
    ContactList();
    BookList();
    Report();
  }, [history]);

  return (
    <div>
      <MainLayout />
      <div className="wrapper-main-content auto">
        <div className="container main-content color-gray-light pt-4">
          <nav className="nav flex-column">
            <div className="sidebar-header">
              <h3>Dashboard</h3>
            </div>
          </nav>
          {/* <!--Cards Component--!> */}
          <section className="section-cards ">
            <Card count={count} />

            {/* <!--Contacts Component--!> */}
            <ContactTable
              contacts={contacts}
              isLoading={isLoading}
            />

            {/* <!--StoryTable Component--!> */}
            <StoryTable
              books={book}
              isLoading={isLoading}
            />
          </section>
        </div>
      </div>

    </div>

  );
};

export default Dashboard;
