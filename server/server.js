'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('./db-connector');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Serve static react app
app.use(express.static(path.join(__dirname, '../frontend/build')));

/*
    Add controllers
*/
// UserEvents Controller
app.get('/api/userevents', (req, res) => {
    let query1 = 'SELECT * FROM userevents;';
    db.pool.query(query1, function(err, results, fields){
        if(err){
            res.status(500).send();
        }else{
            res.send(JSON.stringify(results));
        }
    });
});

app.post('/api/userevents', (req, res) => {
    let newValue = req.body;
    let query1 = `INSERT INTO userevents (UserId, EventId) VALUES (${newValue.UserId}, ${newValue.EventId});`;
    db.pool.query(query1, function(err, results, fields){
        if (err) {
            res.status(500).send();
        }
        else {
            res.status(201).send();
        }
    });
});

app.put('/api/userevents/:userid/:eventid', (req, res) => {
    let newValue = req.body;
    let oldUserId = req.params.userid;
    let oldEventId = req.params.eventid;
    let query1 = `UPDATE userevents SET UserId = ${newValue.UserId}, EventId = ${newValue.EventId} WHERE UserId = ${oldUserId} AND EventId = ${oldEventId};`
    db.pool.query(query1, function(err, results, fields){
        if (err) {
            res.status(500).send();
        }
        else {
            res.status(201).send();
        }
    });
});

app.delete('/api/userevents/:userid/:eventid', (req, res) => {
    let oldUserId = req.params.userid;
    let oldEventId = req.params.eventid;
    let query1 = `DELETE FROM userevents WHERE UserId = ${oldUserId} AND EventId = ${oldEventId};`;
    db.pool.query(query1, function(err, results, fields){
        if (err) {
            res.status(500).send();
        }
        else {
            res.status(204).send();
        }
    });
});

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
