import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AuthProvider } from './contexts/auth'
import { AnalysisProvider } from './contexts/analysis'

import './styles/global.css'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AnalysisProvider>
        <App />
      </AnalysisProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
