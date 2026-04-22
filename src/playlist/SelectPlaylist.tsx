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
  // const [playlistid, setPlaylistid] = useState()
  const [playlistName, setPlaylistName] = useState()
  const [publicplaylist, setPublicplaylist] = useState()
  const [firstSlide, setFirstSlide] = useState(0)
  const [lastSlide, setLastSlide] = useState(10)
  const [hidePrev, setHidePrev] = useState(true)
  const [hideNext, setHideNext] = useState(false)
  const [tracks, setTracks] = useState()
  const [ownPlaylists, setOwnPlaylists] = useState([])


  const accessToken = localStorage.getItem('accessToken')

  //   useEffect(() => {
  // if (!data && playlistID) {
  //   getPlaylists()
  // }
  //   }, [])


  useEffect(() => {
    if (ownPlaylists.length == 0) {
      getOwnPlaylists()
    }
  }, [accessToken])

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

  function getAllTracks(nextURL: string) {
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

  function setSlide(p) {
    if (p == 'next' && lastSlide < ownPlaylists.length) {
      setFirstSlide(firstSlide + 10)
      setLastSlide(lastSlide + 10)
      setHidePrev(false)
    } else if (p == 'prev' && firstSlide != 0) {
      setFirstSlide(firstSlide - 10)
      setLastSlide(lastSlide - 10)
    }
  }

  function getOwnPlaylists() {
    axios
      .get('https://api.spotify.com/v1/me/playlists?limit=30', {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data)
        setOwnPlaylists(res.data.items)
      })
      .catch((err) => {
        setError(true)
      })
  }

  useEffect(() => {
    if (playlistID) {
      getPlaylists()
    }
  }, [playlistID])

  function getPublicPlaylistID({ url }) {
    if (url) {
      let publicplaylisturl = url.split("?si")[0].split("/")
      let publicplaylistid = publicplaylisturl[publicplaylisturl.length - 1]
      setPlaylistID(publicplaylistid)
    }
  }

console.log(ownPlaylists)
  return (
    <Container>
      {step == 1 && !playlistTool ?
        <>
          <Container>
            <h1>Choose one of your saved playlists</h1>
            <PlaylistContainer>
                {ownPlaylists?.slice(firstSlide, lastSlide).map((playlist) =>
                           <Playlist onClick={() => setPlaylistID(playlist?.id)}>
                             {playlist.images ?
                               <Image src={playlist.images[0].url} />
                               :
                               <Image src={"EmptyPlaylist"} />
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
              <Input placeholder='Enter URL' onKeyDown={(e) => getPublicPlaylistID(e.target.value)}></Input>
              <SubmitButton>Continue</SubmitButton>
            </PublicPlaylist>
          </Container>
          <h1>Select one of your playlists or enter the URL to a playlist</h1>
          <label>Your playlistid</label>
          <input type="text" onInput={(e) => setPlaylistID(e.target.value)}></input>
          <button onClick={() => getPlaylists()}>Get playlist</button>
          <p>What would you like to do with this playlist?</p>
          <p>{errorMessage}</p>
          <PlaylistOptions setPlaylistTool={setPlaylistTool} playlistTool={playlistTool} />
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
margin-bottom: 20px;

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