const db = require('../database/db');
const calculateDistance = require('../utils/calculateDistance');

// Add School API
const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Database error', error: error.message || error });

  }
};

// List Schools API
const listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Latitude and Longitude are required' });
  }

  try {
    const [schools] = await db.query('SELECT * FROM schools');
    const sortedSchools = schools.map((school) => ({
      ...school,
      distance: calculateDistance(latitude, longitude, school.latitude, school.longitude),
    })).sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
};

module.exports = { addSchool, listSchools };
