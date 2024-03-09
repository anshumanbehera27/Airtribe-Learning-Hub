// leadRoutes.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root1',
    password: '1234',
    database: 'airtribedatabase'
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Search leads by name or email
router.get('/search', (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    const sql = 'SELECT * FROM Leads WHERE StudentName LIKE ? OR StudentEmail LIKE ?';
    const likeQuery = `%${query}%`; // Wrap the query with % to perform a partial match

    connection.query(sql, [likeQuery, likeQuery], (err, results) => {
        if (err) {
            console.error('Error searching leads:', err);
            res.status(500).json({ error: 'Failed to search leads' });
            return;
        }
        res.json(results);
    });
});

module.exports = router;
