import * as React from 'react'
 import ReactDOM from 'react-dom/client'
 import { HomeMenuComp } from '../components/HomeMenuComp'
 
 ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <div>
            <HomeMenuComp />
        </div>
    </React.StrictMode>
   )