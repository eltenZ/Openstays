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

// API route to fetch all accommodations
app.get('/api/accommodations', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM accommodations');

    // Convert numeric fields to actual numbers
    const accommodations = rows.map(row => ({
      ...row,
      price_per_night: parseFloat(row.price_per_night), // Ensure it's a number
    }));

    res.json(accommodations);
  } catch (err) {
    console.error('Error fetching accommodations:', err.message);
    res.status(500).json({ error: 'Failed to fetch accommodations' });
  }
});
// API route to fetch accommodation by ID
app.get('/api/accommodation/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM accommodations WHERE id = $1', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Accommodation not found' });
    }
  } catch (err) {
    console.error('Error fetching accommodation:', err.message);
    res.status(500).json({ error: 'Failed to fetch accommodation' });
  }
});

// API route to upload accommodation data with images
app.post('/api/accommodations', upload.array('images', 10), async (req, res) => {
  const { title, description, price_per_night, location, city, country, max_guests } = req.body;

  // Validate required fields
  if (!title || !description || !price_per_night || !location || !city || !country || !max_guests) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate data types
  if (isNaN(parseFloat(price_per_night)) || isNaN(parseInt(max_guests))) {
    return res.status(400).json({ error: 'Invalid data types' });
  }

  // Validate data ranges
  if (price_per_night <= 0 || max_guests < 1) {
    return res.status(400).json({ error: 'Invalid data ranges' });
  }

  // Get image URLs
  const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

  try {
    const { rows } = await pool.query(
      `INSERT INTO accommodations
       (title, description, price_per_night, location, city, country, max_guests, images)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title, description, price_per_night, location, city, country, max_guests, imageUrls]
    );

    res.status(201).json({ message: 'Accommodation added successfully', accommodation: rows[0] });
  } catch (err) {
    console.error('Error adding accommodation:', err.message);
    res.status(500).json({ error: 'Failed to add accommodation' });
  }
});

// Serve React frontend
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
