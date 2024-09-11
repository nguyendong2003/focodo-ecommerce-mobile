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
import CategoryScreen from './screens/CategoryScreen';
import GuideScreen from './screens/GuideScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home'
          screenOptions={{ headerShown: false }}
        >
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
            name="Category"
            component={CategoryScreen}
            options={{
              drawerLabel: 'Danh mục',
              title: 'Category',
              drawerIcon: ({ color, size }) => (
                <Icon type="entypo" name="list" color={color} size={size} />
              ),
            }}
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
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
