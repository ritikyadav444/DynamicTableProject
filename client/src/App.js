import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [newRow, setNewRow] = useState({ serial: '', name: '', city: '', cgpa: '', phone: '' });
  // 
  const fetchTableData = async () => {
    const response = await fetch('http://localhost:5000/api/data');
    const tableData = await response.json();
    setData(tableData);
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleAddRow = async () => {
    // Make an API request to add a new row to the database (Step 5).
    await fetch('http://localhost:5000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRow),
    });

    // Refresh the table data.
    fetchTableData();

    // Clear the form.
    setNewRow({ serial: '', name: '', city: '', cgpa: '', phone: '' });
  };

  const handleDeleteRow = async (id) => {
    // Make an API request to delete a row from the database (Step 6).
    await fetch(`http://localhost:5000/api/data/${id}`, {
      method: 'DELETE',
    });

    // Refresh the table data.
    fetchTableData();
  };

  return (
    <div className="App">
    <h1 style={{ fontWeight: 'bold' }}>Dynamic Table</h1>
    <table style={{ border: '1px solid #ccc', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc', padding: '8px', fontWeight: 'bold' }}>Serial Number</th>
          <th style={{ border: '1px solid #ccc', padding: '8px', fontWeight: 'bold' }}>Name</th>
          <th style={{ border: '1px solid #ccc', padding: '8px', fontWeight: 'bold' }}>City</th>
          <th style={{ border: '1px solid #ccc', padding: '8px', fontWeight: 'bold' }}>CGPA</th>
          <th style={{ border: '1px solid #ccc', padding: '8px', fontWeight: 'bold' }}>Phone Number</th>
          <th style={{ border: '1px solid #ccc', padding: '8px', fontWeight: 'bold' }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row._id}>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.serial}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.name}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.city}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.cgpa}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.phone}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <button onClick={() => handleDeleteRow(row._id)}>Delete</button>
            </td>
          </tr>
        ))}
          <tr>
            <td>
              <input
                type="text"
                value={newRow.serial}
                onChange={(e) => setNewRow({ ...newRow, serial: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={newRow.name}
                onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={newRow.city}
                onChange={(e) => setNewRow({ ...newRow, city: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={newRow.cgpa}
                onChange={(e) => setNewRow({ ...newRow, cgpa: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={newRow.phone}
                onChange={(e) => setNewRow({ ...newRow, phone: e.target.value })}
              />
            </td>
            <td>
              <button onClick={handleAddRow}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
