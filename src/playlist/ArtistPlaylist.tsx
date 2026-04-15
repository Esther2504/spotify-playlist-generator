import React, { useState } from 'react'
import { useParams } from 'react-router'

type Props = {
    playlistid : string;
    playlistItems : any;
}

export default function ArtistPlaylist({playlistid, playlistItems}: Props) {
const [playlistArtists, setPlaylistArtists] = useState([])

    const params = useParams()

    const playlistID = params.playlistid

    console.log(playlistItems)
    console.log(playlistArtists)

    playlistItems.forEach(element => {
        for (let i = 0; i < element.artists.length; i++) {
        if (!playlistArtists.includes(element.artists[i].name)) {
            setPlaylistArtists([...prev, element.artists[i].name])
        }
        }

    });

  return (
    <div>
<p>For what artist do you want to create a seperate playlist?</p>

    </div>
  )
}