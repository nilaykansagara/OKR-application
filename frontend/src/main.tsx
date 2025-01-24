import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {OKRProviderComponent} from "./provider/OKRProviderComponent.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <OKRProviderComponent>
            <App/>
        </OKRProviderComponent>
    </StrictMode>,
)
