import React from 'react'
import styled from 'styled-components'

export default function FaveArtists({song, artist, getArtistSuggestions, artistSuggestions, chosenArtists, setChosenArtists, setStep}) {
  return (
    <>
    <Container>
    <Label>     
    <h2>Who are your favorite artists?</h2>
    <TextInput border={song.length > 2 ? "10px 10px 0 0" : "10px"} type="text" onChange={(e) => getArtistSuggestions(e.target.value)} />
    {artistSuggestions && artist.length > 2 ?
      <Suggestions>
        {artistSuggestions.map((suggestion) => <Suggestion onClick={(e) => setChosenArtists([...chosenArtists, suggestion])}><ArtistImg src={suggestion.images[0].url} />{suggestion.name}</Suggestion>)}
      </Suggestions>
      : null
    }
      </Label>
    <ArtistContainer>
      <p>Chosen artists:</p>
      {chosenArtists ?
        <Artists>
          {chosenArtists.map((suggestion) => <Artist><ArtistName><ArtistImg src={suggestion.images[0].url} />{suggestion.name}</ArtistName><span>x</span></Artist>)}
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
