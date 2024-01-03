import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PlaylistOptions from './PlaylistOptions'
import EmptyPlaylist from '../images/EmptyPlaylist.PNG'
import { getTracks } from './APICalls'

export default function AllPlaylists({ accessToken, data, setError }) {
  const [playlistid, setPlaylistid] = useState()
  const [playlistName, setPlaylistName] = useState()
  const [publicplaylist, setPublicplaylist] = useState()
  const [firstSlide, setFirstSlide] = useState(0)
  const [lastSlide, setLastSlide] = useState(10)
  const [hidePrev, setHidePrev] = useState(true)
  const [hideNext, setHideNext] = useState(false)
  const [tracks, setTracks] = useState()

  function choosePlaylist(playlist) {
    setPlaylistid(playlist.id)
    setPlaylistName(playlist.name)
  }

  function getPlaylistID() {
    if (publicplaylist) {
      let publicplaylisturl = publicplaylist.split("?si")[0].split("/")
      let publicplaylistid = publicplaylisturl[publicplaylisturl.length - 1]
      setPlaylistid(publicplaylistid)
    }
  }

  function setSlide(p) {
    if (p == 'next' && lastSlide < data.items.length) {
      setFirstSlide(firstSlide + 10)
      setLastSlide(lastSlide + 10)
      setHidePrev(false)
    } else if (p == 'prev' && firstSlide != '0') {
      setFirstSlide(firstSlide - 10)
      setLastSlide(lastSlide - 10)
    }
  }

  if (playlistid && !tracks) {
    getTracks(playlistid, playlistName, setPlaylistName, accessToken, setTracks, setError)
  }

  useEffect(() => {
    if (lastSlide >= data.items.length) {
      setHideNext(true)
    } else if (firstSlide == 0) {
      setHidePrev(true)
    } else {
      setHideNext(false)
      setHidePrev(false)
    }
  }, [firstSlide, lastSlide])

  return (
    <>
      {!playlistid && !tracks || !tracks ?
        <Container>
          <H1>Choose one of your saved playlists</H1>
          <PlaylistContainer>
            {data.items.slice(firstSlide, lastSlide).map((playlist) =>
              <Playlist onClick={() => choosePlaylist(playlist)}>
                {playlist.images[0] ?
                  <Image src={playlist.images[0].url} />
                  :
                  <Image src={EmptyPlaylist} />
                }
                <P>{playlist.name}</P>
              </Playlist>
            )}
          </PlaylistContainer>
          <ButtonContainer>
            <Button onClick={() => setSlide('prev')} hidePrev={hidePrev}>Previous</Button>
            <Button onClick={() => setSlide('next')} hideNext={hideNext}>Next</Button>
          </ButtonContainer>
          <PublicPlaylist>
            <H3>Or enter the link of a playlist/album</H3>
            <Input placeholder='Enter URL' onChange={(e) => setPublicplaylist(e.target.value)} onKeyDown={() => getPlaylistID()}></Input>
            <SubmitButton onClick={() => getPlaylistID()}>Continue</SubmitButton>
          </PublicPlaylist>
        </Container>
        :
        <PlaylistOptions playlistid={playlistid} playlistName={playlistName} data={data} accessToken={accessToken} setPlaylistName={setPlaylistName} tracks={tracks} setError={setError} />}
    </>
  )
}

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 0 auto;
`
const PlaylistContainer = styled.div`
width: 1080px;
max-width: 90%;
justify-content: space-evenly;
display: grid; 
grid-template-columns: repeat(5, 1fr);
justify-content: space-evenly;
gap: 20px;

@media screen and (max-width: 1100px) {
  grid-template-columns: repeat(4, 1fr);
  width: auto;
}

@media screen and (max-width: 900px) {
  grid-template-columns: repeat(3, 1fr);
  width: auto;
}

@media screen and (max-width: 680px) {
  grid-template-columns: repeat(2, 1fr);
  width: auto;
}
`
const Playlist = styled.div`
width: 200px;
height: 250px;
background-color: #148255;
padding: 20px;
font-size: 0.9rem;
cursor: pointer;
overflow: hidden;

@media screen and (max-width: 450px) {
  width: 120px;
  height: 185px;
  padding: 10px 5px;
}
`
const Image = styled.img`
width: 130px;
border: 1px solid white;

@media screen and (max-width: 450px) {
  width: 100px;
}
`
const H3 = styled.h3`
margin: 0;
font-size: 1.2rem;
`
const P = styled.p`
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
max-width: 130px;
margin: 10px auto;
`
const ButtonContainer = styled.div`
width: 1080px;
max-width: 100%;
display: flex;
justify-content: space-between;
margin-top: 20px;

@media screen and (max-width: 1100px) {
  width: 860px;
}

@media screen and (max-width: 900px) {
  width: 640px;
}

@media screen and (max-width: 680px) {
  width: 420px;
}

@media screen and (max-width: 450px) {
  width: 260px;
}
`
const PublicPlaylist = styled.div`
width: 500px;
display: flex;
flex-direction: column;
align-items: center;
background: #148255;
margin: 20px;
padding: 20px 5px;
gap: 10px;

@media screen and (max-width: 680px) {
  width: 420px;
}

@media screen and (max-width: 450px) {
  width: 260px;
}
`
const Input = styled.input`
width: 85%;
height: 30px;
border: none;
padding: 8px;
`
const Button = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px 30px;
font-size: 1.2rem;
font-weight: 600;
cursor: pointer;
width: 130px;

@media screen and (max-width: 450px) {
  width: 120px;
}

${({ hidePrev }) => hidePrev && `
    visibility: hidden;
  `}

  ${({ hideNext }) => hideNext && `
    visibility: hidden;
  `}
`
const SubmitButton = styled.button`
width: 85%;
height: 30px;
border: none;
background: #fff;
cursor: pointer;
font-weight: 600;
color: #33333;
`
const H1 = styled.h1``