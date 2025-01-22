// src/components/TextInput.jsx
import React, { useState } from 'react';
import './TextInput.css';

const TextInput = () => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the input submission, e.g., send to AI
    console.log('User input:', input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="text-input-form">
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={handleChange}
        className="text-input-field"
      />
    </form>
  );
};

export default TextInput;
