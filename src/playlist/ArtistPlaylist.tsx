import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import axios from 'axios'

type Props = {
    playlistid: string;
    playlistItems: any;
    playlistName: string;
}

export default function ArtistPlaylist({ playlistid, playlistItems, playlistName }: Props) {
    const [playlistArtists, setPlaylistArtists] = useState([])
    const [uniquePlaylistArtists, setUniquePlaylistArtists] = useState([])
    const [selectedArtist, setSelectedArtist] = useState<string>()
    const [uris, setUris] = useState([])
    const [newPlaylistID, setNewPlaylistID] = useState()
    const [playlistReady, setPlaylistReady] = useState<boolean>(false)

    const params = useParams()

    const playlistID = params.playlistid

    console.log(playlistItems)
    console.log(uris)

    useEffect(() => {
        playlistItems.forEach(element => {
            console.log(element)
            element?.item?.artists?.forEach(artist => {
                setPlaylistArtists((prevArtists) => [...prevArtists, artist.name])
            })
        });
    }, [])

    useEffect(() => {
        setUniquePlaylistArtists([...new Set(playlistArtists)])
    }, [playlistArtists])

    useEffect(() => {
        if (selectedArtist) {
            playlistItems.forEach(element => {
                console.log(selectedArtist)

                element?.item?.artists?.forEach(artistitem => {
                    if (artistitem?.name == selectedArtist) {
                        console.log(artistitem.name)
                        setUris((prevUris) => [...prevUris, element?.item?.uri])
                    }
                })

            })
        }
    }, [selectedArtist])

    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        if (!newPlaylistID) {
            console.log(selectedArtist)
            createPlaylist(selectedArtist)
        }
    }, [])

    useEffect(() => {


        if (newPlaylistID) {

            addPlaylistItems(newPlaylistID)

        }


    }, [uris])

    function createPlaylist(selectedArtist : string) {
        console.log(selectedArtist)
        axios
            .post(`https://api.spotify.com/v1/me/playlists`, {
                "name": `${playlistName} - ${selectedArtist}`,
                "description": "",
                "public": false
            }, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },

            })
            .then((res) => {
                console.log(res.data.id)
                setNewPlaylistID(res.data.id)
                addPlaylistItems(res.data.id)
            })
            .catch((err) => {
                console.log(err)

            })
    }

    function addPlaylistItems(playlist_id: string) {
        axios
            .post(`https://api.spotify.com/v1/playlists/${playlist_id}/items`, {
                "uris": uris,
                "position": 0
            }, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },

            })
            .then((res) => {
                console.log(res.data)
                setPlaylistReady(true)
            })
            .catch((err) => {
                console.log(err)

            })
    }

    return (
        <Container>
            {playlistReady ?
            <>
            <h1>Your playlist is ready!</h1>
            <p onClick={() => {setPlaylistReady(false); setUris([])}}>&arrowleft; Choose another artist</p>
                <iframe data-testid="embed-iframe" src={`https://open.spotify.com/embed/playlist/${newPlaylistID}?utm_source=generator`} width="100%" height="352" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </>
                :             
                <>
            <h1>Which artist do you want to create a playlist of?</h1>
            <ArtistsContainer>
            {uniquePlaylistArtists.map((artist) => <Artist onClick={() => setSelectedArtist(artist)}>{artist}</Artist>)}
            </ArtistsContainer>
            </>
            }

        </Container>
    )
}

const Container = styled.div`
display: flex;
gap: 30px;
align-items: center;
flex-direction: column;

iframe {
max-width: 800px;
min-height: 600px;
}
`

const Artist = styled.div`
background: var(--green);
padding: 10px 20px;
border-radius: 15px;
cursor: pointer;
border: 2px solid transparent;

&:hover {
border: 2px solid #fff;
}
`

const ArtistsContainer = styled.div`
display: flex;
gap: 10px;
flex-wrap: wrap;
justify-content: center;
`