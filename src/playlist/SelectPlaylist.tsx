import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PlaylistOptions from './PlaylistOptions.tsx'

export default function SeparateArtistPlaylist() {
  const [data, setData] = useState()
  const [error, setError] = useState<boolean>(false)
  const [playlistID, setPlaylistID] = useState<string>()
  const [playlistTool, setPlaylistTool] = useState<string>()

  const accessToken = localStorage.getItem('accessToken')

//   useEffect(() => {
// if (!data && playlistID) {
//   getPlaylists()
// }
//   }, [])

  function getPlaylists() {
    axios
      .get(`https://api.spotify.com/v1/playlists/${playlistID}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setData(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
        setError(true)
      })
  }


  return (
    <div>
      <p>Search for a playlist or enter a playlist id</p>
      <label>Your playlistid</label>
      <input type="text" onInput={(e) => setPlaylistID(e.target.value)}></input>

      <p>What would you like to do with this playlist?</p>
      <PlaylistOptions setPlaylistTool={setPlaylistTool} />
     <button onClick={() => getPlaylists()}>Start</button>
    </div>
  )
}
