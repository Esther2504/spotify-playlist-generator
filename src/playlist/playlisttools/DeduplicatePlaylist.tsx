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
                foundDups.push({"trackInfo": track, "reason": "Same track ID"})
            } else if (foundNameArtists.includes(nameArtist)) {
                foundDups.push({"trackInfo": track, "reason": "Same name and artist"})
            } else {
            foundIds.push(track.track.id)
            foundNameArtists.push(nameArtist)
            }
            setDuplicates(foundDups)
        }, foundDups)

        console.log(foundDups)
    }, [])

    console.log(duplicates)

    return (
        <Container>
            {duplicates.length > 0 ?
            
                <>
                    <h1>Which duplicates do you want to remove?</h1>
                    <p>{duplicates.length}</p>
                    {duplicates.map((item, index) => (
                        <div>
                        <p>{item?.trackInfo.track.name}</p>
                        <p>{item?.reason}</p>
                        </div>
                    ))}
                
                </> : null
            }
        </Container>
    )
}

const Container = styled.div`

`

const Duplicate = styled.div``