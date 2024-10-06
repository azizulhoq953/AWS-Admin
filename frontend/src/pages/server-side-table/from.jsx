import React, { useState } from 'react';
import axios from 'axios';

function CreateDistributionForm() {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDistribution = { name, value };
      const response = await axios.post('http://localhost:8080/api/distributions', newDistribution);
      if (response.status === 201) {
        alert('Distribution created successfully');
        // You can also refetch the distributions list here if needed
      }
    } catch (error) {
      console.error("Error creating distribution:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Value:</label>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} required />
      </div>
      <button type="submit">Create Distribution</button>
    </form>
  );
}

export default CreateDistributionForm;
