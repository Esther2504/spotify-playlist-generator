import React from 'react'
import axios from 'axios'

export default function NewPlaylist( {tracks, songType, accessToken} ) {
console.log(tracks.forEach(element => console.log(element.track.id)))

  if (songType && tracks) {
tracks.forEach(element => {
  axios
  .get(`https://api.spotify.com/v1/audio-features?ids=${element.track.id}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
  .then((res) => {
    console.log(res.data)
   
  })
  .catch((err) => {
    console.log(err.response)
  })

}
)

    
  }

  return (
    <div>


    </div>
  )
}
