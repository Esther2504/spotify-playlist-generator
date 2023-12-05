import React, { useEffect, useState } from 'react'
import { getGenres } from './APICalls'
import styled from 'styled-components'

export default function Genres({getAccessToken, setStep}) {
const [faveGenres, setFaveGenres] = useState([])
const [genres, setGenres] = useState()

function setGenre(value) {
// if (!faveGenres.includes(value)) {
//     faveGenres.filter(item => item !== value)
// } else {
//     setFaveGenres([...faveGenres, value])
// }
}

console.log(genres)

useEffect(() => {
  getGenres(getAccessToken, setGenres)
}, [])


if (genres) {
{genres.map((genre) => console.log(genre))}
}

  return (
    <>
    {genres ? 
    <>
        <p>What are your favorite genres?</p>
        <Genres>      
          {genres.map((genre) => <Label><Checkbox type="checkbox" value={genre} onChange={(e) => setGenre(e.target.value)} />{genre}<br /></Label>)}
        </Genres>
        </>
         : null
        }

        <SmallButton onClick={() => setStep(5)}>Next step</SmallButton>
  </>
  )
}

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