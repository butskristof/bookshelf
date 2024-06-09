/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import * as colors from 'styles/colors'
import {FullPageSpinner} from './components/lib'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {client} from './utils/api-client.exercise'
import {useAsync} from './utils/hooks'

function App() {
  const {data: user, error, isLoading, isIdle, isError, isSuccess, run, setData} = useAsync()

  const login = (form) => auth.login(form).then(setData)
  const register = (form) => auth.register(form).then(setData)

  const logout = () => {
    return auth.logout().then(() => setData(null))
  }

  React.useEffect(() => {
    run(auth.getToken()
      .then(token => client('me', {token}),
      ))
  }, [run])

  if (isLoading || isIdle)
    return <FullPageSpinner />
  if (isError)
    return <div
      css={{
        color: colors.danger,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>

  if (isSuccess)
    return user
      ? <AuthenticatedApp user={user} logout={logout} />
      : <UnauthenticatedApp login={login} register={register} />
}

export {App}