import React from 'react';
import './styles/App.css';
import Login from './components/Login'
import Box from '@material-ui/core/Box';
import SnackbarContainer from './components/SnackbarContainer'

export default function App() {
  const isAuthenticated = localStorage.getItem('authToken') && localStorage.getItem('authToken').length > 0
  const [authenticated, setAuthenticated] = React.useState(false)

  const handleDisplay = () => {
    if (authenticated || isAuthenticated) {
      return <SnackbarContainer setAuthenticated={setAuthenticated} />
    } else {
      return (
        <Box component="span" m={1}>
          <Login handleAuth={setAuthenticated} />
        </Box>
      )
    }
  }

  return (
    <div className="App">
      { handleDisplay() }
    </div>
  )
}
