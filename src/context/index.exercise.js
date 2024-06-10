import {ReactQueryConfigProvider} from 'react-query'
import {AuthProvider} from './auth-context'

const queryConfig = {
  retry(failureCount, error) {
    if (error.status === 404) return false
    else if (failureCount < 2) return true
    else return false
  },
  useErrorBoundary: true,
  refetchAllOnWindowFocus: false,
}

export const AppProviders = ({ children }) => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ReactQueryConfigProvider>
  )
};
