import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Import BrowserRouter
import App from './App.jsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.PROD ? '/my-portfolio/' : '/'}> {/* Dynamic basename */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)