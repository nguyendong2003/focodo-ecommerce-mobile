import { TouchableOpacity } from "react-native"
import CartScreen from "../../screens/CartScreen"
import OrderScreen from "../../screens/OrderScreen"
import PaymentScreen from "../../screens/PaymentScreen"
import { Icon } from "@rneui/themed"
import ShippingInfoScreen from "../../screens/ShippingInfoScreen"

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
        name: 'Cart',
        component: CartScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Giỏ hàng',
            headerTitleAlign: 'center',
            headerStyle: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            },
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        className="px-4"
                        onPress={() => navigation.goBack()}>
                        <Icon type="feather" name="chevron-left" />
                    </TouchableOpacity>
                )
            }
        })
    },
    {
        name: 'ShippingInfo',
        component: ShippingInfoScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Thông tin giao hàng',
            headerTitleAlign: 'center',
            headerStyle: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            },
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        className="px-4"
                        onPress={() => navigation.goBack()}>
                        <Icon type="feather" name="chevron-left" />
                    </TouchableOpacity>
                )
            }
        })
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