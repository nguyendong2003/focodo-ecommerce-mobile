import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import { Icon } from '@rneui/themed';
import ContactScreen from './screens/ContactScreen';
import GuideScreen from './screens/GuideScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListScreen from './screens/category/ProductListScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductDetailScreen from './screens/category/ProductDetailScreen';
import CartScreen from './screens/cart/CartScreen';
import AddressScreen from './screens/cart/AddressScreen';
import ShippingScreen from './screens/cart/ShippingScreen';
import PaymentScreen from './screens/cart/PaymentScreen';
import CategoryScreen from './screens/category/CategoryScreen';
import Header from './components/Header';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CategoryStack = () => {
  return (
    <Stack.Navigator initialRouteName='Category'
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true
      }}
    // screenOptions={{
    //   header: ({ navigation }) => <Header navigation={navigation} />,
    // }}
    >
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

const CartStack = () => {
  return (
    <Stack.Navigator initialRouteName='Cart'
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true
      }}
    // screenOptions={{
    //   header: ({ navigation }) => <Header navigation={navigation} />,
    // }}
    >
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen name="Shipping" component={ShippingScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
}

export default function App({ navigation }) {
  // const navigation = useNavigation();
  // const route = useRoute();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Home'
          // screenOptions={{ headerShown: false }}
          screenOptions={{
            header: ({ navigation }) => <Header navigation={navigation} />,
            unmountOnBlur: true
          }}
        >
          <Tab.Group>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Trang chủ',
                title: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <Icon type="entypo" name="home" color={color} size={size} />
                ),
                // tabBarItemStyle: { display: 'none' },
                // tabBarButton: () => null,
              }}
            />
            <Tab.Screen
              name="CategoryStack"
              component={CategoryStack}
              options={{
                tabBarLabel: 'Danh mục sản phẩm',
                title: 'Category',
                tabBarIcon: ({ color, size }) => (
                  <Icon type="entypo" name="list" color={color} size={size} />
                ),
              }}
              listeners={({ navigation, route }) => ({
                drawerItemPress: (e) => {
                  e.preventDefault();

                  navigation.navigate('CategoryStack', { screen: 'Category' });
                }
              })}
            />
            <Tab.Screen
              name="Guide"
              component={GuideScreen}
              options={{
                tabBarLabel: 'Hướng dẫn',
                title: 'Guide',
                tabBarIcon: ({ color, size }) => (
                  <Icon type="entypo" name="book" color={color} size={size} />
                ),

              }}
            />
            <Tab.Screen
              name="About"
              component={AboutScreen}
              options={{
                tabBarLabel: 'Giới thiệu',
                title: 'About',
                tabBarIcon: ({ color, size }) => (
                  <Icon type="entypo" name="info" color={color} size={size} />
                ),

              }}
            />
            <Tab.Screen
              name="Contact"
              component={ContactScreen}
              options={{
                tabBarLabel: 'Liên hệ',
                title: 'Contact',
                tabBarIcon: ({ color, size }) => (
                  <Icon type="entypo" name="phone" color={color} size={size} />
                ),

              }}

            />
          </Tab.Group>

          <Tab.Group>
            <Tab.Screen
              name="CartStack"
              component={CartStack}
              options={{
                tabBarLabel: 'Giỏ hàng',
                title: 'Cart',
                tabBarIcon: ({ color, size }) => (
                  <Icon type="entypo" name="shopping-cart" color={color} size={size} />
                ),
                tabBarItemStyle: { display: 'none' },


              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                tabBarLabel: 'Hồ sơ',
                title: 'Profile',
                tabBarIcon: ({ color, size }) => (
                  <Icon type="entypo" name="user" color={color} size={size} />
                ),
                tabBarItemStyle: { display: 'none' },

              }}
            />
          </Tab.Group>

        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
