import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function NewPlaylist({ tracks, songType, accessToken }) {
  const [audioDetails, setaudioDetails] = useState()
  const [newPlaylistIds, setNewPlaylistIds] = useState([])
  const [userID, setUserID] = useState()
  const [newPlaylist, setNewPlaylist] = useState()
  const [finished, setFinished] = useState(false)
  const [playlistCreated, setPlaylistCreated] = useState(false)

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

  if (audioDetails && newPlaylistIds.length < audioDetails.length) {
    for (let i = 0; i < audioDetails.length; i++) {
      if (audioDetails[i].danceability > 0.85) {
        newPlaylistIds.push(audioDetails[i].uri)
        console.log(newPlaylistIds)
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
        name: 'New Playlist',
        description: 'New playlist description',
        public: false,
      };

      if (!newPlaylist) {
        axios.post(url, data, { headers })
          .then(response => {
            console.log('Playlist created:', response.data);
            setNewPlaylist(response.data.id)
          })
          .catch(error => {
            console.error('Error creating playlist:', error);
          });
      }
    }
  }, [finished])


  if (newPlaylist) {
    let uniqueuris = [...new Set(newPlaylistIds)].toString();

    console.log(uniqueuris)
    console.log(newPlaylist)

    const url = `https://api.spotify.com/v1/playlists/${newPlaylist}/tracks`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const data = {
      "uris": [
        `${uniqueuris}`
      ],
      "position": 0
    };

    axios.post(url, data, { headers })
      .then(response => {
        console.log(response.data);

      })
      .catch(error => {
        console.error(error);
      });
  }



return (
  <div>
{!playlistCreated ?
  <p>Loading...</p>
:
<p>done!</p>
}


  </div>
)
}
