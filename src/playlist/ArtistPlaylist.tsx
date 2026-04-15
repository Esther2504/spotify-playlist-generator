import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import axios from 'axios'

type Props = {
    playlistid: string;
    playlistItems: any;
}

export default function ArtistPlaylist({ playlistid, playlistItems }: Props) {
    const [playlistArtists, setPlaylistArtists] = useState([])
    const [uniquePlaylistArtists, setUniquePlaylistArtists] = useState([])
    const [artist, setArtist] = useState<string>()
    const [uris, setUris] = useState([])
    const [newPlaylistID, setNewPlaylistID] = useState()

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

    const accessToken = localStorage.getItem('accessToken')


    useEffect(() => {

        // https://api.spotify.com/v1/me/playlists

        createPlaylist()



    }, [uris])

    function createPlaylist() {
        axios
            .post(`https://api.spotify.com/v1/me/playlists`, {
                "name": "New Playlist",
                "description": "New playlist description",
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

    function addPlaylistItems(playlist_id : string) {
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
            })
            .catch((err) => {
                console.log(err)

            })
    }

    return (
        <Container>
            <p>For what artist do you want to create a seperate playlist?</p>
            {uniquePlaylistArtists.map((artist) => <Artist onClick={() => setArtist(artist)}>{artist}</Artist>)}

<iframe data-testid="embed-iframe" src={`https://open.spotify.com/embed/playlist/${newPlaylistID}?utm_source=generator`} width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
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