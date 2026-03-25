import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Nav from './Nav.tsx';
import Discover from './discover/Discover.tsx';
import Statistics from './statistics/Statistics.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="playlist">
        <Route index element={<App />} />
        <Route path="playlist-mixer" element={<App />} />
      </Route>
      <Route path="discover">
        <Route index element={<Discover />} />
      </Route>
      <Route path="statistics">
        <Route index element={<Statistics />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
