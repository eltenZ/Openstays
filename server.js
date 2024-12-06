const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

// PostgreSQL Database connection
const pool = new Pool({
  user: 'u0_a367',
  host: 'localhost',
  database: 'openstays_db',
  password: null, // No password
  port: 5432,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API route to fetch all accommodations
app.get('/api/accommodations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM accommodations');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching accommodations:', err.message);
    res.status(500).json({ error: 'Failed to fetch accommodations.' });
  }
});

// API route to fetch accommodation by ID
app.get('/api/accommodation/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM accommodations WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Accommodation not found.' });
    }
  } catch (err) {
    console.error('Error fetching accommodation:', err.message);
    res.status(500).json({ error: 'Failed to fetch accommodation.' });
  }
});

// Serve React frontend
app.use(express.static(path.join(__dirname, 'client', 'build')));
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
