import React, { useEffect, useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import result from '../data/reviews.json'
import ReviewCard from '../components/review/ReviewCard';
import { callFetchReviewsByOrderId } from '../services/api';

const ReviewOrderScreen = ({ navigation, route }) => {
    const { orderId } = route.params;
    const [reviews, setReviews] = useState([]);

    const fetchReviewsByOrderId = async(orderId) => {
        const res = await callFetchReviewsByOrderId(orderId);
        if (res && res.result) {
            const dataReviews = res.result?.map((item) => {
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
                    images: item.images,
                    product: item.product
                }
            })
            setReviews(dataReviews);
        }
    }

    useEffect(() => {
        fetchReviewsByOrderId(orderId);
    }, [orderId]);

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewCard navigation={navigation} review={item} isEditable={true} />}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="border-t-2 border-gray-400" />}
        />
    );
};

export default ReviewOrderScreen;