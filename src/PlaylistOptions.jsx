import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

export default function Playlist( {playlistid, accessToken} ) {
const [tracks, setTracks] = useState()
const [songType, setSongType] = useState()

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

console.log(songType)


  return (
    <Container>
      {/* {tracks ? <>
                      {tracks.items.map((track) =>
                        <P>{track.track.name}</P>
                    )}  
    </>
    :
    null} */}
<h1>Create a new playlist with the...</h1>
<div/>
<div/>
<div>
<Radio type="radio">...happiest songs</Radio>
<P>...saddest songs</P>
<P>...energetic songs</P>
<P>...instrumental songs</P>
<P>...live songs</P>
<P>...songs in major key</P>
<P>...songs in minor key</P>
<P>...most danceable songs</P>
<P>...fastest songs</P>
<P>...slowest songs</P>
</div>
    </Container>
  )
}

const Container = styled.div`
width: 90%;
display: grid;
grid-template-columns: 1fr 1fr;
`

const P = styled.p`
cursor: pointer;

&:hover {
  color: #148255;
}
`

const Radio = styled.input`
list-type: none;
`