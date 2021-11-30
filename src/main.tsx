import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AuthProvider } from './contexts/auth'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    newPurple: {
      50: '#8981D8',
      100: '#8981D8',
      500: '#8981D8'
    },
    polarityGood: {
      50: '#1AAE9F',
      100: '#1AAE9F',
      500: '#1AAE9F'
    },
    polarityNeutral: {
      50: '#DADD4C',
      100: '#DADD4C',
      500: '#DADD4C'
    },
    polarityNegative: {
      50: '#E33D3D',
      100: '#E33D3D',
      500: '#E33D3D'
    }
  }
})

import './styles/global.css'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
          <App />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
