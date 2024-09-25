import { TouchableOpacity } from "react-native"
import AddressScreen from "../../screens/AddressScreen"
import CartScreen from "../../screens/CartScreen"
import OrderScreen from "../../screens/OrderScreen"
import PaymentScreen from "../../screens/PaymentScreen"
import { Icon } from "@rneui/themed"

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
        name: 'Address',
        component: AddressScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Địa chỉ nhận hàng',
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