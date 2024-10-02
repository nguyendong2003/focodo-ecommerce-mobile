import { AuthProvider } from "./src/components/context/AuthProvider"
import { OrderProvider } from "./src/components/context/OrderProvider"
import { ProductProvider } from "./src/components/context/ProductProvider"
import { ReviewProvider } from "./src/components/context/ReviewProvider"
import AppStackNavigator from "./src/routes/AppStackNavigator"

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <ReviewProvider>
            <AppStackNavigator />
          </ReviewProvider>
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App