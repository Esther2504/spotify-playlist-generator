import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import AllPlaylists from './AllPlaylists'

export default function NoSuitableSongs({data, accessToken}) {
    const [createNew, setCreateNew] = useState(false)

  return (
    <>
    {!createNew ?
    <Container>
      <div>
        <h1>We couldn't find any fitting songs in your playlist</h1>
        <p>Want to try another playlist?</p>
        <button onClick={() => setCreateNew(true)}>Another playlist</button>
      </div>
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