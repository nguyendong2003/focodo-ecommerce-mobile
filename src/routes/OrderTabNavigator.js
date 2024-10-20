import OrderScreen from '../screens/OrderScreen';
import OrderProcessingScreen from "../screens/OrderProcessingScreen";
import OrderConfirmationScreen from "../screens/OrderConfirmationScreen";
import OrderFinishedScreen from "../screens/OrderFinishedScreen";
import OrderCancelledScreen from '../screens/OrderCancelledScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useContext, useEffect, useState } from 'react';
import { callFetchAllOrderStatus } from '../services/api';
import { OrderContext } from '../components/context/OrderProvider';

const Tab = createMaterialTopTabNavigator();

const OrderTabNavigator = ({ navigation, route }) => {
    const { allOrderStatus } = useContext(OrderContext)

    const statusMapping = {
        "Chưa xác nhận": {
            name: "OrderProcessing",
            component: OrderProcessingScreen,
            label: 'Chưa xác nhận'
        },
        "Đã xác nhận": {
            name: "OrderConfirmation",
            component: OrderConfirmationScreen,
            label: 'Đã xác nhận'
        },
        "Đã giao": {
            name: "OrderFinished",
            component: OrderFinishedScreen,
            label: 'Đã giao'
        },
        "Đã hủy": {
            name: "OrderCancelled",
            component: OrderCancelledScreen,
            label: 'Đã hủy'
        }
    };

    return (
        <Tab.Navigator
            // initialRouteName="Order"
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
            {allOrderStatus?.map((item, index) => (
                <Tab.Screen
                    key={index}
                    name={statusMapping[item.status].name}
                    component={statusMapping[item.status].component}
                    options={{ tabBarLabel: statusMapping[item.status].label }}
                />
            ))}
            {/* <Tab.Screen
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
            /> */}
        </Tab.Navigator>
    );
}

export default OrderTabNavigator;