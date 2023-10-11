import React, { useState } from 'react'
import styled from 'styled-components'
import AllPlaylists from './AllPlaylists'

export default function PlaylistCreated({ newPlaylistID, data, accessToken }) {
  const [createNew, setCreateNew] = useState(false)

  console.log(newPlaylistID)
  return (
    <>
    {!createNew ?
      <Container>
      <div>
        <h1>Your playlist was created!</h1>
        <p>Want to create another playlist?</p>
        <button onClick={() => setCreateNew(true)}>Create new playlist</button>
      </div>
      <iframe src={`https://open.spotify.com/embed/playlist/${newPlaylistID}`} width="100%" height="652" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </Container>
      : <AllPlaylists data={data} accessToken={accessToken} />
    }
    </>
  )
}

const Container = styled.div`
width: 1100px;
max-width: 100%;
display: flex;
text-align: left;
gap: 30px;

button {
  background: #148255;
  border: none;
  color: #fff;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
}
`