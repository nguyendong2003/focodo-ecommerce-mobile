import HomePageScreen from "../../screens/HomePageScreen"
import CategoryScreen from "../../screens/CategoryScreen"
import { Icon } from "@rneui/themed"
import { Image, Text, TouchableOpacity, View } from "react-native"
import NotificationScreen from "../../screens/NotificationScreen"
import AccountScreen from "../../screens/AccountScreen"

const PublicTabRoutes = [
    {
        name: 'HomePage',
        component: HomePageScreen,
        options: ({ navigation }) => ({
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
        }),
    },
    {
        name: 'Category',
        component: CategoryScreen,
        options: ({ navigation }) => ({
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
        }),
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
        name: 'Account',
        component: AccountScreen,
        options: ({ navigation }) => ({
            tabBarLabel: 'Tài khoản',
            tabBarIcon: ({ color, size }) => (
                <Icon type="ionicon" name="person" color={color} size={size} />
            ),
            headerTitle: 'Tài khoản',
            headerTitleStyle: {
                fontSize: 18,
            },
            headerRight: () => {
                return (
                    <View className="flex-row mx-4 gap-x-4 items-center">
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => alert('Cài đặt')}
                        >
                            <Icon type="feather" name="settings" size={22} />
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
            headerStyle: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            },
        }),
    },
];

export default PublicTabRoutes