import { ScrollView } from "react-native";
import { useState } from "react";
import ProductInfo from "../components/product/ProductInfo";
import Review from "../components/review/Review";


const ProductDetailScreen = ({ navigation, route }) => {
    const [productId, setProductId] = useState(route.params.productId);


    // const [relatedProducts, setRelatedProducts] = useState(result.products);

    return (
        <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>

            <ProductInfo navigation={navigation} productId={productId} />

            <Review navigation={navigation} productId={productId} />

            {/* <View>
                <Text className="text-2xl font-bold p-2">Sản phẩm liên quan</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                >
                    <ProductList products={relatedProducts} navigation={navigation} />
                </ScrollView>
            </View> */}
        </ScrollView>
    );
}

export default ProductDetailScreen;