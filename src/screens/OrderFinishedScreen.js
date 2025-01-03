import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import OrderCard from '../components/order/OrderCard';
import result from '../data/orders.json'
import { useEffect, useState } from 'react';
import { callFetchOrdersByStatus } from '../services/api';
import { Icon } from '@rneui/themed';
import { convertOrders } from '../utils/OrderUtils';

const OrderFinishedScreen = ({ navigation }) => {
    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isFetching, setIsFetching] = useState(false); // Add a flag to prevent multiple API calls

    const fetchOrders = async (currentPage) => {
        setIsFetching(true); // Set fetching flag to true
        const res = await callFetchOrdersByStatus('Đã giao', currentPage, size);
        if (res && res.result) {
            const data = res.result?.data;
            const ordersData = convertOrders(data);
            if (currentPage === 0) {
                setOrders(ordersData);
            } else {
                setOrders(prevOrders => [...prevOrders, ...ordersData]);
            }
            setPage(res.result.pagination.current_page);
            setTotalPage(res.result.pagination.total_pages);
        }
        setIsFetching(false); // Set fetching flag to false
    };

    const handleFetchMoreOrders = async () => {
        if (page < totalPage && !isFetching) {
            setIsLoadingMore(true);
            await fetchOrders(page + 1);
            setIsLoadingMore(false);
        }
    };

    const handleRefreshing = async () => {
        setRefreshing(true);
        await fetchOrders(0);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchOrders(0);
    }, []);

    return (
        <View className="flex-1 bg-white">
            <FlatList
                data={orders}
                renderItem={({ item }) => <OrderCard order={item} navigation={navigation} />}
                keyExtractor={(item, index) => `finished_orders_${item.id}_${index}`}
                key={'finished_orders'}
                ItemSeparatorComponent={() => <View className="bg-gray-200 h-1" />}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View className="flex-1 items-center justify-center bg-white">
                        <Icon type="feather" name="truck" size={48} color="#ccc" />
                        <Text className="text-gray-500 text-lg mt-2">Đơn hàng trống</Text>
                    </View>
                )}
                contentContainerStyle={{ flexGrow: 1 }}

                onEndReachedThreshold={0.2} // Load more when 20% of the list is reached
                onEndReached={handleFetchMoreOrders}
                ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" color="#ccc" /> : null}
                refreshing={refreshing}
                onRefresh={handleRefreshing}

            />
        </View>
    );
};

export default OrderFinishedScreen;