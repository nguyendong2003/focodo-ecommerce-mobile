import { ScrollView, Text, View } from "react-native";
import ProductList from "../components/product/ProductList";
import result from "../data/products.json"
import DropdownComponent from "../components/dropdown/Dropdown";
import { useMemo, useState } from "react";

const ProductListScreen = ({ navigation, route }) => {
    const [products, setProducts] = useState(result.products);
    const [sortBy, setSortBy] = useState('DEFAULT');

    const ListHeader = () => (
        <View className="flex-row items-center px-2 py-2 bg-white">
            <Text className="text-lg font-bold mr-1">Danh sách sản phẩm</Text>
            <View className="flex-1">
                <DropdownComponent sortBy={sortBy} setSortBy={setSortBy} />
            </View>
        </View>
    );

    const sortedProducts = useMemo(() => {
        const sorted = [...products];
        switch (sortBy) {
            case 'ASC':
                return sorted.sort((a, b) => a.price - b.price);
            case 'DESC':
                return sorted.sort((a, b) => b.price - a.price);
            case 'DEFAULT':
            default:
                return sorted.sort((a, b) => a.id - b.id);
        }
    }, [products, sortBy]);

    return (
        <View className="flex-1 bg-white">
            <ListHeader />
            <ScrollView
                horizontal
                scrollEnabled={false}
                className="bg-gray-200">
                <ProductList
                    products={sortedProducts}
                    navigation={navigation}
                />
            </ScrollView>
        </View>
    );
}

export default ProductListScreen;