import React, { useState } from "react";
import axios from "axios";
const UserForm = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/submit-form/", { username });
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
