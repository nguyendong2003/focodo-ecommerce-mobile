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
import ReviewAddScreen from "../../screens/ReviewAddScreen"
import ReviewListScreen from "../../screens/ReviewListScreen"
import OrderTrackingScreen from "../../screens/OrderTrackingScreen"
import OrderCancelledReasonScreen from "../../screens/OrderCancelledReasonScreen"
import ReviewOrderScreen from "../../screens/ReviewOrderScreen"
import ReviewUpdateScreen from "../../screens/ReviewUpdateScreen"
import VnPayPaymentScreen from "../../screens/VnPayPaymentScreen"
import ProfileUpdateScreen from "../../screens/ProfileUpdateScreen"
import UpdatePasswordScreen from "../../screens/UpdatePasswordScreen"

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
        name: 'ProfileUpdate',
        component: ProfileUpdateScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Cập nhật thông tin',
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
        name: 'UpdatePassword',
        component: UpdatePasswordScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Đổi mật khẩu',
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
        name: 'OrderTracking',
        component: OrderTrackingScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Theo dõi đơn hàng',
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
        name: 'OrderCancelledReason',
        component: OrderCancelledReasonScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Hủy đơn hàng',
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
        name: 'ReviewAdd',
        component: ReviewAddScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Đánh giá sản phẩm',
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
        name: 'ReviewUpdate',
        component: ReviewUpdateScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Cập nhật đánh giá',
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
        name: 'ReviewList',
        component: ReviewListScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Đánh giá sản phẩm',
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
        name: 'ReviewOrder',
        component: ReviewOrderScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Đánh giá đơn hàng',
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
    {
        name: 'VnPayPayment',
        component: VnPayPaymentScreen,
    },
]

export default PrivateStackRoutes