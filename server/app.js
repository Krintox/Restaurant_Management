const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reservationRoutes = require('./routes/reservation');
const orderRoutes = require('./routes/order');
const inventoryRoutes = require('./routes/inventory');
const staffRoutes = require('./routes/staff');
const analyticsRoutes = require('./routes/analytics');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(cors());
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Routes
app.use('/api', reservationRoutes);
app.use('/api', orderRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', staffRoutes);
app.use('/api', analyticsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
