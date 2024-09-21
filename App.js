import { AuthProvider } from "./src/components/auth/AuthProvider"
import AppStackNavigator from "./src/routes/AppStackNavigator"

const App = () => {
  return (
    <AuthProvider>
      <AppStackNavigator />
    </AuthProvider>
  )
}

export default App