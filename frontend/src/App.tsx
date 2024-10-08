import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Clients</Link>
            </li>
            <li>
              <Link to="/add-client">Add Client</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ClientList />} />
          <Route path="/add-client" element={<ClientForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;