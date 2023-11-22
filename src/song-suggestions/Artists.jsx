import React from 'react'
import styled from 'styled-components'

export default function Artists({song, artist, getArtistSuggestions, artistSuggestions, chosenArtists, setChosenArtists, setStep}) {
  return (
    <label>
    <h2>Who are your favorite artists?</h2>
    <TextInput border={song.length > 2 ? "10px 10px 0 0" : "10px"} type="text" onChange={(e) => getArtistSuggestions(e.target.value)} />
    {artistSuggestions && artist.length > 2 ?
      <Suggestions>
        {artistSuggestions.map((suggestion) => <Suggestion onClick={(e) => setChosenArtists([...chosenArtists, suggestion])}><ArtistImg src={suggestion.images[0].url} />{suggestion.name}</Suggestion>)}
      </Suggestions>
      : null
    }
    <div>
      <p>Chosen artists:</p>
      {chosenArtists ?
        <>
          {chosenArtists.map((suggestion) => <p><ArtistImg src={suggestion.images[0].url} />{suggestion.name}</p>)}
        </>

        : null
      }
    </div>
    <SmallButton onClick={() => setStep(3)}>Next step</SmallButton>
  </label>
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
