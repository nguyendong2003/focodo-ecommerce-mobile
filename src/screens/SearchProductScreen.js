import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { ProductContext } from '../components/context/ProductProvider';
import { Icon } from '@rneui/themed';
import searchResultCallAPI from '../data/categories.json';

const SearchProductScreen = ({ navigation }) => {
    const { searchResult, setSearchResult, query, setQuery } = useContext(ProductContext);
    const [debouncedQuery, setDebouncedQuery] = useState('');

    /*
        # Kỹ thuật debouncing (hoặc throttling) 
        - Điều này giúp trì hoãn việc gọi API cho đến khi người dùng ngừng nhập liệu 
        trong một khoảng thời gian nhất định hoặc giới hạn tần suất gọi API.
    */

    // Update debouncedQuery sau 500ms sau khi người dùng ngừng nhập
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500); // 500ms debounce time

        // Clear timeout nếu query thay đổi trước khi hết thời gian
        return () => {
            clearTimeout(timerId);
        };
    }, [query]);

    // Gọi API khi debouncedQuery thay đổi
    useEffect(() => {
        if (debouncedQuery) {
            // Gọi API với debouncedQuery

            // fetchAPI(debouncedQuery);
            searchByName(debouncedQuery); // Thực hiện tìm kiếm với từ khóa debounce
        }
    }, [debouncedQuery]);

    // Hàm giả lập tìm kiếm API bằng tên
    const searchByName = (name) => {
        // Giả lập dữ liệu tĩnh cho ví dụ này
        const allItems = [...searchResultCallAPI];

        const filteredResults = allItems.filter((item) =>
            item.name.toLowerCase().includes(name.toLowerCase())
        );
        setSearchResult(filteredResults);

    };

    return (
        <View className="flex-1 bg-white">
            <FlatList
                data={searchResult}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.5} className="flex-row items-center  px-5 py-3 border-b-2 border-b-slate-100"
                        onPress={() => navigation.navigate('ProductList', { searchItem: item })}
                    >
                        <Icon type='font-awesome-5' name='search-dollar' color={'#6b7280'} />
                        <Text className="text-gray-500 text-base font-semibold px-2">{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => 'all_search_items' + item.id}
                // nestedScrollEnabled={true}
                key={'all_search_items'}
                showsVerticalScrollIndicator={false}
                // ListHeaderComponent={() => (
                //     searchResult && (
                //         <Text className="text-gray-500 text-base font-semibold text-center py-2">Kết quả tìm kiếm</Text>
                //     )
                // )}
                ListEmptyComponent={() => (
                    <View className="flex-1 items-center justify-center mt-4">
                        <Text className="text-gray-500 text-base font-semibold">Không tìm thấy kết quả nào</Text>
                    </View>
                )}
            // ListHeaderComponent={ListHeaderComponent}
            />
        </View>
    );
};

export default SearchProductScreen;