// server.js

const express = require('express');
const commentRoutes = require('./comments'); 
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001; 


app.use(bodyParser.json());

app.use('/comments', commentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
