import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AuthProvider } from './contexts/auth'
import { AnalysisProvider } from './contexts/analysis'
import { ChakraProvider } from "@chakra-ui/react"

import './styles/global.css'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <AnalysisProvider>
          <App />
        </AnalysisProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
