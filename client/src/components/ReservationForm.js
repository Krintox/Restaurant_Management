import React, { useState } from 'react';
import axios from 'axios';

const ReservationForm = () => {
  const [tableId, setTableId] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [customerName, setCustomerName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/reservations', {
        tableId,
        date,
        timeSlot,
        customerName,
      });

      if (response.status === 201) {
        alert('Reservation successful!');
        setTableId('');
        setDate('');
        setTimeSlot('');
        setCustomerName('');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Reservation failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Reservation Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tableId">Table:</label>
          <input
            type="text"
            id="tableId"
            name="tableId"
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="timeSlot">Time Slot:</label>
          <input
            type="text"
            id="timeSlot"
            name="timeSlot"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reserve Table</button>
      </form>
    </div>
  );
};

export default ReservationForm;
