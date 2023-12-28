import React, { useEffect, useState } from 'react'
import { getGenres } from './APICalls'
import styled from 'styled-components'

export default function Genres({ chosenGenres, setChosenGenres, getAccessToken, setStep }) {
  const [genres, setGenres] = useState()
  const [genreInput, setGenreInput] = useState()
  const [border, setBorder] = useState(false)
  const [genreSuggestions, setGenreSuggestions] = useState()

  function setGenre(target) {
      setChosenGenres(target.value)
  }

  useEffect(() => {
    if (!genres) {
      getGenres(getAccessToken, setGenres)
    }
  }, [])

console.log(chosenGenres)

  return (
    <>
    <Container>
      <h2>What is your favorite genre?</h2>
      {genres ?
      <>
          <TextInput border={border} onFocus={(e) => {setGenreInput(true);setBorder(true)}} value={chosenGenres}>
        </TextInput>  
        {genreInput ?
        <Suggestions>
        {genres.map((genre) => 
        <option type="checkbox" value={genre} onClick={(e) => {setGenre(e.target); setGenreInput(false)}}>{genre}</option>
        )}
      </Suggestions>
      : null}
        </>
    : null}
      </Container>
      <ButtonContainer>
        <SmallButton onClick={() => setStep(3)}>Previous</SmallButton>
        <SmallButton onClick={() => setStep(5)}>Next</SmallButton>
      </ButtonContainer>
      </>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 600px;
max-width: 850px;
align-items: center;
`

const GenresContainer = styled.div`
display: grid;
grid-template-columns: repeat(7, 1fr);
text-align: left;
font-size: 1rem;
margin: 2rem 0;
`
const TextInput = styled.input`
width: 450px;
height: 40px;
font-size: 1rem;
border: 2px solid #148255;
border-radius: 10px;
padding: 0 10px;
outline: none;
`
const Suggestions = styled.div`
border: 2px solid #148255;
border-top: 2px solid white;
width: 450px;
height: 310px;
padding: 0 10px;
text-align: left;
font-size: 0.9rem;
border-radius: 0 0 10px 10px;
border-top: none;
overflow-y: scroll;
cursor: pointer;
`

const ButtonContainer = styled.div`
width: 100%;
max-width: 850px;
margin: 0 auto;
display: flex;
justify-content: space-between;
`

const Checkbox = styled.input`

`

const Label = styled.label`
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