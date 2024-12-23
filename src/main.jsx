import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import './index.css'
import App from "./App.jsx";
import { AuthProvider } from './AuthProvider.jsx';
import { MsgProvider } from "./components/alert/alert-provider.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MsgProvider >
          <App />
        </MsgProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
