import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const addedRepo = await api.post('repositories', { title: `Repository ${Date.now()}` })
    
    setRepository([...repositories, addedRepo.data])
  }

  async function handleRemoveRepository(id) {
    const deletedRepo = await api.delete(`/repositories/${id}`);

    setRepository(repositories.filter(r => r.id !== id));
  }

  return (
    <>
      <h1>Repositórios</h1>
      
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={ id }>
            { title }
            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
