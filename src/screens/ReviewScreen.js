import React, { useEffect, useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import ReviewOverall from '../components/review/ReviewOverall';
import result from '../data/reviews.json'
import ReviewCard from '../components/review/ReviewCard';

const ReviewScreen = ({ navigation, productId }) => {
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
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewCard review={item} />}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="border-t border-gray-200" />}
            ListHeaderComponent={() => <ReviewOverall overallReview={overallReview} />}
        />
    );
};

export default ReviewScreen;