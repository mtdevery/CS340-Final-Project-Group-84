/*inputs from the user are preceded with the $ symbol*/

/* UserEvents Table*/
-- retrieve all user events in user-friendly format
SELECT UserEvents.UserId, Users.Name AS 'UserName', UserEvents.EventId, Events.Description AS 'EventDescription'
                    FROM UserEvents
                    JOIN Users on Users.UserId = UserEvents.UserId
                    JOIN Events on Events.EventId = UserEvents.EventId
                    ORDER BY UserEvents.UserId ASC;

-- Create a new user event (id is known by the client)
INSERT INTO UserEvents (UserId, EventId)
VALUES ($newValue.UserId, $newValue.EventId);

-- Update a user event
UPDATE UserEvents 
SET UserId = $newValue.UserId, EventId = $newValue.EventId 
WHERE UserId = $oldUserId AND EventId = $oldEventId;

-- Delete a user event by Id
DELETE FROM UserEvents 
WHERE UserId = $oldUserId AND EventId = $oldEventId;


/* Users Table*/
-- retrieve a list of all other users
SELECT * from Users
ORDER BY Name ASC;

-- create a new user from  a user's given input data
INSERT INTO Users (Name, Email) VALUES ($newName, $newEmail);

/*Categories Table*/
-- view a list of all stored categories
SELECT * FROM Categories;

-- create a user specified category
INSERT INTO Categories VALUES ($newCategoryName, $newDescription);


/*Events Table*/
-- retrieving all events currently stored
SELECT Events.EventId, Events.Time, Events.Description, Events.Cost, Events.LocationI, Locations.City
FROM Events
LEFT JOIN Locations ON Events.LocationId = Locations.Id;

-- adding a new event
INSERT INTO Events(Time, Description, Cost, LocationId)
VALUES ($final_datetime, $description, $cost, $location_id);

-- updating an existing event's details such as location
UPDATE Events
SET Time=$Time, Description=$Description, Cost=$Cost, LocationId=$LocationId
WHERE Events.EventId = $EventId;

-- deleting an event with the Id
DELETE FROM Events 
WHERE Events.EventId=$id;


/**Locations Table*/
-- Retrieve all locations in the table
SELECT * FROM Locations ORDER BY City ASC;

-- creation of a new location for hosting events
INSERT INTO Locations (StreetAddress,City,PostalCode,Country)
VALUES ($StreetAddress, $City, $PostalCode, $Country);


/**EventCategories Table*/
-- Retrieve all entries in the intersection table in user-friendly format
SELECT EventCategories.EventId, Events.Time , Events.Description AS Event_Description, EventCategories.CategoryId, Categories.Description AS Category_Description, Locations.Country, Locations.City, Locations.StreetAddress FROM
		EventCategories 
		INNER JOIN Events on Events.EventId = EventCategories.EventId
		INNER JOIN Categories ON Categories.CategoryId = EventCategories.CategoryId
		INNER JOIN Locations on Locations.LocationId = Events.LocationId;
                    
-- Create a new entry in the M:M relationship by Id
INSERT INTO EventCategories (EventCategories.EventId, EventCategories.CategoryId)
VALUES($EventId, $CategoryId);
