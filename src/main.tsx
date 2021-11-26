import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AuthProvider } from './contexts/auth'
import { ChakraProvider } from "@chakra-ui/react"

import './styles/global.css'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
          <App />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
