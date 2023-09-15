import React from 'react'
import ReactDOM from 'react-dom/client'
import jsonData from '../output.json'
import { AvamopMaker } from '../../src/lib/avamop_maker/AvamopMaker'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AvamopMaker path="/examples/assets/parts/" objectStructure={jsonData} />
  </React.StrictMode>
)
