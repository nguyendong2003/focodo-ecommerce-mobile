import OrderScreen from '../screens/OrderScreen';
import OrderProcessScreen from "../screens/OrderProcessScreen";
import OrderShippingScreen from "../screens/OrderShippingScreen";
import OrderFinishScreen from "../screens/OrderFinishScreen";
import OrderCancelScreen from '../screens/OrderCancelScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const OrderTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Order"
            className="text-gray-500"
            screenOptions={{
                // tabBarActiveTintColor: '#e91e63',
                tabBarLabelStyle: { fontSize: 15, textTransform: 'none', fontWeight: 'bold' },
                tabBarStyle: { backgroundColor: 'white' },
                tabBarActiveTintColor: '#2563EB',
                tabBarInactiveTintColor: '#6b7280',
                tabBarScrollEnabled: true
            }}
        >
            <Tab.Screen
                name="Order"
                component={OrderScreen}
                options={{ tabBarLabel: 'Tất cả đơn' }}
            />
            <Tab.Screen
                name="OrderProcess"
                component={OrderProcessScreen}
                options={{ tabBarLabel: 'Đang xử lý' }}
            />
            <Tab.Screen
                name="OrderShipping"
                component={OrderShippingScreen}
                options={{ tabBarLabel: 'Đang vận chuyển' }}
            />
            <Tab.Screen
                name="OrderFinish"
                component={OrderFinishScreen}
                options={{ tabBarLabel: 'Đã giao' }}
            />
            <Tab.Screen
                name="OrderCancel"
                component={OrderCancelScreen}
                options={{ tabBarLabel: 'Đã hủy' }}
            />
        </Tab.Navigator>
    );
}

export default OrderTabNavigator;