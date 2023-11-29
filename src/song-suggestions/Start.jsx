import React, { useEffect, useState } from 'react'
import { getGenres, searchSong, searchArtist } from './APICalls'
import styled from 'styled-components'
import StartPage from '../song-suggestions/StartPage'
import FaveArtists from './Artists'
import Songs from './Songs'

export default function Start({ AUTH_URL }) {
  const [step, setStep] = useState(1)
  const [genres, setGenres] = useState([])
  const [song, setSong] = useState([])

  const [songSuggestions, setSongSuggestions] = useState()
  const [chosenSongs, setChosenSongs] = useState([])
  const [chosenArtists, setChosenArtists] = useState([])
  const [border, setBorder] = useState("10px")
  const [accessToken, setAccessToken] = useState()

  // const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/spotify-playlist-generator?&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20playlist-read-private%20playlist-modify-public%20playlist-modify-private`

  const getAccessToken = window.location.hash.substring(14).split('&')[0]

  useEffect(() => {
    if (window.location.hash.includes("access_token")) {
      setAccessToken(getAccessToken)
    }
  }, [window.location])

  useEffect(() => {
    if (getAccessToken) {
      getGenres(getAccessToken, setGenres)
      setStep(2)
    }
  }, [getAccessToken])

  function getSongSuggestions(value) {
    setSong(value)
    if (value.length > 2) {
      searchSong(getAccessToken, song, setSongSuggestions)
    }
  }

  return (
    <div>
      {step == 1 ?
        <>
          <StartPage AUTH_URL={AUTH_URL} />
        </>
        : step == 2 ?
          <FaveArtists getAccessToken={getAccessToken} chosenArtists={chosenArtists} setChosenArtists={setChosenArtists} setStep={setStep} />
          : step == 3 ?
          <Songs getAccessToken={getAccessToken} chosenSongs={chosenSongs} setChosenSongs={setChosenSongs} setStep={setStep} />
            // <label>
            //   <p>What are your favorite songs?</p>
            //   <TextInput border={song.length > 2 ? "10px 10px 0 0" : "10px"} type="text" onChange={(e) => getSongSuggestions(e.target.value)} />
            //   {songSuggestions && song.length > 2 ?
            //     <Suggestions>
            //       {songSuggestions.map((suggestion) => <Suggestion onClick={(e) => { setChosenSongs([...chosenSongs, suggestion]); setSong([]) }}>{suggestion.name} - {suggestion.artists[0].name}</Suggestion>)}
            //     </Suggestions>
            //     : null
            //   }
            //   <div>
            //     <p>Chosen songs:</p>
            //     {chosenSongs ?
            //       <>
            //         {chosenSongs.map((suggestion) => <p>{suggestion.name} - {suggestion.artists[0].name}</p>)}
            //       </>
            //       : null}

            //   </div>
            //   <SmallButton onClick={() => setStep(4)}>Next step</SmallButton>
            // </label>
            : step == 4 ?
              <>
                {genres ?
                  <>
                    <p>What are your favorite genres?</p>
                    <Genres>
                      {genres.map((genre) => <Label><Checkbox type="checkbox" value={genre} />{genre}<br /></Label>)}
                    </Genres>
                    <SmallButton onClick={() => setStep(5)}>Next step</SmallButton>
                  </>
                  : null}
              </>
              : step == 5 ?
                <label>
                  <p>How many recommendations do you want?</p>
                  <input type="number" min="1" max="100"></input>
                  <SmallButton onClick={() => setStep(6)}>Get recommendations</SmallButton>
                </label>
                : null}
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

const Genres = styled.div`
display: grid;
grid-template-columns: repeat(7, 1fr);
text-align: left;
font-size: 1rem;
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
