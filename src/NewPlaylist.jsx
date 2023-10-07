import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PlaylistCreated from './PlaylistCreated'
import { createPlaylist, getAudioFeatures, getUser, addPlaylistTracks } from './APICalls'

export default function NewPlaylist({ tracks, songType, playlistName, accessToken }) {
  const [audioDetails, setaudioDetails] = useState()
  const [newPlaylistIds, setNewPlaylistIds] = useState([])
  const [userID, setUserID] = useState()
  const [newPlaylist, setNewPlaylist] = useState()
  const [finished, setFinished] = useState(false)
  const [playlistCreated, setPlaylistCreated] = useState(false)
  const [newPlaylistID, setNewPlayListID] = useState()

  let trackids = []
  tracks.forEach(element => trackids.push(element.track.id))

  if (songType && trackids && !audioDetails) {
    getAudioFeatures(trackids, accessToken, setaudioDetails)
  }

  let genre = songType.toLowerCase()

  if (audioDetails && newPlaylistIds.length < audioDetails.length) {
    switch (songType) {
      case "Happiest":
        for (let i = 0; i < audioDetails.length; i++) {
          if (audioDetails[i].valence > 0.6) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
        }
        break;
      case "Saddest":
        for (let i = 0; i < audioDetails.length; i++) {
          if (audioDetails[i].valence < 0.4) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
        }
        break;
      case "Accoustic":
        for (let i = 0; i < audioDetails.length; i++) {
          if (audioDetails[i].acousticness > 0.85) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
        }
        break;
      case "Danceable":
        for (let i = 0; i < audioDetails.length; i++) {
          if (audioDetails[i].danceability > 0.65) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
        }
        break;
      case "Energetic":
        for (let i = 0; i < audioDetails.length; i++) {
          if (audioDetails[i].energy > 0.8) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
        }
        break;
      case "Live":
        for (let i = 0; i < audioDetails.length; i++) {
          if (audioDetails[i].liveness > 0.8) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
        }
        break;
      case "Major":
        for (let i = 0; i < audioDetails.length; i++) {
          if (audioDetails[i].mode == 1) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
        }
        break;
      case "Minor":
        for (let i = 0; i < audioDetails.length; i++) {
          if (audioDetails[i].mode == 0) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
        }
        break;
      case "Fastest":
        for (let i = 0; i < audioDetails.length; i++) {
          if (audioDetails[i].tempo > 120) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
        }
        break;
      case "Slowest":
        for (let i = 0; i < audioDetails.length; i++) {
          if (audioDetails[i].tempo < 90) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
        }
    }
    setFinished(true)
  }

  useEffect(() => {
    getUser(accessToken, setUserID)
  }, [])

  useEffect(() => {
    if (userID && newPlaylistIds && !newPlaylist) {
      createPlaylist(userID, accessToken, songType, playlistName, genre, setNewPlayListID, setNewPlaylist, newPlaylist)
    }
  }, [finished])

  useEffect(() => {
    addPlaylistTracks(newPlaylistIds, accessToken, newPlaylist, setPlaylistCreated)
  }, [newPlaylist])

  return (
    <div>
      {!playlistCreated ?
        <p>Loading...</p>
        :
        <PlaylistCreated newPlaylistID={newPlaylistID} />
      }
    </div>
  )
}
