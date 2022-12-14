import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import { Container } from './PhoneBook.styled';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from 'components/redux/selectors';
import * as phonebookOperations from 'components/redux/phonebookOperations';
import { useEffect } from 'react';

export default function Phonebook() {
  const contactsRedux = useSelector(selectContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    dispatch(phonebookOperations.fetchContacts(controller.signal));
    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return (
    <Container className="Phonebook_container">
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      {contactsRedux.length !== 0 && (
        <>
          <Filter />
          <ContactList />
        </>
      )}
    </Container>
  );
}
