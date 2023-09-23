import React, { useState } from 'react'
import axios from 'axios'

export default function NewPlaylist({ tracks, songType, accessToken }) {
  const [audioDetails, setaudioDetails] = useState()
  const [newPlaylistIds, setNewPlaylistIds] = useState()

  // console.log(tracks.forEach(element => console.log(element.track.id)))

  let trackids = []
  tracks.forEach(element => trackids.push(element.track.id))

  console.log(newPlaylistIds)

  if (songType && trackids && !audioDetails) {
    axios
      .get(`https://api.spotify.com/v1/audio-features?ids=${trackids}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data)
        setaudioDetails(res.data)
      })
      .catch((err) => {
        console.log(err.response)
      })

  }

  if (audioDetails) {

    for (let i = 0; i < audioDetails.length; i++) {
      console.log('test')
      if (audioDetails[i].danceability > 0.5) {
        console.log('test')
        setNewPlaylistIds(audioDetails[i].id)
      }
    }
  }

  return (
    <div>


    </div>
  )
}
