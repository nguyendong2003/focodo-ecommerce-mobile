import { FlatList, Text, View } from 'react-native';
import OrderCard from '../components/order/OrderCard';
import result from '../data/orders.json'
import { useEffect, useState } from 'react';

const OrderShippingScreen = ({ navigation }) => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        setOrders(result.orders)
    }, [])
    return (
        <View className="flex-1 bg-white">
            <FlatList
                data={orders}
                renderItem={({ item }) => <OrderCard order={item} navigation={navigation} />}
                keyExtractor={item => 'all_orders' + item.id}
                key={'all_orders'}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="bg-gray-200 h-1" />}
            // ListHeaderComponent={ListHeaderComponent}

            />
        </View>
    );
};

export default OrderShippingScreen;