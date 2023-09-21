import React from 'react'
import axios from 'axios'

export default function Playlist( {playlist, accessToken} ) {


  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20playlist-read-private`



axios
.get(`${playlist}`, {
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


  return (
    <div>Playlist</div>
  )
}
