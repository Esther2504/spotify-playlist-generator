import React from 'react'
import { useState, useEffect } from 'react'
import PlaylistOptions from './PlaylistOptions.tsx'
import { NavLink } from 'react-router'

type Props = {}

export default function index({}: Props) {
      // const [playlistTool, setPlaylistTool] = useState<string>()


  return (
    <div><PlaylistOptions /></div>
  )
}