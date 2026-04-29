import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PlaylistOptions from '../PlaylistOptions.tsx'
import styled from 'styled-components'
import ArtistPlaylist from './ArtistPlaylist.tsx'
import EmptyPlaylist from '../../images/EmptyPlaylist.PNG'
import dummyplaylists from '../../data/dummysavedplaylists.json'
import playlist from '../../data/dummyplaylist.json'

export default function SeparateArtistPlaylist({setPlaylistReady, setPlaylistItems, setPlaylistName, setPlaylistID, playlistID}) {
  const [data, setData] = useState()
  const [error, setError] = useState<boolean>(false)
  // const [playlistID, setPlaylistID] = useState<string>()

  const [step, setStep] = useState<number>(1)
  const [errorMessage, SetErrorMessage] = useState()
  
  // const [playlistid, setPlaylistid] = useState()
  
  const [publicplaylist, setPublicplaylist] = useState()
  const [firstSlide, setFirstSlide] = useState(0)
  const [lastSlide, setLastSlide] = useState(10)
  const [hidePrev, setHidePrev] = useState(true)
  const [hideNext, setHideNext] = useState(false)
  const [tracks, setTracks] = useState()
  const [ownPlaylists, setOwnPlaylists] = useState([])
  const [publicPlaylist, setPublicPlaylist] = useState<string>()


  const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
  if (!data && playlistID) {
    console.log('get it')
    getPlaylists()
  }
    }, [playlistID])

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
        setPlaylistName(res.data.name)
        setPlaylistItems(res.data.items.items)
        if (res.data.items.total > 100) {
          getAllTracks(res.data.items.next)
          console.log(res.data.items.next)
        } else {
          setPlaylistReady(true)
          console.log('ready!')
        }

        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
        setError(true)
        SetErrorMessage(err.response.data.error.message)
      })

        // setData(playlist.data)
        // setPlaylistName(playlist.data.name)
        // setPlaylistItems(playlist.data.items.items)
        // setPlaylistReady(true)

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
        } else {
          setPlaylistReady(true)
          console.log('ready!')
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
    // setOwnPlaylists(dummyplaylists.data.items)
  }

  useEffect(() => {
    console.log(playlistID)
  }, [playlistID])

  function getPublicPlaylistID(url) {
console.log(url)
    if (url) {
      let publicplaylisturl = url.split("?si")[0].split("/")
      let publicplaylistid = publicplaylisturl[publicplaylisturl.length - 1]
      setPlaylistID(publicplaylistid)
      
      console.log(publicplaylistid)
    }
  }

console.log(ownPlaylists)
  return (
    <Container>
        <>
          <Container>
            <div>
            <h1>Choose one of your playlists</h1>
            <a href="#enterurl" target="_self">or enter an URL</a>
            </div>
            <PlaylistContainer>
                {ownPlaylists?.slice(firstSlide, lastSlide).map((playlist) =>
                           <Playlist id={playlist.id} onClick={() => setPlaylistID(playlist.id)}>
                             {playlist.images ?
                               <Image src={playlist.images[0].url} />
                               :
                               <Image src={EmptyPlaylist} />
                             }
                             <p>{playlist.name}</p>
                           </Playlist>
                         )}
            </PlaylistContainer>
            <ButtonContainer>
              <Button onClick={() => setSlide('prev')} hidePrev={hidePrev}>Previous</Button>
              <Button onClick={() => setSlide('next')} hideNext={hideNext}>Next</Button>
            </ButtonContainer>
            <PublicPlaylist id="enterurl">
              <h3>Enter the link of a playlist/album</h3>
              <Input placeholder='Enter URL' onInput={(e) => setPublicPlaylist(e.target.value)}></Input>
              <SubmitButton onClick={(e) => getPublicPlaylistID(publicPlaylist)}>Continue</SubmitButton>
              <p>{errorMessage}</p>
            </PublicPlaylist>
          </Container>
          
        </>
    </Container>
  )
}


const Container = styled.div`
max-width: 1400px;
width: 90%;
margin: 0;
display: flex;
flex-direction: column;
align-items: center;
gap: 50px;
scroll-behavior: smooth;

.login-btn {
background: #148255;
color: #fff;
padding: 10px 20px;
text-decoration: none;
border-radius: 20px;
width: fit-content;
}

h1 {
font-size: 2.6rem;
}
a {
text-align: center;
display: block;
margin: 7px 0 0;
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
height: 200px;
background-color: #148255;
padding: 20px;
font-size: 0.9rem;
cursor: pointer;
overflow: hidden;
display: flex;
align-items: center;
flex-direction: column;
gap: 10px;
    border-radius: 15px;

p {
    margin-top: -70%;
    padding: 5px;
    text-align: center;
    display: none;
    }
&:hover {

p {
display: block;
}
}

@media screen and (max-width: 450px) {
  width: 120px;
  height: 185px;
  padding: 10px 5px;
}
`
const Image = styled.img`
width: 100%;
border-radius: 15px;
    border: 2px solid white;
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
margin: 0;

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
padding: 25px;
gap: 10px;
border-radius: 20px;

h3 {
background: transparent;
}

@media screen and (max-width: 680px) {
  width: 420px;
}

@media screen and (max-width: 450px) {
  width: 260px;
}
`
const Input = styled.input`
width: 100%;
height: 40px;
border: none;
border-radius: 5px;
padding: 8px;
`
const Button = styled.button`
background: #148255;
width: 100%;
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
    padding: 10px 20px;
border: none;
background: #fff;
cursor: pointer;
font-weight: 600;
color: #333333;
border-radius: 20px;
`
const H1 = styled.h1``