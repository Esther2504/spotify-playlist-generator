import React, { useEffect, useState } from 'react'
import { getUser, getRecommendations, createPlaylist, addTracks } from './APICalls'
import styled from 'styled-components'
import FaveArtists from './Artists'
import FaveSongs from './Songs'
import FaveGenres from './Genres'
import RecomAmount from './RecomAmount'
import Loading from './Loading'
import PlaylistNameDescription from './PlaylistName'
import Playlist from './Playlist'

export default function Start({ accessToken, step, setStep, setError }) {
  const [userID, setUserID] = useState()
  const [chosenArtist, setChosenArtist] = useState()
  const [chosenSong, setChosenSong] = useState()
  const [chosenGenre, setChosenGenre] = useState()
  const [amount, setAmount] = useState(20)
  const [recommendations, setRecommendations] = useState([])
  const [newPlaylist, setNewPlayList] = useState()
  const [PlaylistName, setPlaylistName] = useState('Created with the Spotify Playlist Generator')
  const [PlaylistDescription, setPlaylistDescription] = useState('')

  let artistsseeds
  let tracksseeds

  if (chosenArtist) {
    artistsseeds = chosenArtist.id
  }

  if (chosenSong) {
    tracksseeds = chosenSong.id
  }

  let genreseeds = chosenGenre

  useEffect(() => {
    if (step == 6 && recommendations.length == 0) {
      getRecommendations(accessToken, artistsseeds, tracksseeds, genreseeds, amount, recommendations, setRecommendations, setError);
      getUser(accessToken, setUserID, setError);
    } else if (step == 7) {
      createPlaylist(accessToken, userID, PlaylistName, PlaylistDescription, recommendations, newPlaylist, setNewPlayList)
    }
  }, [step])

  useEffect(() => {
    if (newPlaylist) {
      addTracks(accessToken, recommendations, newPlaylist, setStep)
    }
  }, [newPlaylist])

  function startOver() {
    setStep(2)
    setChosenSong()
    setChosenArtist()
    setChosenGenre()
  }

  return (
    <div>
      {step != 1 && step < 6 ?
        <BarContainer>
          <Bar></Bar>
          <BarProgress step={step} />
          <Circles>
            <CircleContainer><Circle color={"#148255"} onClick={() => setStep(2)}>1</Circle><br /><span>Artist</span></CircleContainer>
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
      <Container step={step}>
        {step == 1 ?
          <>
          </>
          : step == 2 ?
            <FaveArtists getAccessToken={accessToken} chosenArtist={chosenArtist} setChosenArtist={setChosenArtist} setStep={setStep} setError={setError} />
            : step == 3 ?
              <FaveSongs getAccessToken={accessToken} chosenSong={chosenSong} setChosenSong={setChosenSong} setStep={setStep} setError={setError} />
              : step == 4 ?
                <FaveGenres chosenGenre={chosenGenre} setChosenGenre={setChosenGenre} getAccessToken={accessToken} setStep={setStep} setError={setError} />
                : step == 5 ?
                  <RecomAmount amount={amount} setAmount={setAmount} chosenArtist={chosenArtist} chosenSong={chosenSong} chosenGenre={chosenGenre} setStep={setStep} />
                  :
                  step == 6 ?
                    <PlaylistNameDescription setPlaylistName={setPlaylistName} setPlaylistDescription={setPlaylistDescription} setStep={setStep} />
                    : step == 7 ?
                      <Loading />
                      :
                      <Playlist newPlaylist={newPlaylist} startOver={startOver} />
        }
      </Container>
    </div>
  )
}

const BarContainer = styled.div`
max-width: 800px;
margin: 0 auto;
overflow-x: hidden;
`
const Bar = styled.div`
max-width: 800px;
width: 90%;
height: 8px;
background-color: white;
position: absolute;
top: 50px;
border-radius: 20px;
`
const BarProgress = styled.div`
width: ${props => props.step == 3 ? "260px" : props.step == 4 ? "520px" : props.step == 5 ? "800px" : "0"};
max-width: 90%;
height: 10px;
background-color: #148255;
position: absolute;
top: 50px;
border-radius: 20px;
z-index: 2;

@media screen and (max-width: 850px) {
  width: ${props => props.step == 3 ? "33%" : props.step == 4 ? "62%" : props.step == 5 ? "100%" : "0"};
}
`
const Circles = styled.div`
width: 90%;
max-width: 803px;
position: absolute;
top: 35px;
display: flex;
justify-content: space-between;
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
const Container = styled.div`
position: relative;
top: ${props => props.step > 5 ? "0" : "15vh"};

@media screen and (max-width: 1450px) {
  top: ${props => props.step > 5 ? "0" : "25vh"};
}
`