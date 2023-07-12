import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnalyticsDashboard = () => {
  const [popularDish, setPopularDish] = useState('');
  const [peakHours, setPeakHours] = useState([]);
  const [totalSales, setTotalSales]= useState(0);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/analytics');
        const { popularDish, peakHours, totalSales } = response.data;

        setPopularDish(popularDish);
        setPeakHours(peakHours);
        setTotalSales(totalSales);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <h2>Popular Dish: {popularDish}</h2>
      <h2>Peak Hours:</h2>
      <ul>
        {peakHours.map((hour) => (
          <li key={hour}>{hour}</li>
        ))}
      </ul>
      <h2>Total Sales: ${totalSales}</h2>
    </div>
  );
};

export default AnalyticsDashboard;
