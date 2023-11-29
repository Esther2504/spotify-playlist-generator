import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getGenres, searchSong, searchArtist } from './APICalls'

export default function FaveSongs({getAccessToken, chosenSongs, setChosenSongs, setStep}) {
  const [border, setBorder] = useState()
  const [song, setSong] = useState([])
  const [songSuggestions, setSongSuggestions] = useState()

  function getSongSuggestions(value) {
    setSong(value)
    if (value.length > 2) {
      searchSong(getAccessToken, song, setSongSuggestions)
      console.log(songSuggestions)
    }
   
  }

function setSongs(suggestion) {
  if (chosenSongs.length < 10 && !chosenSongs.includes(suggestion)) {
    setChosenSongs([...chosenSongs, suggestion])
  } 
}

useEffect(() => {
if (song.length > 2) {
  setBorder(true)
} else {
  setBorder(false)
}
}, [song])

  return (
    <>
    <h2>What are your favorite songs?</h2>
    <Container>
    <Label>     
    <TextInput border={border} type="text" onChange={(e) => getSongSuggestions(e.target.value)} />
    {songSuggestions && song.length > 2 ?
      <Suggestions>
        {songSuggestions.map((suggestion) => <Suggestion onClick={(e) => setSongs(suggestion)}><AlbumImg src={suggestion.album.images[0].url} />{suggestion.name} - {suggestion.artists[0].name}</Suggestion>)}
      </Suggestions>
      : null
    }
      </Label>
    <ArtistContainer>
      {chosenSongs.length > 0 ?
        <Songs>
          {chosenSongs.map((suggestion) => <Song><SongName><AlbumImg src={suggestion.album.images[0].url} />{suggestion.name}<br/>{suggestion.artists[0].name}</SongName><SVG onClick={(e) => setChosenSongs(chosenSongs.filter(item => item !== suggestion))} viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross</title> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketchType="MSPage"> <g id="Icon-Set-Filled" sketchType="MSLayerGroup" transform="translate(-469.000000, -1041.000000)" fill="#ffffff"> <path d="M487.148,1053.48 L492.813,1047.82 C494.376,1046.26 494.376,1043.72 492.813,1042.16 C491.248,1040.59 488.712,1040.59 487.148,1042.16 L481.484,1047.82 L475.82,1042.16 C474.257,1040.59 471.721,1040.59 470.156,1042.16 C468.593,1043.72 468.593,1046.26 470.156,1047.82 L475.82,1053.48 L470.156,1059.15 C468.593,1060.71 468.593,1063.25 470.156,1064.81 C471.721,1066.38 474.257,1066.38 475.82,1064.81 L481.484,1059.15 L487.148,1064.81 C488.712,1066.38 491.248,1066.38 492.813,1064.81 C494.376,1063.25 494.376,1060.71 492.813,1059.15 L487.148,1053.48" id="cross" sketchType="MSShapeGroup"> </path> </g> </g> </g></SVG></Song>)}
        </Songs>
        : <p>Your chosen songs will appear here. You can also continue without choosing a song, just click on next step.</p>
      }
    </ArtistContainer>
    </Container>
    <SmallButton onClick={() => setStep(4)}>Next step</SmallButton>
    </>
  )
}

const Container = styled.div`
display: grid;
gap: 50px;
width: 100%;
max-width: 1500px;
align-items: flex-start;
grid-template-columns: 1fr 2fr;
`

const ArtistContainer = styled.div`
text-align: left;
`

const SmallButton = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px;
font-size: 1rem;
cursor: pointer;
margin-top: 20px;
`

const SongName = styled.div`
display: flex;
align-items: center;
font-size: 1rem;
`

const TextInput = styled.input`
width: 500px;
height: 40px;
font-size: 1rem;
border: 2px solid #148255;
border-color: ${props => props.border ? "#148255 #148255 white" : "2px"};
border-radius: ${props => props.border ? "10px 10px 0 0" : "10px"};
padding: 0 10px;
outline: none;
`

const Suggestions = styled.div`
border: 2px solid #148255;
width: 500px;
padding: 0 10px;
text-align: left;
font-size: 0.9rem;
border-radius: 0 0 10px 10px;
border-top: none;
`

const Suggestion = styled.p`
cursor: pointer;
display: flex;
align-items: center;
`

const Songs = styled.div`
display: flex;
flex-direction: column;
height: 400px;
flex-wrap: wrap;
`

const Song = styled.p`
width: 400px;
display: flex;
justify-content: space-between;
align-items: center;
margin: 10px 50px 10px 0;
`

const AlbumImg = styled.img`
width: 50px;
margin-right: 15px;
border-radius: 15px;
`

const Label = styled.label`
display: flex;
flex-direction: column;
justify-content: start;
height: 500px;
`

const SVG = styled.svg`
width: 15px;
cursor: pointer;
`