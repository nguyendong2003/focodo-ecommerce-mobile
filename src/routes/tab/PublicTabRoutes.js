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
                height: 70,
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
                    <View className="flex-row mx-4 gap-x-4">
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('SearchProduct')}
                        >
                            <Icon type="ionicon" name="search" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('Cart')}
                        >
                            <Icon type="antdesign" name="shoppingcart" />
                        </TouchableOpacity>
                    </View>

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
                height: 70,
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
                    <View className="flex-row mx-4 gap-x-4">
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('SearchProduct')}
                        >
                            <Icon type="ionicon" name="search" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('Cart')}
                        >
                            <Icon type="antdesign" name="shoppingcart" />
                        </TouchableOpacity>
                    </View>

                );
            },
        },
    },
    {
        name: 'Cart',
        component: CartScreen,
        options: {
            // headerShown: false,
            tabBarLabel: 'Giỏ hàng',
            tabBarIcon: ({ color, size }) => (
                <Icon type="entypo" name="shopping-cart" color={color} size={size} />
            ),
            headerShown: true,
            headerTitle: 'Giỏ hàng',
            headerTitleAlign: 'center',
            headerStyle: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5, // For Android
            },
            headerLeft: () => {
                const navigation = useNavigation();
                return (
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon type="feather" name="chevron-left" style={{ marginLeft: 16 }} />
                    </TouchableOpacity>
                );
            },
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