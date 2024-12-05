const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded payloads

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Placeholder data for accommodations (replace with real database integration)
const accommodations = [
  {
    id: 1,
    name: 'Cozy Beachfront Villa',
    description: 'Experience luxury living with ocean views.',
    price: 'KES 15,000 per night',
    image: '/images/villa.jpg',
    address: 'Diani Beach, Kwale County',
  },
  {
    id: 2,
    name: 'Modern City Apartment',
    description: 'Located in the heart of the city.',
    price: 'KES 10,000 per night',
    image: '/images/apartment.jpg',
    address: 'Nairobi City',
  },
  {
    id: 3,
    name: 'Rustic Cabin Retreat',
    description: 'Perfect for nature lovers and adventurers.',
    price: 'KES 8,000 per night',
    image: '/images/cabin.jpg',
    address: 'Maasai Mara, Narok County',
  },
];

// API Routes
// Get all accommodations
app.get('/api/accommodations', (req, res) => {
  res.json(accommodations);
});

// Get accommodation by ID
app.get('/api/accommodation/:id', (req, res) => {
  const accommodation = accommodations.find(
    (item) => item.id === parseInt(req.params.id, 10)
  );
  if (accommodation) {
    res.json(accommodation);
  } else {
    res.status(404).json({ error: 'Accommodation not found' });
  }
});

// Serve React frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Handle client-side routing for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
