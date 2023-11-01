import React from 'react'
import type { NextPage } from 'next'
import CustomHeader from '../components/CustomHeader'
import { Link } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <div>
      <CustomHeader title="Welcome to AVAMOP">
        <p>AVAMOP</p>
      </CustomHeader>
      <Link href="src/pages/AvatarCreate.tsx">こちら
        </Link>
    </div>
  )
}

export default Home