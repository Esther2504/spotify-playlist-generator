import React from 'react'
import { useEffect, useState } from 'react'

type Props = {
    playlistid: string;
    playlistItems: any;
    playlistName: string;
}

export default function YearPlaylist({playlistID, playlistItems, playlistName }: Props) {
    const [playlistYears, setPlaylistYears] = useState([])
    const [uniqueYears, setUniqueYears] = useState([])

    console.log(playlistYears)

    useEffect(() => {
        console.log(playlistItems)
        playlistItems.forEach(element => {
            // console.log(element?.item?.album)
                let releaseDate = new Date(element?.item?.album?.release_date)
                let releaseYear = releaseDate.getFullYear()
                console.log(releaseYear)
                setPlaylistYears((prevYears) => [...prevYears, releaseYear])
        });
    }, [])

        useEffect(() => {
            setUniqueYears([...new Set(playlistYears)])
        }, [playlistYears])


  return (
    <div>
         {uniqueYears.sort().map((year) => <p>{year}</p>)}
    </div>
  )
}