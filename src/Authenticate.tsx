import React from 'react'
import { AUTH_URL } from './AuthURL.tsx'
import { NavLink } from 'react-router'

type Props = {}

export default function Authenticate({}: Props) {
  return (
    <div>
        <NavLink to={AUTH_URL} className="login-btn">Connect to Spotify</NavLink>
    </div>
  )
}