import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import SpotifyTrack from './components/SpotifyTrack.tsx'

export default function RecentyPlayed() {
    const [tracks, setTracks] = useState()

    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        if (!tracks) {
            getRecentlyPlayed()
        }
    }, [])

    function getRecentlyPlayed() {
        axios
            .get(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            })
            .then((res) => {
                console.log(res)
                console.log(res.data.items)
                let dataItems = res.data.items
                setTracks(dataItems)

            })
            .catch((err) => {
                console.log(err)
                // setError(true)
            })
    }

    return (
        <Container>
            {tracks && tracks.map((item, i) => {
                return (
                    <SpotifyTrack item={item.track} i={i} dateTime={item.played_at} />
                )
            })}
        </Container>
    )
}


const Container = styled.div`
max-width: 1400px;
width: 90%;
margin: 0 auto;

.login-btn {
background: #148255;
color: #fff;
padding: 10px 20px;
text-decoration: none;
border-radius: 20px;
width: fit-content;
}

h1 {
margin: 20px 0;
}
`

const ErrorMessage = styled.div`
display: flex;
flex-direction: column;
margin-top: 30px;
gap:20px;
`

const SpotifyItem = styled.div`
display: grid;
grid-template-columns: 70px 70px 3fr 1fr 1fr;
height: 70px;
width: 100%;
margin-bottom: 15px;
align-items: center;
justify-content: center;
gap: 20px;
`

const TrackArtistName = styled.div`
text-decoration: none;
display: inline;

&::first-child {
font-weight: bold;
}

a {
text-decoration: none;
}
a:hover {
text-decoration: underline;
}
`

const TrackNumber = styled.p`
font-size: 1.3rem;
text-align: center;
font-weight: bold;
background: #148255;
    height: 100%;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
`

const AlbumCover = styled.img`
height: 70px;
`

const ArtistIcon = styled.div`
width: 70px;
height: 70px;
background-size: cover;
background-position: center;
`

const SongInfo = styled.div`
display: flex;
flex-direction: column;

.artists {
overflow: hidden;
font-size: 0.8rem;
margin-top: 2px;
}
`

const TrackLength = styled.div`
text-align: center;
`

const Label = styled.label`
background: transparent;
border: 2px solid #148255;
    padding: 8px 20px;
    border-radius: 20px;
    cursor: pointer;

&.fill {
background: #148255;
}

input {
display: none;
}
`

const Filters = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 40px;
gap: 10px;
`

const Filter = styled.div`
display: flex;
gap: 10px;
`