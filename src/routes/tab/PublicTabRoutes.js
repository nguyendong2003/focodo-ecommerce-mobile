import HomePageScreen from "../../screens/HomePageScreen"
import CategoryScreen from "../../screens/CategoryScreen"
import CartScreen from "../../screens/CartScreen"
import ProfileScreen from "../../screens/ProfileScreen"
import OtherScreen from "../../screens/OtherScreen"
import { Icon } from "@rneui/themed"
import { Image, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import NotificationScreen from "../../screens/NotificationScreen"

const PublicTabRoutes = [
    {
        name: 'HomePage',
        component: HomePageScreen,
        options: {
            tabBarLabel: 'Trang chủ',
            tabBarIcon: ({ color, size }) => (
                <Icon type="entypo" name="home" color={color} size={size} />
            ),
            headerShown: true,
            headerTitle: '',

            headerStyle: {
                // backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: () => (
                <Image
                    source={require('../../static/images/banner/brand-image.png')}
                    style={{ width: 56, height: 56, marginLeft: 16 }}
                />

            ),
            headerRight: () => {
                const navigation = useNavigation();
                return (
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => navigation.navigate('SearchProduct')}
                    >
                        <Icon
                            type="ionicon"
                            name="search"
                            color="#000"
                            size={24}
                            style={{ marginRight: 16 }}
                        />
                    </TouchableOpacity>
                );
            },
        },
    },
    {
        name: 'Category',
        component: CategoryScreen,
        options: {
            tabBarLabel: 'Danh mục',
            tabBarIcon: ({ color, size }) => (
                <Icon type="feather" name="grid" color={color} size={size} />
            ),
            headerShown: true,
            headerTitle: '',

            headerStyle: {
                // backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: () => (
                <Image
                    source={require('../../static/images/banner/brand-image.png')}
                    style={{ width: 56, height: 56, marginLeft: 16 }}
                />

            ),
            headerRight: () => {
                const navigation = useNavigation();
                return (
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => navigation.navigate('SearchProduct')}
                    >
                        <Icon
                            type="ionicon"
                            name="search"
                            color="#000"
                            size={24}
                            style={{ marginRight: 16 }}
                        />
                    </TouchableOpacity>
                );
            },
        },
    },
    {
        name: 'Cart',
        component: CartScreen,
        options: {
            headerShown: false,
            tabBarLabel: 'Giỏ hàng',
            tabBarIcon: ({ color, size }) => (
                <Icon type="entypo" name="shopping-cart" color={color} size={size} />
            ),
        },
    },
    {
        name: 'Profile',
        component: ProfileScreen,
        options: {
            tabBarLabel: 'Tôi',
            tabBarIcon: ({ color, size }) => (
                <Icon type="ionicon" name="person" color={color} size={size} />
            ),
        },
    },
    {
        name: 'Notification',
        component: NotificationScreen,
        options: {
            tabBarLabel: 'Thông báo',
            tabBarIcon: ({ color, size }) => (
                <Icon type="ionicon" name="notifications" color={color} size={size} />
            ),
        },
    },
    {
        name: 'Other',
        component: OtherScreen,
        options: {
            tabBarLabel: 'Khác',
            tabBarIcon: ({ color, size }) => (
                <Icon type="feather" name="more-horizontal" color={color} size={size} />
            ),
        },
    },
];

export default PublicTabRoutes