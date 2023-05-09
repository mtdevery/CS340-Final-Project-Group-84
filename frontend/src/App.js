import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import CategoriesPage from './Pages/CategoriesPage';
import EventCategoriesPage from './Pages/EventCategoriesPage';
import EventsPage from './Pages/EventsPage';
import HomePage from './Pages/HomePage';
import LocationsPage from './Pages/LocationsPage';
import UserEventsPage from './Pages/UserEventsPage';
import UsersPage from './Pages/UsersPage';
import AppHeader from './Components/AppHeader';
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import HomeIcon from '@mui/icons-material/Home'
import CategoryIcon from '@mui/icons-material/Category';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import PeopleIcon from '@mui/icons-material/People';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <header className='App-Header'>
        <CssBaseline />
        <AppHeader className="App-Header" />
      </header>
        <main>
        <div className='Sidebar'>
            <Sidebar>
                <Menu>
                  <MenuItem component={<Link to="/" />} icon={<HomeIcon />}>Home</MenuItem>
                  <MenuItem component={<Link to="categories" />} icon={<CategoryIcon />}>Categories</MenuItem>
                  <MenuItem component={<Link to="eventcategories" />} icon={<LocalActivityIcon />}>Event Categories</MenuItem>
                  <MenuItem component={<Link to="events" />} icon={<EventIcon />}>Events</MenuItem>
                  <MenuItem component={<Link to="locations" />} icon={<LocationOnIcon />}>Locations</MenuItem>
                  <MenuItem component={<Link to="userevents" />} icon={<ReduceCapacityIcon />}>User Events</MenuItem>
                  <MenuItem component={<Link to="users" />} icon={<PeopleIcon />}>Users</MenuItem>
                </Menu>
            </Sidebar>
            <section className='Content'>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/eventcategories" element={<EventCategoriesPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/locations" element={<LocationsPage />} />
              <Route path="/userevents" element={<UserEventsPage />} />
              <Route path="/users" element={<UsersPage />} />
            </Routes>
          </section>
        </div>
        
        </main>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
