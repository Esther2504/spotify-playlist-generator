import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

type Props = {
    playlistID: string;
    playlistItems: any;
    playlistName: string;
}

export default function DeduplicatePlaylist({ playlistID, playlistItems, playlistName }: Props) {
    const [ready, setReady] = useState<boolean>(false)
    const [duplicates, setDuplicates] = useState<Array<any>>([])
    const [selectedUris, setSelectedUris] = useState<Array<any>>([])
    const [itemsDeleted, setItemsDeleted] = useState<boolean>(false)

    const accessToken: string = localStorage.getItem('accessToken') || ""

    console.log(playlistItems)

    function handleSelection(item) {
        if (item.checked) {
            setSelectedUris((prev) => [...prev, item.value])
        } else {
            setSelectedUris((prev) => prev.filter((uri) => uri !== item.value))
        }
    }

    function selectAllDups() {
        setSelectedUris(duplicates.map((item) => item.trackInfo.track.uri))
        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.checked = true
        })
    }

    useEffect(() => {
        let foundDups = []
        let foundNameArtists = []
        let foundIds = []
        playlistItems.reduce((accumulator, track) => {
            if (track.track == null) {
                return;
            }
            const nameArtist = (track?.track?.name + '|' + track?.track?.artists[0]?.name).toLowerCase()

            if (foundIds.includes(track?.track?.id)) {
                foundDups.push({ "trackInfo": track, "reason": "Same track ID" })
            } else if (foundNameArtists.includes(nameArtist)) {
                foundDups.push({ "trackInfo": track, "reason": "Same name and artist" })
            } else {
                foundIds.push(track?.track?.id)
                foundNameArtists.push(nameArtist)
            }
            setDuplicates(foundDups)
        }, foundDups)

        setReady(true)
        console.log(foundDups)
    }, [])

    function removeDuplicates() {

        if (selectedUris.length === 0) {
            alert("Please select at least one duplicate to remove")
            return
        }

        const uriArray: Array<any> = []
        selectedUris.forEach(element => {
            uriArray.push({ "uri": element })

        });

        console.log(uriArray)

        axios
            .delete(`https://api.spotify.com/v1/playlists/${playlistID}/items`, {
                data: {
                    "items": uriArray
                },
                headers: {
                    Authorization: "Bearer " + accessToken,
                }
            })
            .then((res) => {
                console.log(res);
                setItemsDeleted(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Container>
            {itemsDeleted ?
                <div>
                    <p>The selected duplicates have been deleted from the playlist</p>

                    <iframe data-testid="embed-iframe" src={`https://open.spotify.com/embed/playlist/${playlistID}`} width="100%" height="352" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </div>
                :
                duplicates.length > 0 ?
                    <>
                        <h1>Which duplicates do you want to remove?</h1>
                        <ButtonContainer>
                        <Button onClick={() => selectAllDups()}>Select all duplicates</Button>
                        <Button onClick={() => removeDuplicates()}>Remove selected duplicates</Button>
                        </ButtonContainer>
                        <DuplicatesContainer>
                            {duplicates.map((item, index) => (
                                <Duplicate>
                                    <AlbumCover src={item?.trackInfo?.track?.album?.images[0]?.url} alt={item?.trackInfo?.track?.album?.name}></AlbumCover>
                                    <SongInfo><TrackArtistName><a href={item?.trackInfo?.track?.external_urls?.spotify}>{item?.trackInfo?.track?.name}</a></TrackArtistName><p className="artists">
                                        <div>{(item?.trackInfo?.track?.artists).map((artist: any, i: number) => {
                                            return (
                                                <>{i != (item?.trackInfo?.track?.artists).length - 1 ? <TrackArtistName><a href={artist?.external_urls?.spotify}>{artist?.name}</a>, </TrackArtistName> : <TrackArtistName><a href={artist.external_urls.spotify}>{artist.name}</a></TrackArtistName>}</>
                                            )
                                        })}</div>
                                    </p></SongInfo>
                                    <TrackLength>{(item?.trackInfo?.track?.duration_ms / 1000 / 60).toFixed(2).replace(".", ":")}</TrackLength>
                                    <Input type="checkbox" value={item?.trackInfo?.track?.uri} onChange={(e) => handleSelection(e.target)} />
                                </Duplicate>
                            ))}
                        </DuplicatesContainer>

                    </> : duplicates.length === 0 && ready ? <p>No duplicates found</p> : <p>Loading</p>
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

const ButtonContainer = styled.div`
display: flex;
justify-content: space-evenly;
width: 100%;
`

const Button = styled.button`
background: #148255;
color: #fff;
padding: 10px 20px;
text-decoration: none;
border-radius: 20px;
font-weight: bold;
border: none;
font-size: 1rem;
cursor: pointer;
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

const Input = styled.input`
accent-color: #148255;
width: 20px;
height: 20px;
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
overflow: clip;

.artists {
    font-size: 0.8rem;
    margin-top: 2px;
    max-height: 30px;
}

@keyframes scroll {
    0%   { transform: translate(0, 0); }
    50% { transform: translate(-100%, 0); }
    100% { transform: translate(0, 0); }
}
`

const TrackLength = styled.div`
text-align: center;
`