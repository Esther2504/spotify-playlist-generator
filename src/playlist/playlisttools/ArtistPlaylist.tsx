import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

type Props = {
    playlistID: string;
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
    const [loading, setLoading] = useState<boolean>(false)

    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {

        const allArtists: Array<string> = []

        if (playlistID == "likedsongs") {
            playlistItems.forEach(element => {
                console.log(element)
                element?.track?.artists?.forEach(artist => {
                    console.log(artist.name)
                    allArtists.push(artist.name)
                })
            });
        } else {

            playlistItems.forEach(element => {
                console.log(element)
                element?.item?.artists?.forEach(artist => {
                    allArtists.push(artist.name)
                })
            });

        };

        setPlaylistArtists(allArtists)
        setUniquePlaylistArtists([...new Set(allArtists)])

    }, [])


    function artistSelectionHandler(artist: string) {
        setLoading(true)

        setSelectedArtist(artist);
        const allUris: Array<string> = [];

        if (playlistID == "likedsongs") {
            playlistItems.forEach(element => {
                element?.track?.artists?.forEach(artistitem => {
                    if (artistitem?.name == artist) {
                        allUris.push(element?.track?.uri)
                    }
                })
            })

        } else {

            playlistItems.forEach(element => {
                element?.item?.artists?.forEach(artistitem => {
                    if (artistitem?.name == artist) {
                        allUris.push(element?.item?.uri)
                    }
                })
            })

        }

        setUris(allUris)

        if (!newPlaylistID && allUris.length > 0) {
            createPlaylist()
        } else if (newPlaylistID && allUris.length > 0) {
            addPlaylistItems(newPlaylistID, allUris)
        }
    }

    function createPlaylist() {
        if (uris.length === 0) {
            return;
        }

        axios
            .post(`https://api.spotify.com/v1/me/playlists`, {
                "name": `${playlistName} - Songs by ${selectedArtist}`,
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

// waarom 2x artist klikken? uitzoeken

    function addPlaylistItems(playlist_id: string, uri_items: any) {
        let max_uris = uri_items;
        let leftovers = null;
        if (uri_items.length > 100) {
            max_uris = uri_items.slice(0, 99)
            leftovers = uri_items.slice(100, uri_items.length)
        }

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
                        {/* <Button onClick={() => { setPlaylistReady(false); setUris([]), setNewPlaylistID(undefined) }}>Create new playlist with another artist</Button> */}
                    </div>
                    <iframe data-testid="embed-iframe" src={`https://open.spotify.com/embed/playlist/${newPlaylistID}?utm_source=generator`} width="100%" height="352" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </ReadyContainer>
                :
                <>
                    <h1>Which artist do you want to create a playlist of?</h1>
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