import MakerWindow from './components/MakerWindow'
// https://reactjs.org/docs/react-dom-client.html
import * as ReactDOM from 'react-dom/client';
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <MakerWindow />
    </ChakraProvider>
  </React.StrictMode>
)

