import React, { useEffect, useState } from 'react';
import ViewTable from './ViewTable';
import { getContact } from '../../api/contact';

interface Props{
  match: any;
}

const ViewContact = ({ match }: Props) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const contactId = match.params.id;
    getContact(contactId)
      .then((response) => {
        setContacts(response.data || []);
      }).finally(() => {
        setIsLoading(false);
      });
  }, [match.params.id, setContacts]);

  return (
    <div>
      <ViewTable
        contacts={contacts}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ViewContact;
