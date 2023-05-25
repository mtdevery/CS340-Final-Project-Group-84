'use strict';
// Serve static react app
//app.use(express.static(path.join(__dirname, '../frontend/build')));
const express = require('express');   
const app     = express();           
const PORT = process.env.PORT || 62490;                 
const db = require('./db-connector');
const cors = require('cors');
const bodyParser = require('body-parser') ;

// Middleware 
app.use(express.json()) ;
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());


//working get 
app.get('/display-events', (req, res) => {
        let query1 = 'SELECT * from Events;'
        db.pool.query(query1,(err, results) => {
        res.json(results);
    });   
});

// working delete 
app.delete('/delete-event/:id', async (req,res)=>{
    let id = req.params.id
    let query = `DELETE FROM Events WHERE Events.EventId=${id};`;
    db.pool.query(query,(err,results,fields) =>{
        if(err){ console.log("Unable to Perform Delete ")}
        else {console.log("sucessfully removed event")}
    });
});

// create new event - not working yet
app.post('/add-events',(req,res)=>{
    let event = req.body;
    let new_query = `INSERT INTO Events(Time, Description, Cost, LocationId) VALUES (${event.Time},${event.Description},${event.Cost},${event.LocationId});`
    db.pool.query(new_query, function(err, results, fields){
    });
});



app.put('/update-event',(req,res)=>{
    let event = req.body;
    const id = event.EventId;
    const Time = event.Time;
    const Description = event.Description;
    const Cost = event.Cost;
    const LocationId = event.LocationId;


    let query = `UPDATE Events SET Time=${Time},Description=${Description},Cost=${Cost},LocationId=${LocationId} WHERE EventId=${id};`
    db.pool.query(query,(err,results,fields) =>{
    });
});

app.delete('/delete-event',(req,res,)=>{
    let event = req.body;
    let id = event.EventId;
    let query = `DELETE FROM Events WHERE Event.EventId = ${id};`

    db.pool.query(query,(err,results,fields) =>{

    });
});

app.listen(PORT, function(){           
    console.log(`Express Server listening on port ${PORT}`)
});

