import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {OKRProvider} from "./provider/OKRProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <OKRProvider>
            <App/>
        </OKRProvider>
    </StrictMode>,
)
