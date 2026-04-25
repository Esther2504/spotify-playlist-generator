import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Nav from './Nav.tsx';
import Discover from './discover/Discover.tsx';
import Statistics from './statistics/Statistics.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import Artists from './discover/Artists.tsx';
import RecentyPlayed from './statistics/RecentyPlayed.tsx';
import SelectPlaylist from './playlist/SelectPlaylist.tsx'
import Tool from './playlist/playlisttools/Tool.tsx'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="playlist">
        <Route index element={<SelectPlaylist />} />
        <Route path="playlist-mixer" element={<App />} />
        <Route path=":tool" element={<Tool />} />
      </Route>
      <Route path="discover">
        <Route index element={<Discover />} />
        <Route path="artists" element={<Artists />} />
      </Route>
      <Route path="statistics">
        <Route index element={<Statistics />} />
        <Route path="recent" element={<RecentyPlayed />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
