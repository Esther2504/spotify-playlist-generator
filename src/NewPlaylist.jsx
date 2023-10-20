import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PlaylistCreated from './PlaylistCreated'
import { createPlaylist, getAudioFeatures, getUser, addPlaylistTracks } from './APICalls'
import NoSuitableSongs from './NoSuitableSongs'

export default function NewPlaylist({ tracks, songType, playlistName, data, accessToken }) {
  const [audioDetails, setaudioDetails] = useState()
  const [newPlaylistIds, setNewPlaylistIds] = useState([])
  const [userID, setUserID] = useState()
  const [newPlaylist, setNewPlaylist] = useState()
  const [finished, setFinished] = useState(false)
  const [playlistCreated, setPlaylistCreated] = useState(false)
  const [newPlaylistID, setNewPlayListID] = useState()
  const [noSongs, setNoSongs] = useState(false)

  let trackids = []
  tracks.forEach(element => trackids.push(element.track.id))

  if (songType && trackids && !audioDetails) {
    getAudioFeatures(trackids, accessToken, setaudioDetails)
  }

  let genre = songType.toLowerCase()


  useEffect(() => {

    if (audioDetails) {

    switch (songType) {
      case "Happiest":
        for (let i = 0; i < audioDetails.length; i++) {
          if (audioDetails[i].valence > 0.4 && audioDetails[i].energy > 0.4 && audioDetails[i].tempo > 95 && !newPlaylistIds.includes(audioDetails[i].uri)) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
        }
        if (newPlaylistIds.length < 1) {
          setNoSongs(true)
        } else {
          setNoSongs(false)
        }
        break;
      case "Saddest":
        for (let i = 0; i < audioDetails.length; i++) {
          if (audioDetails[i].valence < 0.4 && audioDetails[i].energy < 0.65 && !newPlaylistIds.includes(audioDetails[i].uri)) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
          if (newPlaylistIds.length < 1) {
            setNoSongs(true)
          } else {
            setNoSongs(false)
          }
        }
        break;
      case "Accoustic":
        for (let i = 0; i < audioDetails.length; i++) {
          console.log(audioDetails[i].acousticness)
          if (audioDetails[i].acousticness > 0.8 && !newPlaylistIds.includes(audioDetails[i].uri)) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
          if (newPlaylistIds.length < 1) {
            setNoSongs(true)
          } else {
            setNoSongs(false)
          }
        }
        break;
      case "Danceable":
        for (let i = 0; i < audioDetails.length; i++) {
          console.log(audioDetails[i].energy)
          if (audioDetails[i].danceability > 0.6 && audioDetails[i].energy > 0.6 && !newPlaylistIds.includes(audioDetails[i].uri)) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
          if (newPlaylistIds.length < 1) {
            setNoSongs(true)
          } else {
            setNoSongs(false)
          }
        }
        break;
      case "Energetic":
        for (let i = 0; i < audioDetails.length; i++) {
          if (audioDetails[i].energy > 0.7 && !newPlaylistIds.includes(audioDetails[i].uri)) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
          if (newPlaylistIds.length < 1) {
            setNoSongs(true)
          } else {
            setNoSongs(false)
          }
        }
        break;
      case "Live":
        for (let i = 0; i < audioDetails.length; i++) {
          if (audioDetails[i].liveness > 0.6 && !newPlaylistIds.includes(audioDetails[i].uri)) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
          if (newPlaylistIds.length < 1) {
            setNoSongs(true)
          } else {
            setNoSongs(false)
          }
        }
        break;
      case "Major":
        for (let i = 0; i < audioDetails.length; i++) {
          if (audioDetails[i].mode == 1 && !newPlaylistIds.includes(audioDetails[i].uri)) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
          if (newPlaylistIds.length < 1) {
            setNoSongs(true)
          } else {
            setNoSongs(false)
          }
        }
        break;
      case "Minor":
        for (let i = 0; i < audioDetails.length; i++) {
          if (audioDetails[i].mode == 0 && !newPlaylistIds.includes(audioDetails[i].uri)) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
          if (newPlaylistIds.length < 1) {
            setNoSongs(true)
          } else {
            setNoSongs(false)
          }
        }
        break;
      case "Fastest":
        for (let i = 0; i < audioDetails.length; i++) {
          if (audioDetails[i].tempo > 120 && audioDetails[i].energy > 0.6 && !newPlaylistIds.includes(audioDetails[i].uri)) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
          if (newPlaylistIds.length < 1) {
            setNoSongs(true)
          } else {
            setNoSongs(false)
          }
        }
        break;
      case "Slowest":
        for (let i = 0; i < audioDetails.length; i++) {
          console.log(audioDetails[i].tempo)
          if (audioDetails[i].tempo < 105 && !newPlaylistIds.includes(audioDetails[i].uri)) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
          if (newPlaylistIds.length < 1) {
            setNoSongs(true)
          } else {
            setNoSongs(false)
          }
        }
        break;
      case "Loudest":
        for (let i = 0; i < audioDetails.length; i++) {
          console.log(audioDetails[i].loudness)
          if (audioDetails[i].loudness > -6 && !newPlaylistIds.includes(audioDetails[i].uri)) {
            newPlaylistIds.push(audioDetails[i].uri)
          }
          if (newPlaylistIds.length < 1) {
            setNoSongs(true)
          } else {
            setNoSongs(false)
          }
        }
    }

    if (newPlaylistIds.length > 0) {
      setFinished(true)
    } else {
      setNoSongs(true)
    }

    console.log(noSongs)
    }
}, [audioDetails])


  useEffect(() => {
    getUser(accessToken, setUserID)
  }, [])

  useEffect(() => {
    if (userID && newPlaylistIds && !newPlaylist && !noSongs) {
      createPlaylist(userID, accessToken, songType, playlistName, genre, setNewPlayListID, setNewPlaylist, newPlaylist)
    }
  }, [finished])

  useEffect(() => {
    addPlaylistTracks(newPlaylistIds, accessToken, newPlaylist, setPlaylistCreated)
  }, [newPlaylist])

  return (
    <div>
      {!playlistCreated && !noSongs ?
        <p>Loading...</p>
        : noSongs ?
        <NoSuitableSongs data={data} accessToken={accessToken} />
        :
        <PlaylistCreated newPlaylistID={newPlaylistID} data={data} accessToken={accessToken} />
      }
    </div>
  )
}
