import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import axios from 'axios'

type Props = {
    playlistID: string;
    playlistItems: any;
    playlistName: string;
}

export default function ArtistPlaylist({ playlistID, playlistItems, playlistName }: Props) {
    const [uniquePlaylistArtists, setUniquePlaylistArtists] = useState([])
    const [selectedArtist, setSelectedArtist] = useState<string>()
    const [uris, setUris] = useState([])
    const [tracksDeleted, setTracksDeleted] = useState<boolean>(false)
    const [leftOvers, setLeftOvers] = useState()

    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        const allArtists: Array<string> = []

        if (playlistID === "likedsongs") {
            playlistItems.forEach(element => {

                element?.track?.artists?.forEach(artist => {
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
        }



        setUniquePlaylistArtists([...new Set(allArtists)])
    }, [])


    function artistSelectionHandler(artist: string) {

        setSelectedArtist(artist);
        const allUris: Array<string> = [];


        if (playlistID === "likedsongs") {
            playlistItems.forEach(element => {
                element?.track?.artists?.forEach(artistitem => {
                    if (artistitem?.name === artist) {
                        console.log(element.track)
                        allUris.push(element?.track?.uri)
                    }
                })
            })

            setUris(allUris)

            if (allUris.length > 0) {
                removeLikedSongs(allUris)
            }
        } else {
            playlistItems.forEach(element => {
                element?.item?.artists?.forEach(artistitem => {
                    if (artistitem?.name === artist) {
                        allUris.push(element?.item?.uri)
                    }
                })
            })

            setUris(allUris)

            if (allUris.length > 0) {
                removePlaylistItems(allUris)
            }


        }


    }

    function removePlaylistItems(foundUris) {

        const uriArray: Array<any> = []
        foundUris.forEach(element => {
            uriArray.push({ "uri": element })
        });

        
        let leftoverUris = uriArray;
        let max_uris;

        if (uriArray.length > 99) {
            max_uris = leftoverUris.slice(0, 99)
            leftoverUris = leftoverUris.slice(100, leftoverUris.length)
            setLeftOvers(true)
        } else {
            max_uris = uriArray;
            setLeftOvers(false)
        }

        console.log(max_uris)

        axios
            .delete(`https://api.spotify.com/v1/playlists/${playlistID}/items`, {
                data: {
                    "items": max_uris
                },
                headers: {
                    Authorization: "Bearer " + accessToken,
                }
            })
            .then((res) => {
                console.log(res);
                 console.log(leftOvers)
                                if (leftOvers) {
                    removePlaylistItems(leftoverUris)
                } else {
                    setTracksDeleted(true);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function removeLikedSongs(foundUris) {
        const uriArray: Array<any> = []
        foundUris.forEach(element => {
            uriArray.push(element)
        });

        console.log(foundUris)

        let leftoverUris = leftOvers ? leftOvers : uriArray;
        let max_uris;

        if (uriArray.length > 40) {
            max_uris = leftoverUris.slice(0, 39)
            leftoverUris = leftoverUris.slice(40, leftoverUris.length)
            setLeftOvers(leftoverUris.slice(40, leftoverUris.length))
        } else {
            max_uris = uriArray;
            setLeftOvers();
        }

        console.log(max_uris)

        axios
            .delete(`https://api.spotify.com/v1/me/library?uris=${max_uris}`, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                }
            })
            .then((res) => {
                console.log(res);

               

                if (leftOvers) {
                    removeLikedSongs(leftoverUris)
                } else {
                    setTracksDeleted(true);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Container>
            {tracksDeleted ?
                <ReadyContainer>
                    <div>
                        <h1>Your playlist is ready!</h1>
                        <p>Tracks by <i>{selectedArtist}</i> have been removed.</p>
                        <Button onClick={() => { setTracksDeleted(false); setUris([]) }}>Remove another artist from this playlist</Button>
                    </div>
                    {playlistID != 'likedsongs' ?
                        <iframe data-testid="embed-iframe" src={`https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator`} width="100%" height="352" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                        : null}
                </ReadyContainer>
                :
                <>
                    <h1>Which artist do you want to remove from your playlist?</h1>
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