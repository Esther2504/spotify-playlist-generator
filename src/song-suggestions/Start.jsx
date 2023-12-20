import React, { useEffect, useState } from 'react'
import { getUser, getGenres, searchSong, searchArtist, getRecommendations, createPlaylist, addTracks } from './APICalls'
import styled from 'styled-components'
import StartPage from '../song-suggestions/StartPage'
import FaveArtists from './Artists'
import FaveSongs from './Songs'
import Genres from './Genres'
import RecomAmount from './RecomAmount'
import Loading from './Loading'
import PlaylistNameDescription from './PlaylistName'
import Playlist from './Playlist'

export default function Start({ AUTH_URL }) {
  const [step, setStep] = useState(1)
  // const [genres, setGenres] = useState()
  const [song, setSong] = useState([])

  const [songSuggestions, setSongSuggestions] = useState()
  const [chosenSongs, setChosenSongs] = useState([])
  const [chosenArtists, setChosenArtists] = useState([])
  const [chosenGenres, setChosenGenres] = useState([])
  const [amount, setAmount] = useState(20)
  const [border, setBorder] = useState("10px")
  const [accessToken, setAccessToken] = useState()
  const [userID, setUserID] = useState()
  const [PlaylistName, setPlaylistName] = useState()
  const [PlaylistDescription, setPlaylistDescription] = useState()
  const [newPlaylist, setNewPlayList] = useState()
  const [recommendations, setRecommendations] = useState([])

  // const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/spotify-playlist-generator?&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20playlist-read-private%20playlist-modify-public%20playlist-modify-private`

  const getAccessToken = window.location.hash.substring(14).split('&')[0]

  useEffect(() => {
    if (window.location.hash.includes("access_token")) {
      setAccessToken(getAccessToken)
    }
  }, [window.location])

  useEffect(() => {
    if (getAccessToken) {
      // getGenres(getAccessToken, setGenres)
      setStep(2)
    }
  }, [getAccessToken])

  function getSongSuggestions(value) {
    setSong(value)
    if (value.length > 2) {
      searchSong(getAccessToken, song, setSongSuggestions)
    }
  }

  let artistsseeds = (chosenArtists.map((artist) => artist.id)).toString()
  let tracksseeds = (chosenSongs.map((song) => song.id)).toString()
  let genreseeds = (chosenGenres.map((genre) => genre).toString())

  useEffect(() => {
    if (step == 6) {
      getRecommendations(getAccessToken, artistsseeds, tracksseeds, genreseeds, amount, recommendations, setRecommendations);
      getUser(accessToken, setUserID);
      
      
      console.log(userID)
    } else if (step == 7) {
        createPlaylist(getAccessToken, userID, PlaylistName, PlaylistDescription, recommendations, newPlaylist, setNewPlayList)

       
    }
  }, [step])

  useEffect(() => {
    if (newPlaylist) {
      addTracks(getAccessToken, recommendations, newPlaylist, setStep)
    }
  }, [newPlaylist])

  return (
    <div>
      {step == 2 || step == 3 || step == 4 || step == 5 ?
      <BarContainer>
      <Bar></Bar>
      <CircleContainer>
        {step == 2 || step == 3 || step == 4 || step == 5 ?
        <Circle color={"#148255"} onClick={() => setStep(2)}>1</Circle>
        : 
        <Circle color={"#ffffff"} onClick={() => setStep(2)}>1</Circle>
        }
      <p>Artist</p>
      </CircleContainer>
      <CircleContainer>
      {step == 3 || step == 4 || step == 5 ?
        <Circle color={"#148255"} onClick={() => setStep(3)}>2</Circle>
        : 
        <Circle color={"#ffffff"} onClick={() => setStep(3)}>2</Circle>
        }
      <p>Song</p>
      </CircleContainer>
      <CircleContainer>
      {step == 4 || step == 5 ?
        <Circle color={"#148255"} onClick={() => setStep(4)}>3</Circle>
        : 
        <Circle color={"#ffffff"} onClick={() => setStep(4)}>3</Circle>
        }
      <p>Genre</p>
      </CircleContainer>
      <CircleContainer>
      {step == 5 ?
        <Circle color={"#148255"} onClick={() => setStep(5)}>4</Circle>
        : 
        <Circle color={"#ffffff"} onClick={() => setStep(5)}>4</Circle>
        }
      <p>Amount</p>
      </CircleContainer>
      </BarContainer>
      : null
    }
      
      {step == 1 ?
        <>
          <StartPage AUTH_URL={AUTH_URL} />
        </>
        : step == 2 ?
          <FaveArtists getAccessToken={getAccessToken} chosenArtists={chosenArtists} setChosenArtists={setChosenArtists} setStep={setStep} />
          : step == 3 ?
            <FaveSongs getAccessToken={getAccessToken} chosenSongs={chosenSongs} setChosenSongs={setChosenSongs} setStep={setStep} />
            : step == 4 ?
              <Genres chosenGenres={chosenGenres} setChosenGenres={setChosenGenres} getAccessToken={getAccessToken} setStep={setStep} />
              : step == 5 ?
                <RecomAmount amount={amount} setAmount={setAmount} setStep={setStep} />
                : step == 6 ?
                  <PlaylistNameDescription setPlaylistName={setPlaylistName} setPlaylistDescription={setPlaylistDescription} setStep={setStep} />
                  : step == 7 ?
                    <Loading />
                    :
                    <Playlist newPlaylist={newPlaylist} />
      }
    </div>
  )
}

const Button = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px 30px;
font-size: 1.5rem;
cursor: pointer;
`
const SmallButton = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px;
font-size: 1rem;
cursor: pointer;
`

const TextInput = styled.input`
width: 500px;
height: 40px;
font-size: 1rem;
border: 2px solid #148255;
border-radius: ${props => props.border};
padding: 0 10px;
outline: none;
`

const Suggestions = styled.div`
border: 2px solid #148255;
width: 500px;
margin: 0 auto;
padding: 0 10px;
text-align: left;
font-size: 0.9rem;
border-radius: 0 0 10px 10px;
`

const Suggestion = styled.p`
cursor: pointer;
display: flex;
align-items: center;
`

const ArtistImg = styled.img`
width: 50px;
margin-right: 5px;
`

const Checkbox = styled.input`

`

const Label = styled.label`
cursor: pointer;
`


const BarContainer = styled.div`
width: 800px;
display: flex;
margin: 0 auto;
justify-content: space-between;
`

const Bar = styled.div`
width: 800px;
height: 8px;
background-color: white;
position: absolute;
top: 35px;
border-radius: 20px;
`

const CircleContainer = styled.div`
display: flex;
flex-direction: column;
width: 40px;
font-size: 0.7rem;
font-weight: 600;
z-index: 2;
`

const Circle = styled.div`
width: 40px;
height: 40px;
background-color: ${props => props.color};
border-radius: 20px;
// position: relative;
// top: -15px;
color: ${props => props.color == "#ffffff" ? "black" : "white"};
cursor: pointer;

&:hover {
  background-color: #148255;
}
`