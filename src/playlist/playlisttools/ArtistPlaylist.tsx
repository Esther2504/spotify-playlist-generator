import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import axios from 'axios'

type Props = {
    playlistid: string;
    playlistItems: any;
    playlistName: string;
}

export default function ArtistPlaylist({ playlistID, playlistItems, playlistName }: Props) {
    const [playlistArtists, setPlaylistArtists] = useState([])
    const [uniquePlaylistArtists, setUniquePlaylistArtists] = useState([])
    const [selectedArtist, setSelectedArtist] = useState<string>()
    const [uris, setUris] = useState([])
    const [newPlaylistID, setNewPlaylistID] = useState()
    const [playlistReady, setPlaylistReady] = useState<boolean>(false)

    const params = useParams()

    // const playlistID = params.playlistid

    console.log(playlistItems)
    console.log(uris)

    useEffect(() => {

        const allartists = []

        console.log(playlistItems)
        playlistItems.forEach(element => {
            console.log(element)
            element?.item?.artists?.forEach(artist => {
                setPlaylistArtists((prevArtists) => [...prevArtists, artist.name])
            })
        });

        

    }, [])

    useMemo(() => {
        setUniquePlaylistArtists([...new Set(playlistArtists)])
    }, [playlistArtists])

    // useEffect(() => {
    //     if (selectedArtist) {
    //         playlistItems.forEach(element => {

    //             element?.item?.artists?.forEach(artistitem => {
    //                 if (artistitem?.name == selectedArtist) {
    //                     setUris((prevUris) => [...prevUris, element?.item?.uri])
    //                 }
    //             })

    //         })
    //     }
    // }, [selectedArtist])

    function artistSelectionHandler(artist: string) {

        setSelectedArtist(artist);
        const allUris: Array<string> = [];

        playlistItems.forEach(element => {

            element?.item?.artists?.forEach(artistitem => {
                if (artistitem?.name == artist) {
                    allUris.push(element?.item?.uri)
                    // setUris((prevUris) => [...prevUris, element?.item?.uri])
                }
            })

        })

        setUris(allUris)

    }

    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        console.log(!newPlaylistID)
        if (!newPlaylistID && uris.length > 0) {
            console.log(selectedArtist)
            createPlaylist()
        }
    }, [selectedArtist, uris])

    useEffect(() => {

        if (newPlaylistID) {
            console.log('id!')
            addPlaylistItems(newPlaylistID, uris)

        }


    }, [uris])

    function createPlaylist() {
        if (uris.length === 0) {
            return;
        }

        console.log(selectedArtist)

        axios
            .post(`https://api.spotify.com/v1/me/playlists`, {
                "name": `Playlist ${playlistName} - Songs by ${selectedArtist}`,
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
                addPlaylistItems(res.data.id, uris)
            })
            .catch((err) => {
                console.log(err)

            })
    }

    function addPlaylistItems(playlist_id: string, uri_items: any) {
        let max_uris = uri_items;
        let leftovers = null;
        if (uri_items.length > 100) {
            max_uris = uri_items.slice(0, 99)
            leftovers = uri_items.slice(100, uri_items.length)
        }

        console.log(max_uris)
        console.log(leftovers)

        axios
            .post(`https://api.spotify.com/v1/playlists/${playlist_id}/items`, {
                "uris": max_uris,
                "position": 0
            }, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },

            })
            .then((res) => {
                console.log(res.data)

                if (leftovers) {
                    addPlaylistItems(playlist_id, leftovers)
                } else {
                    setPlaylistReady(true)
                }
            })
            .catch((err) => {
                console.log(err)

            })
    }

    return (
        <Container>
            {playlistReady ?
                <ReadyContainer>
                    <div>
                        <h1>Your playlist is ready!</h1>
                        <p>We already saved the playlist to your Spotify.</p>
                        <Button onClick={() => { setPlaylistReady(false); setUris([]) }}>Add another artist to this playlist</Button>
                        <Button onClick={() => { setPlaylistReady(false); setUris([]), setNewPlaylistID(undefined) }}>Create new playlist with another artist</Button>
                    </div>
                    <iframe data-testid="embed-iframe" src={`https://open.spotify.com/embed/playlist/${newPlaylistID}?utm_source=generator`} width="100%" height="352" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </ReadyContainer>
                :
                <>
                    <h1>Which artist do you want to create a new playlist of?</h1>
                    <ArtistsContainer>
                        {uniquePlaylistArtists.sort().map((artist) => <Artist onClick={() => artistSelectionHandler(artist)}>{artist}</Artist>)}
                    </ArtistsContainer>
                </>
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
const ReadyContainer = styled.div` 
display: flex;
gap: 50px;
justify-content: space-evenly;
width: 100%;

div {
display: flex;
flex-direction: column;
gap: 20px;
}

iframe {
max-width: 600px;
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

const Button = styled.button`
background: #148255;
color: #fff;
padding: 10px 20px;
text-decoration: none;
border-radius: 20px;
margin-right: auto;
font-weight: bold;
border: none;
font-size: 1rem;
cursor: pointer;
`