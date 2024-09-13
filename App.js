import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from '@rneui/themed';
import ContactScreen from './screens/ContactScreen';
import PromotionScreen from './screens/PromotionScreen';
import GuideScreen from './screens/GuideScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListScreen from './screens/category/ProductListScreen';
import FavouriteScreen from './screens/FavouriteScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductDetailScreen from './screens/category/ProductDetailScreen';
import CartScreen from './screens/cart/CartScreen';
import AddressScreen from './screens/cart/AddressScreen';
import ShippingScreen from './screens/cart/ShippingScreen';
import PaymentScreen from './screens/cart/PaymentScreen';
import CategoryScreen from './screens/category/CategoryScreen';
import Header from './components/Header';

const Drawer = createDrawerNavigator();
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

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home'
          // screenOptions={{ headerShown: false }}
          screenOptions={{
            header: ({ navigation }) => <Header navigation={navigation} />,
            unmountOnBlur: true
          }}
        >
          <Drawer.Group>
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{
                drawerLabel: 'Trang chủ',
                title: 'Home',
                drawerIcon: ({ color, size }) => (
                  <Icon type="entypo" name="home" color={color} size={size} />
                ),

              }}
            />
            <Drawer.Screen
              name="CategoryStack"
              component={CategoryStack}
              options={{
                drawerLabel: 'Danh mục sản phẩm',
                title: 'Category',
                drawerIcon: ({ color, size }) => (
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
            <Drawer.Screen
              name="Promotion"
              component={PromotionScreen}
              options={{
                drawerLabel: 'Khuyến mãi',
                title: 'Promotion',
                drawerIcon: ({ color, size }) => (
                  <Icon type="material" name="discount" color={color} size={size} />
                ),

              }}
            />
            <Drawer.Screen
              name="Guide"
              component={GuideScreen}
              options={{
                drawerLabel: 'Hướng dẫn',
                title: 'Guide',
                drawerIcon: ({ color, size }) => (
                  <Icon type="entypo" name="book" color={color} size={size} />
                ),

              }}
            />
            <Drawer.Screen
              name="About"
              component={AboutScreen}
              options={{
                drawerLabel: 'Giới thiệu',
                title: 'About',
                drawerIcon: ({ color, size }) => (
                  <Icon type="entypo" name="info" color={color} size={size} />
                ),

              }}
            />
            <Drawer.Screen
              name="Contact"
              component={ContactScreen}
              options={{
                drawerLabel: 'Liên hệ',
                title: 'Contact',
                drawerIcon: ({ color, size }) => (
                  <Icon type="entypo" name="phone" color={color} size={size} />
                ),

              }}

            />
          </Drawer.Group>

          <Drawer.Group>
            <Drawer.Screen
              name="Favourite"
              component={FavouriteScreen}
              options={{
                drawerLabel: 'Yêu thích',
                title: 'Favourite',
                drawerIcon: ({ color, size }) => (
                  <Icon type="entypo" name="heart" color={color} size={size} />
                ),
                drawerItemStyle: { display: 'none' },

              }}
            />
            <Drawer.Screen
              name="CartStack"
              component={CartStack}
              options={{
                drawerLabel: 'Giỏ hàng',
                title: 'Cart',
                drawerIcon: ({ color, size }) => (
                  <Icon type="entypo" name="shopping-cart" color={color} size={size} />
                ),
                drawerItemStyle: { display: 'none' },


              }}
            />
            <Drawer.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                drawerLabel: 'Hồ sơ',
                title: 'Profile',
                drawerIcon: ({ color, size }) => (
                  <Icon type="entypo" name="user" color={color} size={size} />
                ),
                drawerItemStyle: { display: 'none' },

              }}
            />
          </Drawer.Group>

        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
