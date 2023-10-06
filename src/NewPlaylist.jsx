import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PlaylistCreated from './PlaylistCreated'

export default function NewPlaylist({ tracks, songType, playlistName, accessToken }) {
  const [audioDetails, setaudioDetails] = useState()
  const [newPlaylistIds, setNewPlaylistIds] = useState([])
  const [userID, setUserID] = useState()
  const [newPlaylist, setNewPlaylist] = useState()
  const [finished, setFinished] = useState(false)
  const [playlistCreated, setPlaylistCreated] = useState(false)
  const [newPlaylistID, setNewPlayListID] = useState()

  // console.log(tracks.forEach(element => console.log(element.track.id)))

  let trackids = []
  tracks.forEach(element => trackids.push(element.track.id))

  if (songType && trackids && !audioDetails) {
    axios
      .get(`https://api.spotify.com/v1/audio-features?ids=${trackids}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data)
        setaudioDetails(res.data.audio_features)
      })
      .catch((err) => {
        console.log(err.response)
      })

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
    axios
      .get(`https://api.spotify.com/v1/me`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data)
        setUserID(res.data.id)
      })
      .catch((err) => {
        console.log(err.response)
      })
  }, [])

  useEffect(() => {
    if (userID && newPlaylistIds && !newPlaylist) {
      const url = `https://api.spotify.com/v1/users/${userID}/playlists`;

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const data = {
        name: `${songType} songs from '${playlistName}'`,
        description: `Playlist containing the ${genre} songs from '${playlistName}'`,
        public: false,
      };

      if (!newPlaylist) {
        axios.post(url, data, { headers })
          .then(response => {
            console.log('Playlist created:', response.data);
            setNewPlayListID(response.data.id)
            setNewPlaylist(response.data.tracks.href)
          })
          .catch(error => {
            console.error('Error creating playlist:', error);
          });
      }
    }
  }, [finished])


  useEffect(() => {
    let uniqueuris = [...new Set(newPlaylistIds)];

    const requestHeaders = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const requestData = {
      uris: uniqueuris,
      position: 0
    };

    console.log(requestData)


    console.log(`${newPlaylist}`)

    axios.post(newPlaylist, requestData, {
      headers: requestHeaders
    })
      .then(response => {

        console.log(response.data);
        
        setPlaylistCreated(true)
      })
      .catch(error => {

        console.error(error);
      });

  }, [newPlaylist])

// Remove duplicates

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
