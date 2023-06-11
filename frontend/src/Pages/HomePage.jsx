import React from 'react';

function HomePage(){
    return(
        <>
            <h2>Event Management Home Page</h2>
            <h3>Overview</h3>
            <p style={{ maxWidth: "1000px" }}>
            With advancements in technology, the world is now more connected than ever. Billions of people around the world now use social media 
            applications to stay connected with friends, share photos, and plan events. However, some companies have used ethically questionable 
            tactics to collect massive amounts of user data which has soured the opinion of many of these companies in the public eye. This has 
            created an opportunity for a new web application that provides a simple way to manage events. Our event management application will 
            provide an easy to use user interface to manage hosting events and finding fun things to do in your area. Our application will allow 
            Users to receive notifications for Events that they choose and will manage the many-to-many relationship between Users and Events to 
            be highly scalable for an increased number of Users. Our startup has an aggressive goal of generating 5,000 new users in the first year 
            we are operating and of handling events in 15 different countries across North America and Europe. When creating an Event, Users will 
            be able to choose a Location and Category in order to simplify the process of filtering for Events that match a User’s interests. 
            Utilizing a MySQL database backend will allow our application to efficiently store user and event information while meeting the 
            requirements for scalability and speed. We plan to scale our database infrastructure to be able to record 100,000 events with no 
            drop in performance in the web application.
            </p>
            <h3>Database</h3>
            <p style={{ maxWidth: "1000px" }}>
            Our application uses a MySql and Express/NodeJS backend to manage the six tables in the database that power this website. Each of the 
            tables can be viewed using the navigation tab on the left to navigate to their respective page. Each of the pages implements functionality
            to create a new row in the table using an intuitive popup form. Additionally, the Events and UserEvents pages implement the functionality for 
            edit and delete.
            </p>
        </>
    );
}

export default HomePage;