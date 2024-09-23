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
import HeaderProductDetail from "../../components/header/HeaederProductDetail";
import ProductDescriptionScreen from "../../screens/ProductDescriptionScreen";
import HeaderProductDescription from "../../components/header/HeaderProductDescription";

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
            header: () => <HeaderProductDetail navigation={navigation} />,
            // headerTransparent: true,
        }),
    },
    {
        name: 'ProductDescription',
        component: ProductDescriptionScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            header: () => <HeaderProductDescription navigation={navigation} />,
            // headerTransparent: true,
        }),
    },
    {
        name: 'Review',
        component: ReviewScreen,
        options: {
            // tabBarButton: (props) => null,
            // tabBarVisible: false,
            // tabBarBadge: 3,
            // tabBarLabel: 'ReviewScreen',
        },
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