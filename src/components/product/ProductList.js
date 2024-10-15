import { ActivityIndicator, FlatList, View } from "react-native";
import ProductCard from "./ProductCard";

const ProductList = ({ navigation, products, ListHeaderComponent, handleFetchMoreProducts, isLoadingMore, refreshing, setRefreshing }) => {

    return (
        <View className="flex-1">
            <View >
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

                onEndReachedThreshold={0}
                onEndReached={handleFetchMoreProducts}
                ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" color="#ccc" /> : null}
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true)}
            />
        </View>
    );
}

export default ProductList;