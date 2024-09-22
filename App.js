import { AuthProvider } from "./src/components/context/AuthProvider"
import { ProductProvider } from "./src/components/context/ProductProvider"
import AppStackNavigator from "./src/routes/AppStackNavigator"

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <AppStackNavigator />
      </ProductProvider>
    </AuthProvider>
  )
}

export default App