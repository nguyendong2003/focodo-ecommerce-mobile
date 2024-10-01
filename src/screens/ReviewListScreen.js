import React, { useEffect, useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import result from '../data/reviews.json'
import ReviewCard from '../components/review/ReviewCard';

const ReviewListScreen = ({ navigation }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // call api
        const reviewsCallAPI = result.reviews;

        setReviews(reviewsCallAPI);
    }, []);

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewCard review={item} />}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="border-t-2 border-gray-400" />}
        // ListHeaderComponent={() => <ReviewOverall overallReview={overallReview} />}
        />
    );
};

export default ReviewListScreen;