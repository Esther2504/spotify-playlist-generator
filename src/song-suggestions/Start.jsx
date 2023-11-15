import React, { useEffect, useState } from 'react'
import { getGenres, searchSong, searchArtist } from './APICalls'
import styled from 'styled-components'

export default function Start() {
  const [genres, setGenres] = useState([])
  const [song, setSong] = useState([])
  const [artist, setArtist] = useState([])
  const [artistSuggestions, setArtistSuggestions] = useState()
  const [songSuggestions, setSongSuggestions] = useState()
  const [chosenSongs, setChosenSongs] = useState([])

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20playlist-read-private%20playlist-modify-public%20playlist-modify-private`

  const getAccessToken = window.location.hash.substring(14).split('&')[0]

  useEffect(() => {
    if (getAccessToken) {
      getGenres(getAccessToken, setGenres)
    }
  }, [getAccessToken])

 function getSongSuggestions(value) {
  setSong(value)
  if (value.length > 2) {
    searchSong(getAccessToken, song, setSongSuggestions)
  }
  
  console.log(songSuggestions)
 }

 function getArtistSuggestions(value) {
  setArtist(value)
  if (value.length > 2) {
    searchArtist(getAccessToken, artist, setArtistSuggestions)
  }
  
  console.log(artistSuggestions)
 }

 console.log(chosenSongs)

  return (
    <div>
      <h1>Song suggestion tool</h1>
      <p>Get suggestions based on your favorite songs, artists, genres</p>
      <a href={AUTH_URL}>
        <button>Get started</button>
      </a>
      <form>
        <label>
        <p>Who are your favorite artists?</p>
        <TextInput type="text" onChange={(e) => getArtistSuggestions(e.target.value)} />
        {artistSuggestions && artist.length > 2 ? 
          <Suggestions>
          {artistSuggestions.map((suggestion) => <p><img src={suggestion.images[0].url} />{suggestion.name}</p>)}
          </Suggestions>
        : null  
        }
        </label>
        <label>
          <p>What are your favorite songs?</p>
          <TextInput type="text" onChange={(e) => getSongSuggestions(e.target.value)} />
          {songSuggestions && song.length > 2 ? 
          <Suggestions>
          {songSuggestions.map((suggestion) => <Suggestion onClick={(e) => setChosenSongs([...chosenSongs, suggestion])}>{suggestion.name} - {suggestion.artists[0].name}</Suggestion>)}
          </Suggestions>
        : null  
        }
        <div>
          <p>Chosen songs:</p>
          {chosenSongs ? 
          <>
          {chosenSongs.map((suggestion) => <p>{suggestion.name} - {suggestion.artists[0].name}</p>)}
          </>
          
        : null  
        }
        </div>
        </label>
        {genres ?
          <>
            <p>What are your favorite genres?</p>
            <Genres>
              {genres.map((genre) => <label><input type="checkbox" value={genre} />{genre}<br /></label>)}
            </Genres>
          </>
          : null
        }
        <label>
          <p>How many recommendations do you want?</p>
          <input type="number" min="1" max="100"></input>
        </label>
      </form>
    </div>
  )
}

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
border-radius: 10px 10px 0 0;
padding: 0 10px;
outline: none;
`

const Suggestions = styled.div`
border: 2px solid #148255;
width: 500px;
margin: 0 auto;
padding: 0 10px;
text-align: left;
font-size: 0.8rem;
`

const Suggestion = styled.p`
cursor: pointer;
`