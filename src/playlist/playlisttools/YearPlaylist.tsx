import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

type Props = {
    playlistid: string;
    playlistItems: any;
    playlistName: string;
}

export default function YearPlaylist({ playlistID, playlistItems, playlistName }: Props) {
    const [playlistYears, setPlaylistYears] = useState([])
    const [uniqueYears, setUniqueYears] = useState([])
    const [selectedYear, setSelectedYear] = useState()

    console.log(playlistYears)

    useEffect(() => {
        console.log(playlistItems)
        playlistItems.forEach(element => {
            let releaseDate = new Date(element?.item?.album?.release_date)
            let releaseYear = releaseDate.getFullYear()
            setPlaylistYears((prevYears) => [...prevYears, releaseYear])
        });
    }, [])

    useEffect(() => {
        setUniqueYears([...new Set(playlistYears)])
    }, [playlistYears])

    return (
        <Container>
            <h1>Which year do you want to create a playlist of?</h1>
            <YearContainer>
                {uniqueYears.sort().map((year) => <Year onClick={() => setSelectedYear(year)}>{year}</Year>)}
            </YearContainer>
        </Container>
    )
}

const Container = styled.div`
max-width: 1400px;
width: 90%;
margin: 0;
display: flex;
flex-direction: column;
align-items: center;
gap: 50px;
scroll-behavior: smooth;

h1 {
font-size: 2.6rem;
}
`

const YearContainer = styled.div`
display: flex;
gap: 10px;
flex-wrap: wrap;
justify-content: center;
`

const Year = styled.div`
background: var(--green);
padding: 10px 20px;
border-radius: 15px;
cursor: pointer;
border: 2px solid transparent;

&:hover {
border: 2px solid #fff;
}
`