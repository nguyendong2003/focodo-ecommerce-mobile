import { RefreshControl, ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";
import ProductInfo from "../components/product/ProductInfo";
import Review from "../components/review/Review";
import { callFetchProductById } from "../services/api";
import ReviewOverall from "../components/review/ReviewOverall";


const ProductDetailScreen = ({ navigation, route }) => {
    const [productId, setProductId] = useState(route.params.productId);
    const [product, setProduct] = useState(null)
    const [overallReview, setOverallReview] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    const fetchProductById = async (productId) => {
        const res = await callFetchProductById(productId);
        if (res && res.result) {
            setProduct(res.result);

            if (res.result.review) {
                const review = res.result.review;
                const data = {
                    averageRate: review.avg_rating,
                    totalReview: review.total_review,
                    rateDetail: [
                        {
                            rate: 5,
                            rateQuantity: review.five_star_quantity
                        },
                        {
                            rate: 4,
                            rateQuantity: review.four_star_quantity
                        },
                        {
                            rate: 3,
                            rateQuantity: review.three_star_quantity
                        },
                        {
                            rate: 2,
                            rateQuantity: review.two_star_quantity
                        },
                        {
                            rate: 1,
                            rateQuantity: review.one_star_quantity
                        }
                    ]
                }
                setOverallReview(data);
            }
        }
    }

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchProductById(productId);
        setRefreshing(false);
    }

    useEffect(() => {
        if (productId) {
            fetchProductById(productId);
        }
    }, [productId]);

    // const [relatedProducts, setRelatedProducts] = useState(result.products);

    return (
        <ScrollView
            className="flex-1 bg-white"
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            }
        >

            <ProductInfo navigation={navigation} product={product} />

            {
                overallReview?.averageRate !== "NaN" && (
                    <>
                        <Text className="text-xl font-bold mt-4 px-4">Khách hàng đánh giá</Text>

                        <ReviewOverall overallReview={overallReview} />

                        <Review navigation={navigation} productId={productId} />
                    </>
                )
            }



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