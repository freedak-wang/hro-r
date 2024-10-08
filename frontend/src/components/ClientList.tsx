import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Client {
  ID: number;
  Name: string;
  ContactPerson: string;
  Email: string;
}

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div>
      <h1>Client List</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.ID}>
            {client.Name} - {client.ContactPerson} ({client.Email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;