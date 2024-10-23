import { Text, TouchableOpacity, View } from "react-native";
import ReviewCard from "./ReviewCard";
import { useEffect, useState } from "react";
import { callFetchReviewsByProductId } from "../../services/api";

const Review = ({ navigation, productId }) => {
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async (productId) => {
        const res = await callFetchReviewsByProductId(productId, 0, 3);
        if (res && res.result) {
            const data = res.result.data
            const dataReviews = data.map((item) => {
                return {
                    id: item.id,
                    time: item.date,
                    rate: item.rating,
                    comment: item.content,
                    user: {
                        id: item.user.id,
                        name: item.user.full_name,
                        avatar: item.user.avatar ? item.user.avatar : null,
                    },
                    images: item.images
                }
            })
            setReviews(dataReviews);
        }
    }

    useEffect(() => {
        // call api
        if (productId) {
            fetchReviews(productId);
        }

    }, [productId]);

    return (
        <>
            <View className="mt-4 border-b-2 border-b-gray-100">
                {
                    reviews.map((review) => (
                        <View key={review.id}>
                            <ReviewCard navigation={navigation} review={review} />
                        </View>

                    ))
                }
            </View>

            {
                reviews.length > 0 && (
                    <TouchableOpacity activeOpacity={0.5}
                        className="mb-3 p-2 "
                        onPress={() => navigation.navigate('Review', {
                            productId
                        })}>
                        {/* onPress={() => navigation.navigate('Review', {
                        screen: 'Settings',
                        productId
                    })}> */}
                        <Text className="text-center text-base text-blue-600">Xem tất cả đánh giá</Text>
                    </TouchableOpacity>
                )
            }




        </>
    )
}

export default Review;