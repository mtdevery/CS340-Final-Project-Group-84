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
// Send routing back to react app (must be after all other routes)
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});


// Serve static react app
app.use(express.static(path.join(__dirname, '../frontend/build')));

/******************** UserEvents Controller/API ********************/
app.get('/api/userevents', (req, res) => {
    let query1 = `SELECT UserEvents.UserId, Users.Name AS 'UserName', UserEvents.EventId, Events.Description AS 'EventDescription'
                    FROM UserEvents
                    JOIN Users on Users.UserId = UserEvents.UserId
                    JOIN Events on Events.EventId = UserEvents.EventId
                    ORDER BY UserEvents.UserId ASC;`;
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
    let query1 = `INSERT INTO UserEvents (UserId, EventId) VALUES (${newValue.UserId}, ${newValue.EventId});`;
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
    let query1 = `UPDATE UserEvents SET UserId = ${newValue.UserId}, EventId = ${newValue.EventId} WHERE UserId = ${oldUserId} AND EventId = ${oldEventId};`;
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
    let query1 = `DELETE FROM UserEvents WHERE UserId = ${oldUserId} AND EventId = ${oldEventId};`;
    db.pool.query(query1, function(err, results, fields){
        if (err) {
            res.status(500).send();
        }
        else {
            res.status(204).send();
        }
    });
});

/******************** Users Controller/API ********************/
app.get('/api/users', (req, res) => {
    let query1 = 'SELECT * FROM Users;';
    db.pool.query(query1, function(err, results, fields){
        if(err){
            res.status(500).send();
        }else{
            res.send(JSON.stringify(results));
        }
    });
});

app.post('/api/users', (req, res) => {
    let newValue = req.body;
    let query1 = `INSERT INTO Users (Name, Email) VALUES ('${newValue.Name}', '${newValue.Email}');`;
    db.pool.query(query1, function(err, results, fields){
        if (err) {
            res.status(500).send();
        }
        else {
            res.status(201).send();
        }
    });
});

/******************** Categories Controller/API ********************/
app.get('/api/categories', (req, res) => {
    let query1 = 'SELECT * FROM Categories;';
    db.pool.query(query1, function(err, results, fields){
        if(err){
            res.status(500).send();
        }else{
            res.send(JSON.stringify(results));
        }
    });
});

app.post('/api/categories', (req, res) => {
    let newValue = req.body;
    let query1 = `INSERT INTO Categories (CategoryName, Description) VALUES ('${newValue.CategoryName}', '${newValue.Description}');`;
    db.pool.query(query1, function(err, results, fields){
        if (err) {
            res.status(500).send();
        }
        else {
            res.status(201).send();
        }
    });
});

/******************** Events Controller/API ********************/
app.get('/events', (req, res) => {
    const select_query = 'SELECT * from Events;'
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
            res.status(500).send();
        }
        else{
            console.log("sucessfully removed event") ;
            res.status(204).send() ;
        }
    });
});

app.post('/events', (req,res)=>{
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

/*
 * PUT NOT FINISHED YET
app.put('/events',(req,res)=>{
    const description = req.body.description;
    const date_time = req.body.date_time ;
    const cost = (req.body.cost) ;
    const location_id = req.body.location_id;
    const final_datetime = moment(date_time).format('YYYY-MM-DD HH:mm:ss');
    let new_query = ` UPDATE Events SET Time='${final_datetime}',Description='${description}',Cost=${cost},Location=${location_id} WHERE Event.EventId = ${req.params.id}`
    db.query(new_query, function(err, results, fields){
        console.log("success")
    });
});
*/


/**********************Locations Controller ***************** */
app.get('/locations', (req,res) =>{
    const query = "SELECT * FROM Locations ORDER BY City ASC";
    db.pool.query(query,(err, results) =>
    {
        if(!err){
            res.status(200).json(results);
        }
        else{
            console.log(err);
        }
    })
});

app.post('/locations', (req,res) =>{
    const StreetAddress = req.body.StreetAddress;
    const City = req.body.City;
    const PostalCode = req.body.PostalCode;
    const Country = req.body.Country;
    const query = `INSERT INTO Locations(StreetAddress,City,PostalCode,Country) VALUES ("${StreetAddress}", '${City}', ${PostalCode},'${Country}');` ;
    db.pool.query(query,(err, results) =>
    {
        if(!err){
            res.status(201).send();
        }
        else{
            res.status(500).send();
            console.log(`Error in SQL syntax to create Location ${err}`)
        }
    })
});

app.delete('/locations/:id', (req,res) =>{
    const LocationId = req.params.id;
    console.log(LocationId);
    const query = `DELETE FROM Locations WHERE Locations.LocationId =${LocationId};`;
    db.query(query,(err, results) =>
    {
        if(!err) {res.status(204).json(results);}
        else{console.log(err," Delete failed check syntax")}
    })
});

/*app.put('/locations/:id', (req,res) =>{
    db.pool.query(query,(err, results) => {
        res.json(results);
    })
});*/

/**********************EventsCategories Controller ***************** */
app.get('/eventscategories', (req,res) =>{
    const query = "SELECT * from EventCategories;"
    db.pool.query(query,(err, results) => {
        if (!err)
            res.json(results);
        else{
            console.log(err);
        }
    })
});

app.post('/eventscategories', (req,res) =>{
    const EventId = req.body.EventId;
    const CategoryId = req.body.CategoryId;
    const query = `INSERT INTO EventCategories (EventCategories.EventId,EventCategories.CategoryId) VALUES(${EventId},${CategoryId});`
    db.pool.query(query,(err, results) => {
        if(!err)
            res.status(201).send()
        else { res.status(500).send()}
    })
});

app.delete('/eventscategories/:eventid/:categoryid', (req,res) =>{
    const EventId = req.params.eventid;
    const CategoryId = req.params.categoryid;
    const query = `DELETE FROM EventsCategories WHERE EventCategories.EventId = ${EventId} and  EventCategories.CategoryId = ${CategoryId}; `
    db.pool.query(query,(err, results) => {
        if (!err) {res.status(201).send()}
        else{res.status(500).send()}
        console.log(results);
    })
})

/*app.put('/eventscategories/:eventid/:categoryid', (req,res) =>{
    const query =
    db.pool.query(query,(err, results) => {
    })
});*/

const PORT = process.env.PORT || 14443; // We don't have dotenv installed in express.json() - install first for testing on other ports if needed
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
