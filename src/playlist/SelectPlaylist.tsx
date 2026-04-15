import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PlaylistOptions from './PlaylistOptions.tsx'
import styled from 'styled-components'
import ArtistPlaylist from './ArtistPlaylist.tsx'

export default function SeparateArtistPlaylist() {
  const [data, setData] = useState()
  const [error, setError] = useState<boolean>(false)
  const [playlistID, setPlaylistID] = useState<string>()
  const [playlistTool, setPlaylistTool] = useState<string>()
  const [step, setStep] = useState<number>(1)

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
    <Container>
      {step == 1 ?
        <>
          <p>Search for a playlist or enter a playlist id</p>
          <label>Your playlistid</label>
          <input type="text" onInput={(e) => setPlaylistID(e.target.value)}></input>
          <button onClick={() => getPlaylists()}>Start</button>
          <p>What would you like to do with this playlist?</p>
          <PlaylistOptions setPlaylistTool={setPlaylistTool} />
        </>
        :
        <>
          {playlistTool == "ArtistPlaylist" && playlistID ?
            <ArtistPlaylist playlistid={playlistID} playlistItems={data.items.items} />
            : null
          }
        </>
      }


    </Container>
  )
}


const Container = styled.div`
max-width: 1400px;
width: 90%;
margin: 0 auto;

.login-btn {
background: #148255;
color: #fff;
padding: 10px 20px;
text-decoration: none;
border-radius: 20px;
width: fit-content;
}

h1 {
margin: 20px 0;
}
`