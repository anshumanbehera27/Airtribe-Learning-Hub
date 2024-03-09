// commentRoutes.js

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

// Add a comment
router.post('/', (req, res) => {
    const { CourseID, UserID, CommentText } = req.body;

    const sql = 'INSERT INTO Comments (CourseID, UserID, CommentText) VALUES (?, ?, ?)';
    connection.query(sql, [CourseID, UserID, CommentText], (err, result) => {
        if (err) {
            console.error('Error adding comment:', err);
            res.status(500).json({ error: 'Failed to add comment' });
            return;
        }
        res.json({ message: 'Comment added successfully' });
    });
});

// Get comments for a specific course
router.get('/course/:id', (req, res) => {
    const courseId = req.params.id;

    const sql = 'SELECT * FROM Comments WHERE CourseID = ?';
    connection.query(sql, [courseId], (err, results) => {
        if (err) {
            console.error('Error retrieving comments:', err);
            res.status(500).json({ error: 'Failed to retrieve comments' });
            return;
        }
        res.json(results);
    });
});

// Update a comment
router.put('/:id', (req, res) => {
    const commentId = req.params.id;
    const { CommentText } = req.body;

    const sql = 'UPDATE Comments SET CommentText = ? WHERE CommentID = ?';
    connection.query(sql, [CommentText, commentId], (err, result) => {
        if (err) {
            console.error('Error updating comment:', err);
            res.status(500).json({ error: 'Failed to update comment' });
            return;
        }
        res.json({ message: 'Comment updated successfully' });
    });
});

// Delete a comment
router.delete('/:id', (req, res) => {
    const commentId = req.params.id;

    const sql = 'DELETE FROM Comments WHERE CommentID = ?';
    connection.query(sql, [commentId], (err, result) => {
        if (err) {
            console.error('Error deleting comment:', err);
            res.status(500).json({ error: 'Failed to delete comment' });
            return;
        }
        res.json({ message: 'Comment deleted successfully' });
    });
});

module.exports = router;
