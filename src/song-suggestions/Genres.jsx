import React, { useEffect, useState } from 'react'
import { getGenres } from './APICalls'
import styled from 'styled-components'

export default function Genres({chosenGenres, setChosenGenres, getAccessToken, setStep}) {
const [genres, setGenres] = useState()

function setGenre(target) {
if (target.checked == true && !chosenGenres.includes(target.value) && chosenGenres.length <= 5) {
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
    <p>What are your favorite genres?</p>
    {genres ? 
        <GenresContainer>      
          {genres.map((genre) => <Label><Checkbox type="checkbox" value={genre} onChange={(e) => setGenre(e.target)} />{genre}<br /></Label>)}
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