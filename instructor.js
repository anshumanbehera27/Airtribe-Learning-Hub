const express = require('express');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'airtribedatabase',
    user: 'root1',
    password: '1234'
});
const app = express();
const PORT = 3000; 

app.listen(PORT, () => {
    console.log(`SERVER: http://localhost:${PORT}`);
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return;
        }
        console.log("DATABASE Connected");
    });
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Get all instructors
app.get("/all", (req, res) => {
    const sql_query = 'SELECT * FROM instructors';
    connection.query(sql_query, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).send('Error fetching data from database');
            return;
        }
        res.send(result);
    });
});

// instructors will able to Access all of the data from this course 
app.get('/instructors/:instructorId/courses', (req, res) => {
    const instructorId = req.params.instructorId;
    const sql = 'SELECT * FROM Courses WHERE InstructorID = 4';
    connection.query(sql, [instructorId], (err, result) => {
        if (err) {
            console.error('Error fetching courses:', err);
            res.status(500).json({ error: 'Failed to fetch courses' });
            return;
        }
        res.json(result);
    });
});
// instructore will able to  update the student of Student regrestion ACCEPT REJECT WAITLIST
// Update lead status API endpoint
app.put('/leads/:leadId/status', (req, res) => {
    const CourseID = req.params.CourseID;
    const { status } = req.body;
  
    // Update the lead status in the database
    const sql = 'UPDATE courseregistration SET status = ? WHERE CourseID= ?';
    connection.query(sql, [status, CourseID], (err, result) => {
      if (err) {
        console.error('Error updating lead status:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Lead not found' });
        return;
      }
  
      res.json({ message: 'Lead status updated successfully' });
    });
  });

// instruct able to post an comment in to the  course Api
app.post('/courses/:courseId/comment', (req, res) => {
    const courseId = req.params.courseId;
    const { comment } = req.body;
  
    // Validate input
    if (!courseId || !comment) {
      return res.status(400).json({ error: 'Course ID and comment are required' });
    }
  
    // Execute SQL query to update the course record with the new comment
    const sql = 'UPDATE courses SET comment = ? WHERE course_id = ?';
    connection.query(sql, [comment, courseId], (err, result) => {
      if (err) {
        console.error('Error adding comment:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      // Return success response
      res.json({ message: 'Comment added successfully' });
    });
  });
// Add a new instructor
app.post("/join", (req, res) => {
    const { InstructorID, Name, Email } = req.body;

    if (!InstructorID || !Name || !Email) {
        return res.status(400).json({ error: 'Please provide InstructorID, Name, and Email' });
    }

    const sql_query = "INSERT INTO instructors (InstructorID, Name, Email) VALUES (?, ?, ?)";
    const values = [InstructorID, Name, Email];

    connection.query(sql_query, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'An internal server error occurred' });
            return;
        }
        res.status(201).json({ message: 'Instructor added successfully' });
    });
});

