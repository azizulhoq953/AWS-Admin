import React, { useState } from 'react';
import '../non-console/pages.css'
const ManageTags = () => {
  const [tags, setTags] = useState([]);
  const [tagKey, setTagKey] = useState('');
  const [tagValue, setTagValue] = useState('');

  // Function to add a new tag
  const addTag = (e) => {
    e.preventDefault();
    if (tagKey && tagValue) {
      setTags([...tags, { key: tagKey, value: tagValue }]);
      setTagKey('');
      setTagValue('');
    }
  };

  // Function to remove a tag
  const removeTag = (key) => {
    setTags(tags.filter(tag => tag.key !== key));
  };

  return (
    <div className="container">
      <h1>AWS Manage Tags</h1>
      <form onSubmit={addTag}>
        <div className="form-group">
          <label htmlFor="tagKey">Tag Key:</label>
          <input
            type="text"
            id="tagKey"
            value={tagKey}
            onChange={(e) => setTagKey(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tagValue">Tag Value:</label>
          <input
            type="text"
            id="tagValue"
            value={tagValue}
            onChange={(e) => setTagValue(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Tag</button>
      </form>

      <h2>Existing Tags</h2>
      <ul>
        {tags.length === 0 ? (
          <li>No tags available.</li>
        ) : (
          tags.map(tag => (
            <li key={tag.key}>
              {tag.key}: {tag.value} <button onClick={() => removeTag(tag.key)}>Remove</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ManageTags;
