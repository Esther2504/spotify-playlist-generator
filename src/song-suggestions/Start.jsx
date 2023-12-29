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
  const [chosenSongs, setChosenSongs] = useState()
  const [chosenArtists, setChosenArtists] = useState()
  const [chosenGenres, setChosenGenres] = useState()
  const [amount, setAmount] = useState(20)
  const [border, setBorder] = useState("10px")
  const [accessToken, setAccessToken] = useState()
  const [userID, setUserID] = useState()
  const [PlaylistName, setPlaylistName] = useState()
  const [PlaylistDescription, setPlaylistDescription] = useState()
  const [newPlaylist, setNewPlayList] = useState()
  const [recommendations, setRecommendations] = useState([])

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

  let artistsseeds = chosenArtists
  let tracksseeds = chosenSongs
  let genreseeds = chosenGenres

  console.log(artistsseeds)

  useEffect(() => {
    if (step == 6) {
      getRecommendations(getAccessToken, artistsseeds, tracksseeds, genreseeds, amount, recommendations, setRecommendations);
      getUser(accessToken, setUserID);
    } else if (step == 7) {
        createPlaylist(getAccessToken, userID, PlaylistName, PlaylistDescription, recommendations, newPlaylist, setNewPlayList)
    }
  }, [step])

  useEffect(() => {
    if (newPlaylist) {
      addTracks(getAccessToken, recommendations, newPlaylist, setStep)
    }
  }, [newPlaylist])

  function startOver() {
    setStep(2)
    setChosenSongs()
    setChosenArtists()
    setChosenGenres()
  }

  return (
    <div>
      {step != 1 && step < 6 ?
      <BarContainer>
      <Bar></Bar>
      <BarProgress step={step} />
      <Circles>
        <CircleContainer><Circle color={"#148255"} onClick={() => setStep(2)}>1</Circle><br/><span>Artist</span></CircleContainer>
      {step == 3 || step == 4 || step == 5 ?
      <>
        <CircleContainer><Circle color={"#148255"} onClick={() => setStep(3)}>2</Circle><p>Song</p></CircleContainer>
        </>
        : 
        <CircleContainer><Circle color={"#ffffff"} onClick={() => setStep(3)}>2</Circle><p>Song</p></CircleContainer>
        }
      <CircleContainer>
      {step == 4 || step == 5 ?
      <>
        <CircleContainer><Circle color={"#148255"} onClick={() => setStep(4)}>3</Circle><p>Genre</p></CircleContainer>
        </>
        : 
        <CircleContainer><Circle color={"#ffffff"} onClick={() => setStep(4)}>3</Circle><p>Genre</p></CircleContainer>
        }
      </CircleContainer>
      <CircleContainer>
      {step == 5 ?
        <CircleContainer><Circle color={"#148255"} onClick={() => setStep(5)}>4</Circle><p>Amount</p></CircleContainer>
        : 
        <CircleContainer><Circle color={"#ffffff"} onClick={() => setStep(5)}>4</Circle><p>Amount</p></CircleContainer>
        }
      </CircleContainer>
      </Circles>
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
                <RecomAmount amount={amount} setAmount={setAmount} chosenArtists={chosenArtists} chosenSongs={chosenSongs} chosenGenres={chosenGenres} setStep={setStep} />
                : 
                step == 6 ?
                  <PlaylistNameDescription setPlaylistName={setPlaylistName} setPlaylistDescription={setPlaylistDescription} setStep={setStep} />
                  : step == 7 ?
                    <Loading />
                    :
                    <Playlist newPlaylist={newPlaylist} startOver={startOver} />
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

const BarContainer = styled.div`
width: 800px;
// display: flex;
margin: 0 auto;
// justify-content: space-between;
`

const Bar = styled.div`
width: 800px;
height: 8px;
background-color: white;
position: absolute;
top: 35px;
border-radius: 20px;
`

const BarProgress = styled.div`
width: ${props => props.step == 3 ? "260px" : props.step == 4 ? "520px" : props.step == 5 ? "800px" : "0"};
height: 8px;
background-color: #148255;
position: absolute;
top: 35px;
border-radius: 20px;
z-index:2;
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
background-color: ${props => props.color ? props.color : "#ffffff"};
border-radius: 20px;
color: ${props => props.color == "#ffffff" ? "black" : "white"};
cursor: pointer;
font-size: 1.5rem;
line-height: 2.5rem;

&:hover {
  background-color: #148255;
  color: #ffffff;
}
`

const Circles = styled.div`
width: 802px;
position: absolute;
top: 20px;
display: flex;
justify-content: space-between;
`

const ProgressBarContainer = styled.div`
width: 800px;
`