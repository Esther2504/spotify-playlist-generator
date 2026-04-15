import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

type Props = {
    playlistid: string;
    playlistItems: any;
}

export default function ArtistPlaylist({ playlistid, playlistItems }: Props) {
    const [playlistArtists, setPlaylistArtists] = useState([])
    const [uniquePlaylistArtists, setUniquePlaylistArtists] = useState([])

    const params = useParams()

    const playlistID = params.playlistid

    console.log(playlistItems)
    console.log(playlistArtists)

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

    return (
        <div>
            <p>For what artist do you want to create a seperate playlist?</p>
            {uniquePlaylistArtists.map((artist) => <p>{artist}</p>)}
        </div>
    )
}