import React, { useState } from 'react'
import styled from 'styled-components'
import PlaylistOptions from './PlaylistOptions'
import EmptyPlaylist from './images/EmptyPlaylist.PNG'

export default function AllPlaylists({ data, accessToken }) {
  const [playlistid, setPlaylistid] = useState()
  const [playlistName, setPlaylistName] = useState()
  const [publicplaylist, setPublicplaylist] = useState()

  console.log(data)

  function choosePlaylist(playlist) {
    console.log(playlist.id)
    setPlaylistid(playlist.id)
    setPlaylistName(playlist.name)
  }


  function getPlaylistID() {
    console.log(publicplaylist)

    let publicplaylisturl = publicplaylist.split("?si")[0].split("/")
    let publicplaylistid = publicplaylisturl[publicplaylisturl.length - 1]

    setPlaylistid(publicplaylistid)
  }

  return (
    <>
      {!playlistid ?
        <Container>
          <h1>Choose a playlist</h1>
          <PlaylistContainer>
            {data.items.map((playlist) =>
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
          <PublicPlaylist>
          <h3>Or use a public playlist</h3>
          <input placeholder='Enter Playlist URL' onChange={(e) => setPublicplaylist(e.target.value)}></input>
          <button onClick={() => getPlaylistID()}>Go</button>
          </PublicPlaylist>
        </Container>
        :
        <PlaylistOptions playlistid={playlistid} playlistName={playlistName} data={data} accessToken={accessToken} setPlaylistName={setPlaylistName} /> }
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
justify-items: space-evenly;
flex-wrap: wrap;
gap: 30px;
width: 1200px;
max-width: 100%;
`

const Playlist = styled.div`
width: 150px;
background-color: #148255;
padding: 20px;
font-size: 1rem;
cursor: pointer;
overflow: hidden;

img {
width: 130px;
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
padding: 20px;
gap: 10px;

h3 {
 margin: 0;
 font-size: 1.2rem;
}

input {
  width: 80%;
  height: 30px;
  border: none;
}

button {
  width: 80%;
  height: 30px;
  border: none;
  background: #fff;
}
`