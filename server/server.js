'use strict';

const express = require('express');
const path = require('path');
const app = express();

// Serve static react app
app.use(express.static(path.join(__dirname, '../frontend/build')));

/*
    Add controllers
*/
app.use('/Controllers/events-controller')

// Send routing back to react app
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

/* 
    Start the server
*/
const PORT = process.env.PORT || 14443;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
