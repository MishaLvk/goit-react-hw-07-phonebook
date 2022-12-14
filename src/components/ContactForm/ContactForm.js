import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Form, Label } from './ContactForm.styled';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from 'components/redux/selectors';
import * as phonebookOperations from 'components/redux/phonebookOperations';

export default function ContactForm() {
  const contactsRedux = useSelector(selectContacts);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (checkName(name)) {
      alert(name + ' is already in contacts');
      return false;
    }
    const contact = {
      name: name,
      phone: phone,
      key: nanoid(),
    };
    dispatch(phonebookOperations.addContact(contact));
    reset();
    return true;
  };

  const checkName = name => {
    const normalisedFilter = name.toLocaleLowerCase();

    return contactsRedux.some(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label className="Lable">
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
          placeholder="Name..."
        />
      </Label>
      <Label className="Lable">
        Phone
        <input
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={handleChange}
          placeholder="xxx-xx-xx"
        />
      </Label>

      <button type="submit">Add contact</button>
    </Form>
  );
}
