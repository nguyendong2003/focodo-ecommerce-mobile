import { TouchableOpacity } from "react-native"
import { Icon } from "@rneui/themed"
import CartScreen from "../../screens/CartScreen"
import PaymentScreen from "../../screens/PaymentScreen"
import ShippingInfoScreen from "../../screens/ShippingInfoScreen"
import ProfileScreen from "../../screens/ProfileScreen"
import OrderTabNavigator from "../OrderTabNavigator"
import OrderDetailScreen from "../../screens/OrderDetailScreen"
import OrderConfirmScreen from "../../screens/OrderConfirmScreen"
import OrderSuccessScreen from "../../screens/OrderSuccessScreen"

const PrivateStackRoutes = [
    {
        name: 'OrderTabNavigator',
        component: OrderTabNavigator,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Đơn hàng của tôi',
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
        name: 'Profile',
        component: ProfileScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Thông tin tài khoản',
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
        name: 'OrderDetail',
        component: OrderDetailScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Chi tiết đơn hàng',
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
        name: 'OrderConfirm',
        component: OrderConfirmScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Xác nhận đơn hàng',
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
        name: 'OrderSuccess',
        component: OrderSuccessScreen,
        // options: ({ navigation }) => ({
        //     headerBackVisible: false
        // })
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