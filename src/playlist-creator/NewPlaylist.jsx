import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { createPlaylist, getAudioFeatures, getUser, addPlaylistTracks } from './APICalls'
import PlaylistCreated from './PlaylistCreated'
import NoSuitableSongs from './NoSuitableSongs'

export default function NewPlaylist({ tracks, songType, playlistName, data, accessToken, setError }) {
  const [audioDetails, setaudioDetails] = useState()
  const [newPlaylistIds, setNewPlaylistIds] = useState([])
  const [userID, setUserID] = useState()
  const [newPlaylist, setNewPlaylist] = useState()
  const [finished, setFinished] = useState(false)
  const [playlistCreated, setPlaylistCreated] = useState(false)
  const [newPlaylistID, setNewPlayListID] = useState()
  const [noSongs, setNoSongs] = useState(false)

  let trackids = []
  tracks.forEach(element => {
    if (element.track || element.type == "track") {
      if (element.track) {
        trackids.push(element.track.id)
      } else {
        trackids.push(element.id)
      }
    }
  })

  if (songType && trackids && !audioDetails) {
    getAudioFeatures(trackids, accessToken, setaudioDetails, setError)
  }

  let genre = songType.toLowerCase()

  useEffect(() => {
    if (audioDetails) {
      switch (songType) {
        case "Happy":
          for (let i = 0; i < audioDetails.length; i++) {
            if (audioDetails[i]) {
              if (audioDetails[i].valence > 0.5 && audioDetails[i].energy > 0.4 && audioDetails[i].tempo > 95 && !newPlaylistIds.includes(audioDetails[i].uri)) {
                newPlaylistIds.push(audioDetails[i].uri)
              }
            }
          }
          if (newPlaylistIds.length < 1) {
            setNoSongs(true)
          } else {
            setNoSongs(false)
          }
          break;
        case "Sad":
          for (let i = 0; i < audioDetails.length; i++) {
            if (audioDetails[i]) {
              if (audioDetails[i].valence < 0.4 && audioDetails[i].energy < 0.8 && !newPlaylistIds.includes(audioDetails[i].uri)) {
                newPlaylistIds.push(audioDetails[i].uri)
              }
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
            if (audioDetails[i]) {
              if (audioDetails[i].acousticness > 0.8 && !newPlaylistIds.includes(audioDetails[i].uri)) {
                newPlaylistIds.push(audioDetails[i].uri)
              }
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
            if (audioDetails[i]) {
              if (audioDetails[i].danceability > 0.6 && audioDetails[i].energy > 0.6 && !newPlaylistIds.includes(audioDetails[i].uri)) {
                newPlaylistIds.push(audioDetails[i].uri)
              }
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
            if (audioDetails[i]) {
              if (audioDetails[i].energy > 0.7 && !newPlaylistIds.includes(audioDetails[i].uri)) {
                newPlaylistIds.push(audioDetails[i].uri)
              }
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
            if (audioDetails[i]) {
              if (audioDetails[i].liveness > 0.6 && !newPlaylistIds.includes(audioDetails[i].uri)) {
                newPlaylistIds.push(audioDetails[i].uri)
              }
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
            if (audioDetails[i]) {
              if (audioDetails[i].mode == 1 && !newPlaylistIds.includes(audioDetails[i].uri)) {
                newPlaylistIds.push(audioDetails[i].uri)
              }
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
            if (audioDetails[i]) {
              if (audioDetails[i].mode == 0 && !newPlaylistIds.includes(audioDetails[i].uri)) {
                newPlaylistIds.push(audioDetails[i].uri)
              }
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
            if (audioDetails[i]) {
              if (audioDetails[i].tempo > 120 && audioDetails[i].energy > 0.6 && !newPlaylistIds.includes(audioDetails[i].uri)) {
                newPlaylistIds.push(audioDetails[i].uri)
              }
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
            if (audioDetails[i]) {
              if (audioDetails[i].tempo < 105 && audioDetails[i].energy < 0.65 && !newPlaylistIds.includes(audioDetails[i].uri)) {
                newPlaylistIds.push(audioDetails[i].uri)
              }
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
            if (audioDetails[i]) {
              if (audioDetails[i].loudness > -6 && !newPlaylistIds.includes(audioDetails[i].uri)) {
                newPlaylistIds.push(audioDetails[i].uri)
              }
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
    }
  }, [audioDetails])

  useEffect(() => {
    getUser(accessToken, setUserID)
  }, [])

  useEffect(() => {
    if (userID && newPlaylistIds && !newPlaylist && !noSongs) {
      createPlaylist(userID, accessToken, songType, playlistName, genre, setNewPlayListID, setNewPlaylist, newPlaylist, setError)
    }
  }, [finished])

  useEffect(() => {
    addPlaylistTracks(newPlaylistIds, accessToken, newPlaylist, setPlaylistCreated, setError)
  }, [newPlaylist])

  return (
    <>
      {!playlistCreated && !noSongs ?
        <Spinner>
          <Circle />
          <Circle />
          <Circle />
          <Circle />
          <Circle />
        </Spinner>
        : noSongs ?
          <NoSuitableSongs data={data} accessToken={accessToken} />
          :
          <PlaylistCreated newPlaylistID={newPlaylistID} data={data} accessToken={accessToken} />
      }
    </>
  )
}

const Spinner = styled.div`
position: relative;
`
const Circle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 90px;
  background: white;
  animation: spinner 0.7s cubic-bezier(.38,.55,.8,.38) infinite;
  position: absolute;
  top: 0;
  left: 0;

&:nth-child(2) {
  animation: spinner 0.8s cubic-bezier(.38,.55,.8,.38) infinite;
}

&:nth-child(3) {
  animation: spinner 0.9s cubic-bezier(.38,.55,.8,.38) infinite;
}

&:nth-child(4) {
  animation: spinner 1s cubic-bezier(.38,.55,.8,.38) infinite;
}

&:nth-child(5) {
  animation: spinner 1.1s cubic-bezier(.38,.55,.8,.38) infinite;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg)
    translate(-50px);
  }
  100% {
    transform: rotate(360deg)
    translate(-50px);
  }
}
`