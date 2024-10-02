import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';

const OrderTrackingScreen = ({ navigation, route }) => {
    const { orderId } = route.params;
    const [orderTracking, setOrderTracking] = useState([]);
    const [selectedTracking, setSelectedTracking] = useState('ordered');

    useEffect(() => {
        const fetchOrderTracking = async () => {
            try {
                // const response = await axios.get(`https://api.example.com/orders/${orderId}/tracking`);
                const response = require('../data/orderTracking.json');
                const reversedOrderTracking = [...response.orderTracking].reverse();

                setSelectedTracking(reversedOrderTracking[0].status);
                handleSetOrderTracking(reversedOrderTracking);
            } catch (error) {
                console.error('Error fetching order tracking data:', error);
            }
        };

        if (orderId) {
            fetchOrderTracking();
        }
    }, [])

    const getStatus = (status) => {
        switch (status) {
            case 'ordered':
                return 'Đặt hàng thành công';
            case 'cancelled':
                return 'Hủy đơn hàng';
            case 'processing':
                return 'Đang xử lý đơn hàng';
            case 'shipping':
                return 'Đang giao hàng';
            case 'finished':
                return 'Giao hàng thành công';
            default:
                return 'Mặc định';
        }
    }

    const handleSetOrderTracking = (items) => {
        console.log('Items:', items);

        const itemValues = {
            'ordered': {
                status: 'ordered',
            },
            'cancelled': {
                status: 'cancelled',
            },
            'processing': {
                status: 'processing',
            },
            'shipping': {
                status: 'shipping',
            },
            'finished': {
                status: 'finished',
            },
        }

        const orderTracking = items.reduce((acc, item) => {
            acc[item.status] = {
                status: item.status,
                time: item.time,
            };
            return acc;
        }, itemValues);


        const orderKeys = ['finished', 'shipping', 'processing', 'cancelled', 'ordered'];

        const sortedOrderTracking = orderKeys
            .map(key => orderTracking[key])

        setOrderTracking(sortedOrderTracking);
    }

    // console.log('Order tracking:', JSON.stringify(orderTracking));

    return (
        <View className="flex-1 bg-white">

            <ScrollView >
                <Text className="text-gray-500 font-bold text-lg px-4 mt-5">Mã đơn hàng: {orderId}</Text>
                <View className="p-4">
                    {
                        orderTracking.map((item, index) => (
                            <View className="flex-row gap-x-2" key={index}>
                                <View className="items-center">
                                    <View
                                        className={`w-5 h-5 rounded-full border-4 bg-gray-300 border-gray-200
                                                ${item?.status === selectedTracking && 'bg-blue-500  border-cyan-200'}`}>
                                    </View>
                                    {index < orderTracking.length - 1 && (
                                        <View className="bg-gray-200 h-10 w-1"></View>
                                    )}
                                    {/* <View className="bg-gray-200 h-10 w-1"></View> */}
                                </View>

                                <View>
                                    <Text className={`text-base leading-5 text-gray-500 font-semibold
                                                ${item?.status === selectedTracking && 'text-black font-bold'}  `}
                                    >{getStatus(item?.status)}</Text>
                                    <Text className="text-sm text-gray-500 font-semibold">{item?.time}</Text>
                                </View>
                            </View>
                        ))
                    }

                </View>


            </ScrollView>
            <View>

                <TouchableOpacity activeOpacity={0.7}
                    className="rounded-md  border-black py-2 border-2 my-4 mx-3 bg-black"
                    onPress={() => navigation.navigate('OrderDetail', { orderId })}
                >
                    <Text className="text-center text-white font-bold">Xem chi tiết đơn hàng</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};
export default OrderTrackingScreen;