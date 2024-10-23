import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { ProductContext } from '../components/context/ProductProvider';
import { Icon } from '@rneui/themed';
import { callSearchProducts } from '../services/api';

const SearchProductScreen = ({ navigation }) => {
    const { searchResult, setSearchResult, query, setQuery } = useContext(ProductContext);
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const size = 10; // Số lượng sản phẩm trên mỗi trang

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [query]);

    useEffect(() => {
        if (debouncedQuery) {
            searchByName(debouncedQuery, currentPage, size);
        }
    }, [debouncedQuery, currentPage]);

    const searchByName = async (name, page, size) => {
        try {
            const res = await callSearchProducts(name, page, size);
            if (res && res.result) {
                const { data, pagination } = res.result;

                setSearchResult(data);
                setTotalPages(pagination.total_pages);
                setCurrentPage(pagination.current_page);
            }

        } catch (error) {
            console.error("Error fetching search results: ", error);
        }
    };

    const loadMoreData = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    return (
        <View className="flex-1 bg-white">
            <FlatList
                data={searchResult}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.5} className="flex-row items-center  px-5 py-3 border-b-2 border-b-slate-100"
                        // onPress={() => navigation.navigate('ProductList', { searchItem: item })}>
                        onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
                        <Icon type='font-awesome-5' name='search-dollar' color={'#6b7280'} />
                        <Text className="text-gray-500 text-base font-semibold px-2">{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => 'all_search_items' + item.id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View className="flex-1 items-center justify-center mt-4">
                        <Text className="text-gray-500 text-base font-semibold">Không tìm thấy kết quả nào</Text>
                    </View>
                )}
                onEndReached={loadMoreData} // Tải thêm dữ liệu khi cuộn xuống
                onEndReachedThreshold={0.2} // Đường ngưỡng khi cuộn xuống
            />
        </View>
    );
};

export default SearchProductScreen;
