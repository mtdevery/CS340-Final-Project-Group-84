'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('./db-connector');
const moment = require('moment'); 
const cors = require('cors') ; 
//Middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(express.urlencoded({extended: true}))

// Serve static react app
app.use(express.static(path.join(__dirname, '../frontend/build')));

/******************** UserEvents Controller/API ********************/
// Retrieve all user events
app.get('/api/userevents', (req, res) => {
    let query1 = `SELECT UserEvents.UserId, Users.Name AS 'UserName', UserEvents.EventId, Events.Description AS 'EventDescription'
                    FROM UserEvents
                    JOIN Users on Users.UserId = UserEvents.UserId
                    JOIN Events on Events.EventId = UserEvents.EventId
                    ORDER BY UserEvents.UserId ASC;`;
    db.pool.query(query1, function(err, results, fields){
        if(err){
            res.status(500).send(JSON.stringify({message: err.message}));
        }else{
            res.send(JSON.stringify(results));
        }
    });
});

// Add a new user event with the Ids
app.post('/api/userevents', (req, res) => {
    let newValue = req.body;
    let query1 = `INSERT INTO UserEvents (UserId, EventId) VALUES (${newValue.UserId}, ${newValue.EventId});`;
    db.pool.query(query1, function(err, results, fields){
        if (err) {
            res.status(500).send(JSON.stringify({message: err.message}));
        }
        else {
            res.status(201).send();
        }
    });
});

// Update the userEvent with given Ids
app.put('/api/userevents/:userid/:eventid', (req, res) => {
    let newValue = req.body;
    let oldUserId = req.params.userid;
    let oldEventId = req.params.eventid;
    let query1 = `UPDATE UserEvents SET UserId = ${newValue.UserId}, EventId = ${newValue.EventId} WHERE UserId = ${oldUserId} AND EventId = ${oldEventId};`;
    db.pool.query(query1, function(err, results, fields){
        if (err) {
            res.status(500).send(JSON.stringify({message: err.message}));
        }
        else {
            res.status(201).send();
        }
    });
});

// Delete the UserEvent with the given Ids
app.delete('/api/userevents/:userid/:eventid', (req, res) => {
    let oldUserId = req.params.userid;
    let oldEventId = req.params.eventid;
    let query1 = `DELETE FROM UserEvents WHERE UserId = ${oldUserId} AND EventId = ${oldEventId};`;
    db.pool.query(query1, function(err, results, fields){
        if (err) {
            res.status(500).send(JSON.stringify({message: err.message}));
        }
        else {
            res.status(204).send();
        }
    });
});

/******************** Users Controller/API ********************/
// Retrieve all users in the database
app.get('/api/users', (req, res) => {
    let query1 = 'SELECT * FROM Users ORDER BY Name ASC;';
    db.pool.query(query1, function(err, results, fields){
        if(err){
            res.status(500).send(JSON.stringify({message: err.message}));
        }else{
            res.send(JSON.stringify(results));
        }
    });
});

// Create a new user in the database
app.post('/api/users', (req, res) => {
    let newValue = req.body;
    let query1 = `INSERT INTO Users (Name, Email) VALUES ('${newValue.Name}', '${newValue.Email}');`;
    db.pool.query(query1, function(err, results, fields){
        if (err) {
            res.status(500).send(JSON.stringify({message: err.message}));
        }
        else {
            res.status(201).send();
        }
    });
});

/******************** Categories Controller/API ********************/
// Retrieve all categories from the database
app.get('/api/categories', (req, res) => {
    let query1 = 'SELECT * FROM Categories;';
    db.pool.query(query1, function(err, results, fields){
        if(err){
            res.status(500).send(JSON.stringify({message: err.message}));
        }else{
            res.send(JSON.stringify(results));
        }
    });
});

// Create a new category entry in the database
app.post('/api/categories', (req, res) => {
    let newValue = req.body;
    let query1 = `INSERT INTO Categories (CategoryName, Description) VALUES ('${newValue.CategoryName}', '${newValue.Description}');`;
    db.pool.query(query1, function(err, results, fields){
        if (err) {
            res.status(500).send(JSON.stringify({message: err.message}));
        }
        else {
            res.status(201).send();
        }
    });
});

/******************** Events Controller/API ********************/
app.get('/api/events', (req, res) => {
    const select_query = `SELECT Events.EventId, Events.Time, Events.Description, Events.Cost, Events.LocationId, Locations.City
                            FROM Events
                            LEFT JOIN Locations ON Events.LocationId = Locations.LocationId;`
    db.pool.query(select_query,(err, results) => {
        console.log('get request for all events');
        res.json(results);
    });
});

app.delete('/events/:id',(req,res)=>{
    const id = req.params.id
    console.log(`delete request made for EventId:${id}`)
    const query = `DELETE FROM Events WHERE Events.EventId=${id};`
    db.pool.query(query,(err,results,fields) =>{
        if(err){
            console.log(`Unable to perform delete ERROR:${err}`);
            res.status(500).send(JSON.stringify({message: err.message}));
        }
        else{
            console.log("successfully removed event") ;
            res.status(204).send() ;
        }
    });
});

app.post('/events', (req,res)=>{
    const description = req.body.description;
    const date_time = req.body.date_time;
    const cost = (req.body.cost);
    let location_id = req.body.location_id;
    if (location_id === undefined || location_id === "" || location_id === -1 ){
        location_id = 'NULL';
    }
    const final_datetime = moment(date_time).format('YYYY-MM-DD HH:mm:ss');
    let new_query = `INSERT INTO Events(Time, Description, Cost, LocationId) VALUES ('${final_datetime}',"${description}",${cost},${location_id});`
    db.pool.query(new_query, function(err, results, fields){
        if(!err){
            console.log(`Sucessful Query SQL Syntax Used: ${new_query}`);
            res.status(201).send() ;
        }
        else{
            console.log(`Entity Creation Query Failed ERROR:${err}`);
            res.status(500).send(JSON.stringify({message: err.message}));
        }
    });
});


app.put('/events/:id',(req,res)=>{
    const EventId = req.params.id
    const Description = req.body.Description;
    const Time = req.body.Time;
    const Cost = req.body.Cost

    let LocationId = req.body.LocationId;
    if (LocationId === -1){
        LocationId = "NULL";
    }
    const new_query = `UPDATE Events SET Time="${Time}",Description="${Description}",Cost=${Cost},LocationId=${LocationId} WHERE Events.EventId = ${EventId};`
    console.log(new_query)
    db.pool.query(new_query, function(err, results, fields){
        if(err){ res.status(400).send(JSON.stringify({message: err.message}))}
        else{
            res.status(200).send();
        }
     });
});


/**********************Locations Controller ******************/
app.get('/api/locations', (req,res) =>{
    const query = "SELECT * FROM Locations ORDER BY City ASC;";
    db.pool.query(query,(err, results) =>
    {
        if(err){
            res.status(500).send(JSON.stringify({message: err.message}));
        }
        else{
            res.status(200).send(JSON.stringify(results));
        }
    })
});

app.post('/locations', (req,res) =>{
    const StreetAddress = req.body.StreetAddress;
    const City = req.body.City;
    const PostalCode = req.body.PostalCode;
    const Country = req.body.Country;
    const query = `INSERT INTO Locations(StreetAddress,City,PostalCode,Country) VALUES ("${StreetAddress}", '${City}', ${PostalCode},'${Country}');`;
    db.pool.query(query,(err, results) =>
    {
        if(err){
            res.status(500).send(JSON.stringify({message: err.message}));
        }else{
            res.status(201).send();
        }
    })
});


/**********************EventsCategories Controller ***************** */
app.get('/eventscategories', (req,res) =>{
    //const query = "SELECT * from EventCategories;"
    const query = `SELECT EventCategories.EventId, Events.Time , Events.Description AS Event_Description,EventCategories.CategoryId,Categories.Description AS Category_Description,Locations.Country,Locations.City,Locations.StreetAddress FROM
                    EventCategories INNER JOIN Events on Events.EventId = EventCategories.EventId
                    INNER JOIN Categories ON Categories.CategoryId = EventCategories.CategoryId
                    INNER JOIN Locations on Locations.LocationId = Events.LocationId;`;
    db.pool.query(query,(err, results) => {
        if (!err){
            res.json(results);
        }
        else{
            console.log(err);
            res.status(500).send(JSON.stringify({message: err.message}));
        }
    })
});

app.post('/eventscategories', (req,res) =>{
    const EventId = req.body.EventId;
    const CategoryId = req.body.CategoryId;
    const query = `INSERT INTO EventCategories (EventCategories.EventId,EventCategories.CategoryId) VALUES(${EventId},${CategoryId});`
    db.pool.query(query,(err, results) => {
        if(!err){
            res.status(201).send()
            //console.log(results)
        }else{
            res.status(500).send(JSON.stringify({message: err.message}))
           // console.log(err)
    }});
});


// Send routing back to react app (must be after all other routes)
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 14443; // We don't have dotenv installed in express.json() - install first for testing on other ports if needed
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
