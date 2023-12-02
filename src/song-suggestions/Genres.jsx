import React, { useState } from 'react'
import styled from 'styled-components'

export default function Genres({genres, setStep}) {
const [faveGenres, setFaveGenres] = useState([])

function setGenre(value) {
if (!faveGenres.includes(value)) {
    faveGenres.filter(item => item !== value)
} else {
    setFaveGenres([...faveGenres, value])
}
}

  return (
    <>
        <p>What are your favorite genres?</p>
        <Genres>
          {genres.map((genre) => <Label><Checkbox type="checkbox" value={genre} onChange={(e) => setGenre(e.target.value)} />{genre}<br /></Label>)}
        </Genres>
        {/* <SmallButton onClick={() => setStep(5)}>Next step</SmallButton> */}
  </>
  )
}

const SmallButton = styled.button`
background: #148255;
border: none;
color: #fff;
padding: 15px;
font-size: 1rem;
cursor: pointer;
`