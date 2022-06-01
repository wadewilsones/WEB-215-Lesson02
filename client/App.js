import React from 'react'
import MainRouter from './MainRouter'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import { hot } from 'react-hot-loader'

const App = () => {
  return (
  <div>
      <ThemeProvider theme={theme}>
        <MainRouter/>
      </ThemeProvider>
  </div>
)}

export default hot(module)(App)