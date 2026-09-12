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
import SelectPlaylist from './playlist/playlisttools/SelectPlaylist.tsx'
import Tool from './playlist/playlisttools/Tool.tsx'
import PlaylistIndex from './playlist/ToolOptions.tsx';
import Authenticate from './Authenticate.tsx';
import ErrorPage from './ErrorPage.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/spotify-playlist-generator" element={<App />} />
      <Route path="/spotify-playlist-generator/playlist">
        <Route index element={<PlaylistIndex />} />
        <Route path="playlist-mixer" element={<App />} />
        <Route path=":tool" element={<Tool />} />
      </Route>
      <Route path="/spotify-playlist-generator/statistics">
        <Route index element={<Statistics />} />
        <Route path="recent" element={<RecentyPlayed />} />
      </Route>
      <Route path="/spotify-playlist-generator/authenticate" element={<Authenticate />} />
    </Routes>
  </BrowserRouter>
);
