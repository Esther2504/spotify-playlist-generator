// check song name & artists & similar duration and dedupliate
// first check for same ids

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

type Props = {
    playlistID: string;
    playlistItems: any;
    playlistName: string;
}

export default function DeduplicatePlaylist({ playlistID, playlistItems, playlistName }: Props) {
    const [ready, setReady] = useState<boolean>(false)
    const [duplicates, setDuplicates] = useState([])

    console.log(playlistItems)

    useEffect(() => {
        let foundDups = []
        let foundNameArtists = []
        let foundIds = []
        playlistItems.reduce((accumulator, track) => {
            const nameArtist = (track.track.name + '|' + track.track.artists[0].name).toLowerCase()
            console.log(foundIds)
            console.log(foundNameArtists)
            if (foundIds.includes(track.track.id)) {
                foundDups.push({ "trackInfo": track, "reason": "Same track ID" })
            } else if (foundNameArtists.includes(nameArtist)) {
                foundDups.push({ "trackInfo": track, "reason": "Same name and artist" })
            } else {
                foundIds.push(track.track.id)
                foundNameArtists.push(nameArtist)
            }
            setDuplicates(foundDups)
        }, foundDups)

        console.log(foundDups)
    }, [])

    function removeDuplicates() {

    }

    return (
        <Container>
            {duplicates.length > 0 ?
                <>
                    <h1>Which duplicates do you want to remove?</h1>
                    <button>Remove all duplicates</button>
                    <DuplicatesContainer>
                        {duplicates.map((item, index) => (
                            <Duplicate>
                                <AlbumCover src={item?.trackInfo.track.album.images[0].url} alt={item?.trackInfo.track.album.name}></AlbumCover>
                                <SongInfo><TrackArtistName><a href={item?.trackInfo.track.external_urls.spotify}>{item?.trackInfo.track.name}</a></TrackArtistName><p className="artists">
                                    <i>{(item?.trackInfo.track.artists).map((artist: any, i: number) => {
                                        return (
                                            <>{i != (item?.trackInfo.track.artists).length - 1 ? <TrackArtistName><a href={artist.external_urls.spotify}>{artist.name}</a>, </TrackArtistName> : <TrackArtistName><a href={artist.external_urls.spotify}>{artist.name}</a></TrackArtistName>}</>
                                        )
                                    })}</i>
                                </p></SongInfo>
                                <TrackLength>{(item?.trackInfo.track.duration_ms / 1000 / 60).toFixed(2).replace(".", ":")}</TrackLength>
                                <div>X</div>
                            </Duplicate>
                        ))}
                    </DuplicatesContainer>
                </> : null
            }
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

const DuplicatesContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
`

const Duplicate = styled.div`
display: grid;
grid-template-columns: 70px 3fr 1fr 1fr;
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

const TrackNumber = styled.p<{ $fontSize?: string; }>`
font-size: ${props => props.$fontSize || "1.3rem"};
text-align: center;
font-weight: bold;
    height: 100%;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #148255;
    border-radius: 99%;
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