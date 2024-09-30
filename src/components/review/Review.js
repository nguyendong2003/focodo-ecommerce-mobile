import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ReviewOverall from "./ReviewOverall";
import ReviewCard from "./ReviewCard";
import { useEffect, useState } from "react";
import result from '../../data/reviews.json'

const Review = ({ navigation, productId }) => {
    const [overallReview, setOverallReview] = useState({});
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // call api
        const overallReviewCallAPI = result.overallReview;
        const reviewsCallAPI = result.reviews;

        setOverallReview(overallReviewCallAPI);
        setReviews(reviewsCallAPI);
    }, [productId]);

    return (
        <>
            <Text className="text-xl font-bold mt-4 px-4">Khách hàng đánh giá</Text>

            <ReviewOverall overallReview={overallReview} />

            <View className="mt-4 border-b-2 border-b-gray-100">
                {
                    reviews.map((review) => (
                        <View key={review.id}>
                            <ReviewCard review={review} />
                        </View>

                    ))
                }
            </View>

            <TouchableOpacity activeOpacity={0.5}
                className="mb-3 p-2 "
                onPress={() => navigation.navigate('Review', {
                    productId
                })}>
                <Text className="text-center text-base text-blue-600">Xem tất cả 119 đánh giá</Text>
            </TouchableOpacity>



        </>
    )
}

export default Review;