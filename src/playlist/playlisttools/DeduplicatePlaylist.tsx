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
        let foundNameArtist = []
        let foundIds = []
        playlistItems.reduce((accumulator, currentValue) => {
            // foundIds
            // if (currentValue.track.id)
            // foundDups.push(currentValue.)
        }, foundDups)
    }, [])


    return (
        <Container>
            {ready ?
                <></>
                :
                <>
                    <h1>Which duplicates do you want to remove?</h1>

                </>
            }
        </Container>
    )
}

const Container = styled.div`

`