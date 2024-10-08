import React, { useState } from 'react';
import axios from 'axios';

const ClientForm: React.FC = () => {
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/clients', {
        Name: name,
        ContactPerson: contactPerson,
        Email: email,
      });
      alert('Client added successfully');
      setName('');
      setContactPerson('');
      setEmail('');
    } catch (error) {
      console.error('Error adding client:', error);
      alert('Error adding client');
    }
  };

  return (
    <div>
      <h1>Add Client</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contactPerson">Contact Person:</label>
          <input
            type="text"
            id="contactPerson"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Client</button>
      </form>
    </div>
  );
};

export default ClientForm;