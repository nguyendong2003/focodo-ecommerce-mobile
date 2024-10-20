import { ActivityIndicator, FlatList, Text, View } from "react-native";
import ProductCard from "./ProductCard";

const ProductList = ({ navigation, products, ListHeaderComponent, handleFetchMoreProducts, isLoadingMore, refreshing, handleRefreshing }) => {
    return (
        <View className="flex-1">
            <View>
                {ListHeaderComponent}
            </View>
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
                keyExtractor={item => 'all_products' + item.id}
                className="mx-1 bg-gray-100"
                numColumns={2}
                key={'all_products'}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View className="flex-1 items-center justify-center">
                        <Text className="text-lg text-gray-500 font-bold">Không có sản phẩm nào</Text>
                    </View>
                )}
                onEndReachedThreshold={0.2} // Load more when 20% of the list is reached
                onEndReached={handleFetchMoreProducts}
                ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" color="#ccc" /> : null}
                refreshing={refreshing}
                onRefresh={handleRefreshing}
            />
        </View>
    );
}

export default ProductList;