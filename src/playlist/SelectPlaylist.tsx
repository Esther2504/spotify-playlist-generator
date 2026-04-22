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
  const [errorMessage, SetErrorMessage] = useState()
  const [playlistItems, setPlaylistItems] = useState([])

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
        setPlaylistItems(res.data.items.items)
        if (res.data.items.total > 100) {
          getAllTracks(res.data.items.next)
          console.log(res.data.items.next)
        }

        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
        setError(true)
        SetErrorMessage(err.response.data.error.message)
      })
  }

  function getAllTracks(nextURL : string) {
 axios
      .get(`${nextURL}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {

        setPlaylistItems((prevItems) => [...prevItems, ...res.data.items])

        if (res.data.next) {
          getAllTracks(res.data.next)
        }

        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
        setError(true)
        SetErrorMessage(err.response.data.error.message)
      })
   }
  //  0TQBfIB1DDcLVmAHLiIGsi

  return (
    <Container>
      {step == 1 && !playlistTool ?
        <>
          <p>Search for a playlist or enter a playlist id</p>
          <label>Your playlistid</label>
          <input type="text" onInput={(e) => setPlaylistID(e.target.value)}></input>
          <button onClick={() => getPlaylists()}>Start</button>
          <p>What would you like to do with this playlist?</p>
          <p>{errorMessage}</p>
          <PlaylistOptions setPlaylistTool={setPlaylistTool} />
          <button onClick={() => setStep(2)}>Next</button>
        </>
        :
        <>
          {playlistTool == "ArtistPlaylist" && playlistID ?
            <ArtistPlaylist playlistid={playlistID} playlistItems={playlistItems} playlistName={data.name} />
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
margin: 50px auto;

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