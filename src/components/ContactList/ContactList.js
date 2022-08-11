import PropTypes from 'prop-types';
import React, { Component } from 'react';
import s from './ContactList.module.css';

export default class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    filter: PropTypes.string,
  };

  render() {
    const { contacts, filter, onClick } = this.props;
    const filtredContactList = contacts.filter(contact => {
      const name = contact.name.toLowerCase();
      return name.includes(filter.toLowerCase());
    });

    return (
      <ul className={s.list}>
        {filtredContactList.map(contact => {
          return (
            <Contact key={contact.id} contact={contact} onClick={onClick} />
          );
        })}
      </ul>
    );
  }
}

class Contact extends Component {
  static propTypes = {
    contact: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { contact, onClick } = this.props;
    const { id, name, number } = contact;
    return (
      <li id={id} className={s.item}>
        <p>
          {name}: {number}
        </p>
        <button className={s.button} type="button" onClick={onClick}>
          Delete
        </button>
      </li>
    );
  }
}
