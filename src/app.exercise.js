/** @jsx jsx */
import {jsx} from '@emotion/core'

import {useAuth} from './context/auth-context'
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthenticatedApp} from './authenticated-app.exercise'
import {UnauthenticatedApp} from './unauthenticated-app.exercise'

function App() {
  const {user} = useAuth()
  return user ? (
    <Router>
      <AuthenticatedApp />
    </Router>
  ) : (
    <UnauthenticatedApp />
  )
}

export {App}