import OrderScreen from "../../screens/OrderScreen"
import PaymentScreen from "../../screens/PaymentScreen"

const PrivateStackRoutes = [
    {
        name: 'Order',
        component: OrderScreen,
        options: {
            // tabBarButton: (props) => null,
            // tabBarVisible: false,
            // tabBarBadge: 3,
            // tabBarLabel: 'Login',
        },
    },
    {
        name: 'Payment',
        component: PaymentScreen,
        options: {
            // tabBarButton: (props) => null,
            // tabBarVisible: false,
            // tabBarBadge: 3,
            // tabBarLabel: 'Login',
        },
    },
]

export default PrivateStackRoutes