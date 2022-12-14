import { ListContact, ContactListList } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import * as phonebookOperations from 'components/redux/phonebookOperations';

import { useEffect } from 'react';
import { selectContacts } from 'components/redux/selectors';

export default function ContactList() {
  const filterValue = useSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    dispatch(phonebookOperations.fetchContacts(controller.signal));
    return () => {
      controller.abort();
    };
  }, [dispatch]);

  const contactsRedux = useSelector(selectContacts);
  const filterContacts = () => {
    const normalisedFilter = filterValue.toLocaleLowerCase();
    return contactsRedux.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  return (
    <ListContact>
      {filterContacts().map(contact => (
        <ContactListList key={contact.key}>
          {contact.name}: {contact.phone}
          <button
            onClick={() =>
              dispatch(phonebookOperations.deleteContact(contact.id))
            }
          >
            Delete
          </button>
        </ContactListList>
      ))}
    </ListContact>
  );
}
