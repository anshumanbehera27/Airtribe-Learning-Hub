const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// Create a new course
app.post('/addcourses', (req, res) => {
    const { CourseID, InstructorID, Title, Description, StartDate, EndDate, Status } = req.body;
    const sql = 'INSERT INTO Courses (CourseID, InstructorID, Title, Description, StartDate, EndDate, Status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [CourseID, InstructorID, Title, Description, StartDate, EndDate, Status], (err, result) => {
        if (err) {
            console.error('Error creating course:', err);
            res.status(500).json({ error: 'Course created successfully' });
            return;
        }
        res.status(201).json({ message: 'Course created successfully' });
    });
});
// student can able to Apply For the course 
app.post('/apply', (req, res) => {
    const { CourseID, StudentName, StudentEmail, StudentPhoneNumber, StudentLinkedInProfile, Title } = req.body;

    // Check if any of the fields are missing
    if (!CourseID || !StudentName || !StudentEmail || !Title) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = 'INSERT INTO CourseRegistration (CourseID, StudentName, StudentEmail, StudentPhoneNumber, StudentLinkedInProfile, Title ,status ) VALUES (?, ?, ?, ?, ?, ? ,?)';
    connection.query(sql, [CourseID, StudentName, StudentEmail, StudentPhoneNumber, StudentLinkedInProfile, Title ,Status], (err, result) => {
        if (err) {
            console.error('Error applying for course:', err);
            res.status(500).json({ error: 'Failed to apply for course' });
            return;
        }
        res.json({ message: 'Applied for course successfully' });
    });
});


// Get all courses
app.get('/courses', (req, res) => {
    const sql = 'SELECT * FROM Courses';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            res.status(500).json({ error: 'Failed to fetch courses' });
            return;
        }
        res.json(results);
    });
});

// Update a course
app.put('/courses/update', (req, res) => {
    const courseId = req.params.id;
    const { Title, Description } = req.body;
    const sql = 'UPDATE Courses SET Title = ?, Description = ? WHERE CourseID = 1';
    connection.query(sql, [Title, Description, courseId], (err, result) => {
        if (err) {
            console.error('Error updating course:', err);
            res.status(500).json({ error: 'Failed to update course' });
            return;
        }
        res.json({ message: 'Course updated successfully' });
    });
});

// Delete a course
app.delete('/courses/:id', (req, res) => {
    const courseId = req.params.id;
    const sql = 'DELETE FROM Courses WHERE id = ?';
    connection.query(sql, [courseId], (err, result) => {
        if (err) {
            console.error('Error deleting course:', err);
            res.status(500).json({ error: 'Failed to delete course' });
            return;
        }
        res.json({ message: 'Course deleted successfully' });
    });
});
