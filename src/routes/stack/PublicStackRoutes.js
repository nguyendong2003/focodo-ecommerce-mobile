import AboutScreen from "../../screens/AboutScreen";
import ContactScreen from "../../screens/ContactScreen";
import GuideScreen from "../../screens/GuideScreen";
import ProductDetailScreen from "../../screens/ProductDetailScreen";
import ProductListScreen from "../../screens/ProductListScreen";
import ReviewScreen from "../../screens/ReviewScreen";
import SearchProductScreen from "../../screens/SearchProductScreen";
import MainTabNavigator from "../MainTabNavigator";
import HeaderSearchProduct from "../../components/header/HeaderSearchProduct";
import HeaderProductList from "../../components/header/HeaderProductList";
import ProductDescriptionScreen from "../../screens/ProductDescriptionScreen";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";

// options: {
//     // tabBarButton: (props) => null,
//     // tabBarVisible: false,
//     // tabBarBadge: 3,
//     // tabBarLabel: 'Login',
// },
const PublicStackRoutes = [
    {
        name: 'MainTab',
        component: MainTabNavigator,
        options: {
            // tabBarButton: (props) => null,
            // tabBarVisible: false,
            // tabBarBadge: 3,
            // tabBarLabel: 'Login',
        },
    },
    {
        name: 'ProductList',
        component: ProductListScreen,
        options: ({ navigation, route }) => ({
            headerShown: true,
            header: () => <HeaderProductList navigation={navigation} route={route} />,
        }),
    },
    {
        name: 'ProductDetail',
        component: ProductDetailScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Chi tiết sản phẩm',
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
        name: 'ProductDescription',
        component: ProductDescriptionScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Mô tả sản phẩm',
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
        name: 'Review',
        component: ReviewScreen,
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
        name: 'SearchProduct',
        component: SearchProductScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            header: () => <HeaderSearchProduct navigation={navigation} />,
        }),
    },
    {
        name: 'Guide',
        component: GuideScreen,
        options: {
            // tabBarButton: (props) => null,
            // tabBarVisible: false,
            // tabBarBadge: 3,
            // tabBarLabel: 'ReviewScreen',
        },
    },
    {
        name: 'About',
        component: AboutScreen,
        options: {
            // tabBarButton: (props) => null,
            // tabBarVisible: false,
            // tabBarBadge: 3,
            // tabBarLabel: 'ReviewScreen',
        },
    },
    {
        name: 'Contact',
        component: ContactScreen,
        options: {
            // tabBarButton: (props) => null,
            // tabBarVisible: false,
            // tabBarBadge: 3,
            // tabBarLabel: 'ReviewScreen',
        },
    },
];

export default PublicStackRoutes;