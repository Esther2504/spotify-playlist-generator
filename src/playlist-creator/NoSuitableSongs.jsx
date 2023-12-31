import styled from 'styled-components'
import { useState } from 'react'
import AllPlaylists from './AllPlaylists'

export default function NoSuitableSongs({ data, accessToken }) {
  const [createNew, setCreateNew] = useState(false)

  return (
    <>
      {!createNew ?
        <Container>
          <H1>We couldn't find any fitting songs in this playlist</H1>
          <P>Want to try another playlist?</P>
          <Button onClick={() => setCreateNew(true)}>Choose a playlist</Button>
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
flex-direction: column;
`
const Button = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px 30px;
font-size: 1.2rem;
font-weight: 600;
cursor: pointer;
width: 250px;
`
const H1 = styled.h1``
const P = styled.p``