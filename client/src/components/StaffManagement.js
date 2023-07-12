import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffManagement = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [shift, setShift] = useState('');

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/staff');
        setStaffMembers(response.data);
      } catch (error) {
        console.error('Error fetching staff members:', error);
      }
    };

    fetchStaffMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/staff', {
        name,
        position,
        shift,
      });

      if (response.status === 201) {
        alert('Staff member added successfully!');
        setName('');
        setPosition('');
        setShift('');
      }
    } catch (error) {
      console.error('Error adding staff member:', error);
      alert('Staff member addition failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Staff Management</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="shift">Shift:</label>
          <input
            type="text"
            id="shift"
            name="shift"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Staff Member</button>
      </form>
      <h2>Staff Members:</h2>
      {staffMembers.map((staffMember) => (
        <div key={staffMember._id}>
          <p>Name: {staffMember.name}</p>
          <p>Position: {staffMember.position}</p>
          <p>Shift: {staffMember.shift}</p>
        </div>
      ))}
    </div>
  );
};

export default StaffManagement;
