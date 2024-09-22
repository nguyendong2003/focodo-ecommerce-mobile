import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ReviewOverall from "./ReviewOverall";
import ReviewCard from "./ReviewCard";
import { useEffect, useState } from "react";
import result from '../../data/reviews.json'

const Review = ({ navigation, productId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // call api
        const reviews = result.reviews;

        setReviews(reviews);
    }, [productId]);

    return (
        <>
            <Text className="text-xl font-bold mt-4 px-4">Khách hàng đánh giá</Text>

            <ReviewOverall />

            <View className="mt-4 divide-y divide-gray-200">
                {
                    reviews.map((review) => (
                        <View key={review.id}>
                            <ReviewCard review={review} />
                        </View>

                    ))
                }
            </View>

            {/* <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
            > */}
            {/* <FlatList
                data={reviews}
                renderItem={({ item }) => <ReviewCard review={item} />}
                keyExtractor={item => item.id.toString()}
                className="mt-4"
                ItemSeparatorComponent={() => <View className="border-t border-gray-200" />}
                ListFooterComponent={() => (
                    <TouchableOpacity activeOpacity={0.5}
                        className="mb-6 p-2 "
                        onPress={() => navigation.navigate('Review', {
                            productId: product.id
                        })}>
                        <Text className="text-center text-base text-blue-600">Xem tất cả 119 đánh giá</Text>
                    </TouchableOpacity>
                )}
            /> */}
            {/* </ScrollView> */}

            <TouchableOpacity activeOpacity={0.5}
                className="mb-6 p-2 "
                onPress={() => navigation.navigate('Review', {
                    productId
                })}>
                <Text className="text-center text-base text-blue-600">Xem tất cả 119 đánh giá</Text>
            </TouchableOpacity>



        </>
    )
}

export default Review;