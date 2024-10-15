import { FlatList } from "react-native";
import ProductCard from "./ProductCard";

const ProductListHomePage = ({ navigation, products }) => {

    return (
        <FlatList
            data={products}
            renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
            keyExtractor={item => 'all_products' + item.id}
            className="mx-1 bg-gray-100"
            numColumns={2}
            key={'all_products'}
            showsVerticalScrollIndicator={false}
        />
    );
}

export default ProductListHomePage;