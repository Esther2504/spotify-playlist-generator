import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

type Props = {
    playlistID: string;
    playlistItems: any;
    playlistName: string;
}

export default function YearPlaylist({ playlistID, playlistItems, playlistName }: Props) {
    const [playlistYears, setPlaylistYears] = useState([])
    const [uniqueYears, setUniqueYears] = useState([])
    const [selectedYear, setSelectedYear] = useState()
    const [playlistReady, setPlaylistReady] = useState<boolean>(false)
    const [uris, setUris] = useState([])
    const [newPlaylistID, setNewPlaylistID] = useState<string>()

    console.log(playlistYears)

    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        const allYears: Array<string> = []
        playlistItems.forEach(element => {
            let releaseDate;
                    if (playlistID == "likedsongs") {
           releaseDate = new Date(element?.track?.album?.release_date)
        } else {
            releaseDate = new Date(element?.item?.album?.release_date)
        }
            let releaseYear = releaseDate.getFullYear()
            if (!releaseYear) {
                return;
            }
            allYears.push(releaseYear)


        });

        setPlaylistYears(allYears)

        setUniqueYears([...new Set(allYears)])
    }, [])

    function addMore() {

    }


    function yearSelectionHandler(year: number) {

        setSelectedYear(year)

        const allUris: Array<string> = [];

        playlistItems.forEach(element => {

               let releaseDate;
                    if (playlistID == "likedsongs") {
           releaseDate = new Date(element?.track?.album?.release_date)
        } else {
            releaseDate = new Date(element?.item?.album?.release_date)
        }
            let releaseYear = releaseDate.getFullYear()


            if (releaseYear == year) {
                allUris.push(element?.item?.uri)
            }
        })


        setUris(allUris)

        if (!newPlaylistID && allUris.length > 0) {
            createPlaylist(selectedYear, allUris)
        } else if (newPlaylistID && allUris.length > 0) {
            addPlaylistItems(newPlaylistID, allUris)
        }
    }

    function createPlaylist(selectedYear: string, allUris: any) {

        axios
            .post(`https://api.spotify.com/v1/me/playlists`, {
                "name": `${playlistName} - Songs from ${selectedYear}`,
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
                addPlaylistItems(res.data.id, allUris)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function addPlaylistItems(playlist_id: string, uri_items: any) {

        if (uri_items.length === 0) {
            return;
        }

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
                        <Button onClick={() => { setPlaylistReady(false); setUris([])}}>Add another year to this playlist</Button>
                        <Button onClick={() => { setPlaylistReady(false); setUris([]), setNewPlaylistID(undefined) }}>Create new playlist for another year</Button>
                    </div>
                    <iframe data-testid="embed-iframe" src={`https://open.spotify.com/embed/playlist/${newPlaylistID}?utm_source=generator`} width="100%" height="352" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </ReadyContainer>
                :
                <>
                    <h1>Which year do you want to create a playlist of?</h1>
                    <YearContainer>
                        {uniqueYears.sort().map((year) => <Year onClick={() => yearSelectionHandler(year)}>{year}</Year>)}
                    </YearContainer>
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