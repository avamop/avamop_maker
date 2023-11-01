import { Link } from '@chakra-ui/react'
import * as React from 'react'
 
 
 export function HomeMenuComp() {
   return (
     <div>
       <p>AVAMOPへようこそ</p>
       <Link href="src/pages/AvatarCreate.tsx">こちら</Link>
     </div>
   )
 }