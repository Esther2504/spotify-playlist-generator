import React from 'react'
import styled from 'styled-components'

export default function FaveArtists({song, artist, getArtistSuggestions, artistSuggestions, chosenArtists, setChosenArtists, setStep}) {

function setArtists(suggestion) {
  if (chosenArtists.length < 10 && !chosenArtists.includes(suggestion)) {
    setChosenArtists([...chosenArtists, suggestion])
  } 
}

  return (
    <>
    <Container>
    <Label>     
    <h2>Who are your favorite artists?</h2>
    <TextInput border={song.length > 2 ? "10px 10px 0 0" : "10px"} type="text" onChange={(e) => getArtistSuggestions(e.target.value)} />
    {artistSuggestions && artist.length > 2 ?
      <Suggestions>
        {artistSuggestions.map((suggestion) => <Suggestion onClick={(e) => setArtists(suggestion)}><ArtistImg src={suggestion.images[0].url} />{suggestion.name}</Suggestion>)}
      </Suggestions>
      : null
    }
      </Label>
    <ArtistContainer>
      <p>Chosen artists:</p>
      {chosenArtists ?
        <Artists>
          {chosenArtists.map((suggestion) => <Artist><ArtistName><ArtistImg src={suggestion.images[0].url} />{suggestion.name}</ArtistName><SVG onClick={(e) => setChosenArtists(chosenArtists.filter(item => item !== suggestion))} viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross</title> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketchType="MSPage"> <g id="Icon-Set-Filled" sketchType="MSLayerGroup" transform="translate(-469.000000, -1041.000000)" fill="#ffffff"> <path d="M487.148,1053.48 L492.813,1047.82 C494.376,1046.26 494.376,1043.72 492.813,1042.16 C491.248,1040.59 488.712,1040.59 487.148,1042.16 L481.484,1047.82 L475.82,1042.16 C474.257,1040.59 471.721,1040.59 470.156,1042.16 C468.593,1043.72 468.593,1046.26 470.156,1047.82 L475.82,1053.48 L470.156,1059.15 C468.593,1060.71 468.593,1063.25 470.156,1064.81 C471.721,1066.38 474.257,1066.38 475.82,1064.81 L481.484,1059.15 L487.148,1064.81 C488.712,1066.38 491.248,1066.38 492.813,1064.81 C494.376,1063.25 494.376,1060.71 492.813,1059.15 L487.148,1053.48" id="cross" sketchType="MSShapeGroup"> </path> </g> </g> </g></SVG></Artist>)}
        </Artists>
        : null
      }
    </ArtistContainer>
    </Container>
    <SmallButton onClick={() => setStep(3)}>Next step</SmallButton>
    </>
  )
}

const Container = styled.div`
display: flex;
gap: 50px;
width: 1500px;
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

const Genres = styled.div`
display: grid;
grid-template-columns: repeat(7, 1fr);
text-align: left;
font-size: 1rem;
`

const ArtistName = styled.div`
display: flex;
align-items: center;
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

const Artists = styled.div`
display: flex;
flex-direction: column;
`

const Artist = styled.p`
width: 400px;
display: flex;
justify-content: space-between;
align-items: center;
margin: 10px;
`

const ArtistImg = styled.img`
width: 50px;
margin-right: 15px;
`

const Label = styled.label`
display: flex;
flex-direction: column;
justify-content: start;
height: 500px;
`

const SVG = styled.svg`
width: 20px;
cursor: pointer;
`