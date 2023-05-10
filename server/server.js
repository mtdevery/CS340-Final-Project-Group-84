'use strict';

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/api/events', (req, res) => {
    res.json([
        { EventId: 1, Time: '08/18/2023 1:00 AM', Description: 'Bridal Party for Abbie', Cost: 17.93, LocationId: 1},
        { EventId: 2, Time: '06/22/2023 4:58 PM', Description: 'Rolling Stones Concert', Cost: 37.97, LocationId: 2},
        { EventId: 3, Time: '06/07/2023 4:17 PM', Description: 'Sunset Film Festival', Cost: 23.84, LocationId: 3},
        { EventId: 4, Time: '02/06/2023 6:06 AM', Description: 'Live Band Karaoke', Cost: 39.73, LocationId: 2},
        { EventId: 5, Time: '11/08/2023 8:00 AM', Description: 'Abbie\'s Wedding', Cost: 2.60, LocationId: 1}
    ]);
});

// Start the server
const PORT = process.env.PORT || 14443;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
