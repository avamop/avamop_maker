import Canvas from './components/Canvas'
// https://reactjs.org/docs/react-dom-client.html
import * as ReactDOM from 'react-dom/client';
import React from 'react'
const root = () => (
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Canvas />
    </React.StrictMode>
  )
);

export default root;
