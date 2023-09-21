import React, { useState } from 'react'
import axios from 'axios'

export default function Playlist( {playlistid, accessToken} ) {
const [tracks, setTracks] = useState()

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20playlist-read-private`

if (playlistid && !tracks) {
axios
.get(`https://api.spotify.com/v1/playlists/${playlistid}/tracks`, {
  headers: {
    Authorization: "Bearer " + accessToken,
  },
})
.then((res) => {
  console.log(res.data)
  setTracks(res.data)
})
.catch((err) => {
  console.log(err.response)
})

}


  return (
    <div>
      {tracks ? <>
                      {tracks.items.map((track) =>
                        <p>{track.track.name}</p>
                    )}  
    </>
    :
    null}

    </div>
  )
}
