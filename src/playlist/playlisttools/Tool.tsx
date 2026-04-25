import React from 'react'
import { useParams } from 'react-router'

type Props = {}



export default function Tool({}: Props) {
    const params = useParams()

console.log(params.tool)

  return (
    <div>Tool</div>
  )
}