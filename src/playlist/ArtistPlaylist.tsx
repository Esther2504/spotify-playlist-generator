import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'

type Props = {
    playlistid: string;
    playlistItems: any;
}

export default function ArtistPlaylist({ playlistid, playlistItems }: Props) {
    const [playlistArtists, setPlaylistArtists] = useState([])
    const [uniquePlaylistArtists, setUniquePlaylistArtists] = useState([])
    const [artist, setArtist] = useState<string>()
    const [uris, setUris] = useState([])

    const params = useParams()

    const playlistID = params.playlistid

    console.log(playlistItems)
    console.log(uris)

    useEffect(() => {
        playlistItems.forEach(element => {
            element.item.artists.forEach(artist => {
                setPlaylistArtists((prevArtists) => [...prevArtists, artist.name])
            })
        });
    }, [])

    useEffect(() => {
        setUniquePlaylistArtists([...new Set(playlistArtists)])
    }, [playlistArtists])

    useEffect(() => {
        if (artist) {
            playlistItems.forEach(element => {
                console.log(element.item.artists)

                element.item.artists.forEach(artistitem => {
                    if (artistitem.name == artist) {
                        console.log(artistitem.name)
                        setUris((prevUris) => [...prevUris, element.item.uri])
                    }
                })

            })
        }
    }, [artist])

    return (
        <Container>
            <p>For what artist do you want to create a seperate playlist?</p>
            {uniquePlaylistArtists.map((artist) => <Artist onClick={() => setArtist(artist)}>{artist}</Artist>)}



        </Container>
    )
}

const Container = styled.div`
display: flex;
gap: 10px;
flex-wrap: wrap;
justify-content: center;

p {
width: 100%;
}
`

const Artist = styled.div`
background: var(--green);
padding: 10px 20px;
border-radius: 15px;
cursor: pointer;
`