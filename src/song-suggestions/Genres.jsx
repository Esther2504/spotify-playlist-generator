import React, { useEffect, useState } from 'react'
import { getGenres } from './APICalls'
import styled from 'styled-components'

export default function Genres({ chosenGenres, setChosenGenres, getAccessToken, setStep }) {
  const [genres, setGenres] = useState()
  const [border, setBorder] = useState(false)
  const [genreSuggestions, setGenreSuggestions] = useState()

  function setGenre(target) {
    if (target.checked == true && !chosenGenres.includes(target.value) && chosenGenres.length < 1) {
      setChosenGenres([...chosenGenres, target.value])
    } else if (target.checked == false && chosenGenres.includes(target.value)) {
      setChosenGenres(chosenGenres.filter((item) => item !== target.value))
    } else {
      alert("you can't choose more than 5 genres")
    }
  }

  useEffect(() => {
    if (!genres) {
      getGenres(getAccessToken, setGenres)
    }
  }, [])


  return (
    <>
    <Container>
      <h2>What is your favorite genre?</h2>
      {genres ?
          <TextInput border={border} onFocus={() => setBorder(true)} onBlur={() => setBorder(false)}>
          <option value="">None</option>
          {genres.map((genre) => <option type="checkbox" value={genre} onClick={(e) => {setGenre(e.target); setBorder(false)}}>{genre}</option>)}
        </TextInput>  
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
height: 400px;
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
const TextInput = styled.select`
width: 450px;
height: 40px;
font-size: 1rem;
border: 2px solid #148255;
border-color: ${props => props.border ? "#148255 #148255 white" : "2px"};
border-radius: ${props => props.border ? "10px 10px 0 0" : "10px"};
padding: 0 10px;
outline: none;
`

const ButtonContainer = styled.div`
width: 100%;
max-width: 800px;
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