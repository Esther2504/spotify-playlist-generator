import React, { useEffect, useState } from 'react'
import { getGenres } from './APICalls'
import styled from 'styled-components'

export default function Genres({chosenGenres, setChosenGenres, getAccessToken, setStep}) {
const [genres, setGenres] = useState()

function setGenre(value) {
if (chosenGenres.includes(value)) {
    setChosenGenres(chosenGenres.filter((item) => item !== value))
} else {
    setChosenGenres([...chosenGenres, value])
}
}

useEffect(() => {
  if (!genres) {
    getGenres(getAccessToken, setGenres)
  }
}, [])

  return (
    <>
    <p>What are your favorite genres?</p>
    {genres ? 
        <GenresContainer>      
          {genres.map((genre) => <Label><Checkbox type="checkbox" value={genre} onChange={(e) => setGenre(e.target.value)} />{genre}<br /></Label>)}
        </GenresContainer>
         : null
        }
        <SmallButton onClick={() => setStep(5)}>Next step</SmallButton>
  </>
  )
}

const GenresContainer = styled.div`
display: grid;
grid-template-columns: repeat(7, 1fr);
text-align: left;
font-size: 1rem;
margin: 2rem 0;
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