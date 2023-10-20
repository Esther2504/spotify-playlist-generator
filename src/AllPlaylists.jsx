import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PlaylistOptions from './PlaylistOptions'
import EmptyPlaylist from './images/EmptyPlaylist.PNG'
import { getTracks } from './APICalls'

export default function AllPlaylists({ data, accessToken }) {
  const [playlistid, setPlaylistid] = useState()
  const [playlistName, setPlaylistName] = useState()
  const [publicplaylist, setPublicplaylist] = useState()
  const [firstSlide, setFirstSlide] = useState(0)
  const [lastSlide, setLastSlide] = useState(10)
  const [hidePrev, setHidePrev] = useState(true)
  const [hideNext, setHideNext] = useState(false)
  const [tracks, setTracks] = useState()
  const [error, setError] = useState(false)

  console.log(data)

  function choosePlaylist(playlist) {
    console.log(playlist.id)
    setPlaylistid(playlist.id)
    setPlaylistName(playlist.name)
  }


  function getPlaylistID() {
    console.log(publicplaylist)

    if (publicplaylist) {
      let publicplaylisturl = publicplaylist.split("?si")[0].split("/")
      let publicplaylistid = publicplaylisturl[publicplaylisturl.length - 1]

      setPlaylistid(publicplaylistid)
    }


  }

  if (playlistid && !tracks) {
    getTracks(playlistid, playlistName, setPlaylistName, accessToken, setTracks, setError)
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

console.log(error)

  return (
    <>
      {!playlistid && !tracks || error ?
        <Container>
          <h1>Choose one of your saved playlists</h1>
          <PlaylistContainer>
            {data.items.slice(firstSlide, lastSlide).map((playlist) =>
              <Playlist onClick={() => choosePlaylist(playlist)}>
                {playlist.images[0] ?
                  <img src={playlist.images[0].url} />
                  :
                  <img src={EmptyPlaylist} />
                }
                <p>{playlist.name}</p>
              </Playlist>
            )}
          </PlaylistContainer>
          <ButtonContainer>
            {!hidePrev ?
              <button onClick={() => setSlide('prev')}>Previous</button>
              : <div></div>
            }
            {!hideNext ?
              <button onClick={() => setSlide('next')}>Next</button>
              : <div></div>
            }
          </ButtonContainer>
          <PublicPlaylist>
            <h3>Or enter the link of a playlist</h3>
            <input placeholder='Enter Playlist URL' onChange={(e) => setPublicplaylist(e.target.value)}></input>
            <button onClick={() => getPlaylistID()}>Continue</button>
          </PublicPlaylist>
        </Container>
        :
        <PlaylistOptions playlistid={playlistid} playlistName={playlistName} data={data} accessToken={accessToken} setPlaylistName={setPlaylistName} tracks={tracks} />}
    </>
  )
}

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const PlaylistContainer = styled.div`
display: flex;
flex-wrap: wrap;
gap: 20px;
width: 1080px;
max-width: 100%;
`

const Playlist = styled.div`
width: 200px;
height: 250px;
background-color: #148255;
padding: 20px;
font-size: 0.9rem;
cursor: pointer;
overflow: hidden;


img {
width: 130px;
border: 1px solid white;
}
 p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 130px;
  margin: 10px auto;
 }
`
const ButtonContainer = styled.div`
width: 1080px;
display: flex;
justify-content: space-between;
margin-top: 20px;

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

const Image = styled.img`
width: 120px;
`

const PublicPlaylist = styled.div`
width: 500px;
display: flex;
flex-direction: column;
align-items: center;
background: #148255;
margin: 40px;
padding: 20px 5px;
gap: 10px;
// border: 1px solid white;

h3 {
 margin: 0;
 font-size: 1.2rem;
}

input {
  width: 85%;
  height: 30px;
  border: none;
  padding: 8px;
}

button {
  width: 85%;
  height: 30px;
  border: none;
  background: #fff;
  cursor: pointer;
  font-weight: 600;
  color: #33333;
}
`