import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import { Container } from './PhoneBook.styled';
import { useSelector } from 'react-redux';
import { selectContacts } from 'components/redux/selectors';

export default function Phonebook() {
  const contactsRedux = useSelector(selectContacts);

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
