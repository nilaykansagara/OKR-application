import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {OKRProviderComponent} from "./provider/OKRProviderComponent.tsx";
import {BrowserRouter} from "react-router";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <OKRProviderComponent>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </OKRProviderComponent>
    </StrictMode>,
)
