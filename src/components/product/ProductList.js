import { FlatList, View } from "react-native";
import ProductCard from "./ProductCard";

const ProductList = ({ products, navigation, ListHeaderComponent }) => {

    return (
        <FlatList
            data={products}
            renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
            keyExtractor={item => 'all_products' + item.id}
            // nestedScrollEnabled={true}
            className="mx-1"
            numColumns={2}
            key={'all_products'}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={ListHeaderComponent}

        />
    );
}

export default ProductList;