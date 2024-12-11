const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

// PostgreSQL Database connection
const pool = new Pool({
  user: 'u0_a367', // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'openstays',
  password: null, // Replace with your PostgreSQL password if any
  port: 5432,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'client/build/images');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const baseName = req.body.title.replace(/ /g, '_');
    const index = req.files.indexOf(file) + 1; // Get the index of the file
    cb(null, `${baseName}${index}${fileExtension}`);
  },
});
const upload = multer({ storage });

// API route to fetch all accommodations
app.get('/api/accommodations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM accommodations');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching accommodations:', err);
    res.status(500).json({ error: 'Failed to fetch accommodations' });
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
      res.status(404).json({ error: 'Accommodation not found' });
    }
  } catch (err) {
    console.error('Error fetching accommodation:', err);
    res.status(500).json({ error: 'Failed to fetch accommodation' });
  }
});

// API route to upload accommodation data with images
app.post('/api/accommodations', upload.array('images', 10), async (req, res) => {
  const {
    host_id,
    title,
    description,
    price_per_night,
    location,
    city,
    country,
    latitude,
    longitude,
    bedrooms,
    bathrooms,
    max_guests,
    amenities,
    check_in_time,
    check_out_time,
    status,
    is_available,
  } = req.body;

  // Validate required fields
  if (
    !title ||
    !description ||
    !price_per_night ||
    !location ||
    !city ||
    !country ||
    !max_guests
  ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Get image URLs
  const imageUrls = req.files.map(
    (file) => `images/${file.filename}`
  );

  try {
    const result = await pool.query(
      `INSERT INTO accommodations
      (host_id, title, description, price_per_night, location, city, country,
      latitude, longitude, bedrooms, bathrooms, max_guests, amenities,
      check_in_time, check_out_time, image_urls, status, is_available)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING *`,
      [
        host_id || null,
        title,
        description,
        price_per_night,
        location,
        city,
        country,
        latitude || null,
        longitude || null,
        bedrooms || null,
        bathrooms || null,
        max_guests,
        amenities || null,
        check_in_time || null,
        check_out_time || null,
        imageUrls.join(','), // Store as a comma-separated string
        status || 'available',
        is_available === 'true',
      ]
    );

    res.status(201).json({ message: 'Accommodation added successfully', accommodation: result.rows[0] });
  } catch (err) {
    console.error('Error adding accommodation:', err);
    res.status(500).json({ error: 'Failed to add accommodation' });
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
  res.status(500).json({ error: 'Something went wrong' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
