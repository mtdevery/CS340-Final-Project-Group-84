'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('./db-connector');
const moment = require('moment'); // date parser/converter
const cors = require('cors') ; // allows request when requests are made from hostname!= flip/localhost

//Middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors()) 
app.use(express.urlencoded({extended: true}))

// Serve static react app
app.use(express.static(path.join(__dirname, '../frontend/build'))); // I don't thhink we need/have static files to serve anymore



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

/******************** Events Controller/API ********************/
app.get('/events', async (req, res) => {
    const select_query = 'SELECT * from Events;'
    db.pool.query(select_query,(err, results) => {
        console.log('get request for all events'); 
        res.json(results);
    });   
});

app.delete('/events/:id', async (req,res)=>{
    const id = req.params.id
    console.log(`delete request made for EventId:${id}`)
    const query = `DELETE FROM Events WHERE Events.EventId=${id};`
    db.pool.query(query,(err,results,fields) =>{
        if(err){ 
            console.log(`Unable to perform delete ERROR:${err}`);
            res.status(500).send();
        }
        else{
            console.log("sucessfully removed event") ; 
            res.status(204).send() ;
        }
    });  
});

app.post('/events', async (req,res)=>{
    console.log("post request made")
    const description = req.body.description;
    const date_time = req.body.date_time ; 
    const cost = (req.body.cost) ;
    const location_id = req.body.location_id; 
    const final_datetime = moment(date_time).format('YYYY-MM-DD HH:mm:ss');
    let new_query = ` INSERT INTO Events(Time,Description,Cost,LocationId) VALUES ('${final_datetime}',"${description}",${cost},${location_id});`
    db.pool.query(new_query, function(err, results, fields){
        if(!err){
            console.log(`Sucessful Query SQL Syntax Used: ${new_query}`);
            res.status(201).send() ;
        }
        else{
            console.log(`Entity Creation Query Failed ERROR:${err}`);
            res.status(500);
        }
    }); 
});
/******************** Events Controller END ********************/

// Send routing back to react app
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

/* Start the server */
const PORT = process.env.PORT || 14443; // We don't have dotenv installed in express.json() - install first for testing on other ports if needed
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
