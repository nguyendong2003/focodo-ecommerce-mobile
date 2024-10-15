import { ScrollView, Text, View } from "react-native";
import ProductList from "../components/product/ProductList";
import result from "../data/products.json"
import DropdownComponent from "../components/dropdown/Dropdown";
import { useEffect, useMemo, useState } from "react";
import { callFetchProductsByCategoryPagination } from "../services/api";

const ProductListScreen = ({ navigation, route }) => {
    const [category, setCategory] = useState(route.params.category);
    const [products, setProducts] = useState(result.products);
    const [sortBy, setSortBy] = useState('DEFAULT');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [totalPage, setTotalPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchProducts = async (currentPage) => {
        const res = await callFetchProductsByCategoryPagination(category.id, currentPage, size);
        if (res && res.result) {
            setProducts(res.result.data);
            setPage(res.result.pagination.current_page);
            setTotalPage(res.result.pagination.total_pages);
        }
    }

    const handleFetchMoreProducts = async () => {
        if (page < totalPage) {
            setIsLoadingMore(true);
            const res = await callFetchProductsByCategoryPagination(category.id, page + 1, size);
            if (res && res.result) {
                setProducts([...products, ...res.result.data]);
                setPage(res.result.pagination.current_page);
                setTotalPage(res.result.pagination.total_pages);
            }
            setIsLoadingMore(false);
        }
    }

    const handleRefreshing = async () => {
        setSortBy('DEFAULT');
        await fetchProducts(0);
        setRefreshing(false);
    }

    useEffect(() => {
        if (category) {
            fetchProducts(0);
        }
    }, [category]);

    useEffect(() => {
        if (category) {
            handleRefreshing()
        }
    }, [refreshing])

    const ListHeader = () => (
        <View className="flex-row items-center px-2  bg-white">
            <Text className="flex-1 text-lg font-bold mr-1">Danh sách sản phẩm</Text>
            <View className="flex-1">
                <DropdownComponent sortBy={sortBy} setSortBy={setSortBy} />
            </View>
        </View>
    );

    const sortedProducts = useMemo(() => {
        const sorted = [...products];
        switch (sortBy) {
            case 'ASC':
                return sorted.sort((a, b) => a.sell_price - b.sell_price);
            case 'DESC':
                return sorted.sort((a, b) => b.sell_price - a.sell_price);
            case 'DEFAULT':
                return sorted;
            // default:
            //     return sorted.sort((a, b) => a.id - b.id);
        }
    }, [products, sortBy]);

    return (
        <View className="flex-1 bg-white">
            {/* <ListHeader /> */}
            {/* <ScrollView
                horizontal
                scrollEnabled={false}
                className="bg-gray-200"> */}
            <ProductList
                navigation={navigation}
                products={sortedProducts}
                isLoadingMore={isLoadingMore}
                handleFetchMoreProducts={handleFetchMoreProducts}
                refreshing={refreshing}
                setRefreshing={setRefreshing}
                ListHeaderComponent={<ListHeader />}
            />
            {/* </ScrollView> */}
        </View>
    );
}

export default ProductListScreen;