import React, { useEffect, useState } from 'react'
import { getGenres } from './APICalls'
import styled from 'styled-components'
import genres from '../genres.json'

export default function Genres({ chosenGenre, setChosenGenre, getAccessToken, setStep, setError }) {
  // const [genres, setGenres] = useState()
  const [genreInput, setGenreInput] = useState()
  const [showGenres, setShowGenres] = useState(false)
  const [border, setBorder] = useState(false)
  const [genreSuggestions, setGenreSuggestions] = useState()

  function setGenre(target) {
    setChosenGenre(target.value)
  }

  // useEffect(() => {
  //   if (!genres) {
  //     getGenres(getAccessToken, setGenres, setError)
  //   }
  // }, [])


    useEffect(() => {
      if (genres) {
      if (genres.genres.includes(chosenGenre)) {
        setShowGenres(false)
      } 
    }
    }, [chosenGenre])

    useEffect(() => {
      // console.log(chosenGenre.length)
      // console.log(showGenres)
      // if (chosenGenre) {
        console.log('yes')
        if (showGenres && chosenGenre) {
          setBorder(true)
        } else {
          setBorder(false)
        }
      // }  
    }, [showGenres])
    console.log(showGenres)
    // console.log(chosenGenre.length)
    console.log(border)

    function showGenresHandler(target) {
      console.log('hey')
      console.log(target)
 if (target.length > 0) {
  setShowGenres(true)
 } else {
  setShowGenres(false)
 }
    }
  
  return (
    <ContainerContainer>
       
       <h2>What is your favorite genre?</h2>
       {genres ?
      <Container>
      <Label>  
            <TextInput border={border} onInput={(e) => { setChosenGenre(e.target.value); showGenresHandler(e.target.value)}} value={chosenGenre}>
            </TextInput>
            {chosenGenre && showGenres ?
              <Suggestions>
                {genres.genres.map((genre) => {
                  return genre.includes(chosenGenre) ?
                    <option value={genre} onClick={(e) => { setChosenGenre(genre); setShowGenres(false) }}>{genre}</option>
                    : null
                }
                )}
              </Suggestions>
              : null}   
              </Label>     
      </Container>
      : null}
      <ButtonContainer>
        <SmallButton onClick={() => setStep(3)}>Previous</SmallButton>
        <SmallButton onClick={() => setStep(5)}>Next</SmallButton>
      </ButtonContainer>
    </ContainerContainer>
  )
}

const ContainerContainer = styled.div`
// max-width: 800px;
width: 100%;


@media screen and (max-width: 850px) {
 width: 750px;
}
@media screen and (max-width: 750px) {
 width: 650px;
}
@media screen and (max-width: 650px) {
 width: 550px;
}
@media screen and (max-width: 550px) {
 width: 450px;
}
@media screen and (max-width: 450px) {
 width: 350px;
}
`

const Container = styled.div`
position: relative;
display: grid;
max-width: 100%;
min-height: 200px;
width: 850px;
align-items: flex-start;
grid-template-columns: 1fr;
// margin: 0 auto;
min-width: 90%

@media screen and (max-width: 850px) {
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr;
  justify-items: center;
}
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
border-color: ${props => props.border ? "#148255 #148255 none" : "#148255"};
border-radius: ${props => props.border ? "10px 10px 0 0" : "10px"};
padding: 0 10px;
outline: none;
margin: 0 auto;

@media screen and (max-width: 850px) {
  // margin-left: 80px;
}
@media screen and (max-width: 480px) {
  width: 300px;
  // margin-left: 30px;
  }
`
const Suggestions = styled.div`
border: 2px solid #148255;
width: 450px;
height: auto;
max-height: 310px;
padding: 0 10px;
text-align: left;
font-size: 0.9rem;
border-radius: 0 0 10px 10px;
border-top: none;
overflow-y: scroll;
cursor: pointer;
margin: 0 auto;

@media screen and (max-width: 480px) {
  width: 300px;
  }
`

const ButtonContainer = styled.div`
width: 90%;
max-width: 850px;
margin: 0 auto;
display: flex;
justify-content: space-between;
`

const Label = styled.label`
display: flex;
flex-direction: column;
justify-content: start;
min-height: 400px;
`

const SmallButton = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px;
font-size: 1rem;
cursor: pointer;
margin-top: 20px;
font-weight: 600;
`