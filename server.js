const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const { Pool } = require('pg'); // PostgreSQL module

const app = express();
const port = process.env.PORT || 5000;

// PostgreSQL Database connection
const pool = new Pool({
  user: 'u0_a367', // Correct database user
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'openstays',
  password: process.env.DB_PASSWORD || null, // Add the correct password here if applicable
  port: process.env.DB_PORT || 5432,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'client/public/images')));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'client/public/uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const baseName = req.body.title.replace(/ /g, '_').toLowerCase();
    cb(null, `${baseName}-${Date.now()}${fileExtension}`);
  },
});
const upload = multer({ storage });

// Accommodation Routes
// Fetch all accommodations
app.get('/api/accommodations', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM accommodations');
    const accommodations = rows.map(row => ({
      ...row,
      price_per_night: parseFloat(row.price_per_night),
    }));
    res.json(accommodations);
  } catch (err) {
    console.error('Error fetching accommodations:', err.message);
    res.status(500).json({ error: 'Failed to fetch accommodations' });
  }
});

// Fetch accommodation by ID
app.get('/api/accommodation/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM accommodations WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Accommodation not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching accommodation:', err.message);
    res.status(500).json({ error: 'Failed to fetch accommodation' });
  }
});

// Check availability
app.get('/api/availability', async (req, res) => {
  const { accommodation_id, start_date, end_date } = req.query;
  try {
    const { rows } = await pool.query(
      `SELECT * FROM availability
       WHERE accommodation_id = $1
         AND start_date <= $2
         AND end_date >= $3
         AND is_available = true`,
      [accommodation_id, start_date, end_date]
    );
    res.json(rows.length > 0 ? { available: true } : { available: false });
  } catch (err) {
    console.error('Error checking availability:', err.message);
    res.status(500).json({ error: 'Failed to check availability' });
  }
});

// Book accommodation
app.post('/api/bookings', async (req, res) => {
  const { accommodation_id, user_id, start_date, end_date } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO bookings (accommodation_id, user_id, start_date, end_date, status)
       VALUES ($1, $2, $3, $4, 'Pending Payment') RETURNING *`,
      [accommodation_id, user_id, start_date, end_date]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error creating booking:', err.message);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Upload accommodation with images
app.post('/api/accommodations', upload.array('images'), async (req, res) => {
  const { title, description, price_per_night, location, city, country, max_guests } = req.body;

  if (!title || !description || !price_per_night || !location || !city || !country || !max_guests) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
  try {
    const { rows } = await pool.query(
      `INSERT INTO accommodations
       (title, description, price_per_night, location, city, country, max_guests, images)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, description, price_per_night, location, city, country, max_guests, imageUrls]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error adding accommodation:', err.message);
    res.status(500).json({ error: 'Failed to add accommodation' });
  }
});

// Trip Routes
// Fetch all trips
app.get('/api/trips', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM trips ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching trips:', error.message);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

// Fetch trip details by ID
app.get('/api/trips/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM trips WHERE id = $1', [id]);
    if (!rows.length) return res.status(404).json({ error: 'Trip not found' });
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching trip:', error.message);
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
});

// Create a new trip
app.post('/api/trips', async (req, res) => {
  const { title, description, location, image, price, dates, max_guests, duration } = req.body;
  if (!title || !description || !location || !price || !max_guests) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const { rows } = await pool.query(
      `INSERT INTO trips (title, description, location, image, price, dates, max_guests, duration)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, description, location, image, price, dates, max_guests, duration]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating trip:', error.message);
    res.status(500).json({ error: 'Failed to create trip' });
  }
});

// API to get all picnics
app.get('/api/picnics', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM picnics');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to get a single picnic by ID
app.get('/api/picnics/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM picnics WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Picnic not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to create a new picnic
app.post('/api/picnics', async (req, res) => {
  const { title, description, date, location, price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO picnics (title, description, date, location, price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, date, location, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to update a picnic
app.put('/api/picnics/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location, price } = req.body;
  try {
    const result = await pool.query(
      'UPDATE picnics SET title = $1, description = $2, date = $3, location = $4, price = $5 WHERE id = $6 RETURNING *',
      [title, description, date, location, price, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Picnic not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to delete a picnic
app.delete('/api/picnics/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM picnics WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Picnic not found' });
    }
    res.status(200).json({ message: 'Picnic deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve React frontend
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
