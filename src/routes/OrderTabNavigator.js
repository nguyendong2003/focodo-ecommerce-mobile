import OrderScreen from '../screens/OrderScreen';
import OrderProcessingScreen from "../screens/OrderProcessingScreen";
import OrderConfirmationScreen from "../screens/OrderConfirmationScreen";
import OrderFinishedScreen from "../screens/OrderFinishedScreen";
import OrderCancelledScreen from '../screens/OrderCancelledScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const OrderTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Order"
            className="text-gray-500"
            screenOptions={{
                // tabBarActiveTintColor: '#e91e63',
                tabBarLabelStyle: { fontSize: 14, textTransform: 'none', fontWeight: 'bold' },
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
                name="OrderProcessing"
                component={OrderProcessingScreen}
                options={{ tabBarLabel: 'Chưa xác nhận' }}
            />
            <Tab.Screen
                name="OrderConfirmation"
                component={OrderConfirmationScreen}
                options={{ tabBarLabel: 'Đã xác nhận' }}
            />
            <Tab.Screen
                name="OrderFinished"
                component={OrderFinishedScreen}
                options={{ tabBarLabel: 'Đã giao' }}
            />
            <Tab.Screen
                name="OrderCancelled"
                component={OrderCancelledScreen}
                options={{ tabBarLabel: 'Đã hủy' }}
            />
        </Tab.Navigator>
    );
}

export default OrderTabNavigator;