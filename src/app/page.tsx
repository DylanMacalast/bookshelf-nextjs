import React from 'react'
import { Button } from '../components/atoms/Button'
import clientPromise from '../../lib/mongodb'

const page = async () => {
  const connection = await clientPromise

  console.log(connection)

  return (
    <div>
      <Button />
    </div>
  )
}

export default page
