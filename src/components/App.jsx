import React, { Component } from 'react';
import { Notify } from 'notiflix';

import { Filter, ContactList, Section, ContactForm } from './index';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    if (!!localStorage.getItem('contacts')) {
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
    }
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDelete = e => {
    const { contacts } = this.state;
    const contactId = e.target.parentNode.id;
    const contactName = contacts.find(contact => contact.id === contactId).name;
    Notify.info(`${contactName} is deleted from contacts.`);
    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts.filter(contact => contact.id !== contactId),
        ],
      };
    });
  };

  handleAddContact = contact => {
    const { name, number, id } = contact;
    const { contacts } = this.state;
    const isNameAlreadyAdded = contacts.find(
      c => c.name.toLowerCase() === name.toLowerCase()
    );
    const isNumberAlreadyAdded = contacts.find(c => c.number === number);

    if (isNameAlreadyAdded || isNumberAlreadyAdded) {
      isNameAlreadyAdded && Notify.failure(`${name} is already in contacts.`);
      isNumberAlreadyAdded &&
        Notify.failure(
          `${number} is already in contacts as ${isNumberAlreadyAdded.name}.`
        );
    } else {
      Notify.success(`${name} is added to contacts.`);
      this.setState(prevState => {
        return {
          contacts: [
            ...prevState.contacts,
            {
              name: name,
              number: number,
              id: id,
            },
          ],
        };
      });
    }
  };

  render() {
    return (
      <>
        <Section title="Phonebook">
          <ContactForm onAddContact={this.handleAddContact} />
        </Section>
        <Section title="Contacts">
          <Filter onChange={this.handleChange} />
          <ContactList
            contacts={this.state.contacts}
            filter={this.state.filter}
            onClick={this.handleDelete}
          />
        </Section>
      </>
    );
  }
}
