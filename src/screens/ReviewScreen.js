import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import ReviewOverall from '../components/review/ReviewOverall';
import ReviewCard from '../components/review/ReviewCard';
import { callFetchProductById, callFetchReviewsByProductId } from '../services/api';

const ReviewScreen = ({ navigation, route }) => {
    const [productId, setProductId] = useState(route.params.productId);
    const [overallReview, setOverallReview] = useState({});
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [totalPage, setTotalPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchProductById = async () => {
        const res = await callFetchProductById(productId);
        if (res && res.result) {
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

    const fetchReviews = async (currentPage) => {
        const res = await callFetchReviewsByProductId(productId, currentPage, size);
        if (res && res.result) {
            const dataReviews = res.result.data.map((item) => {
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
            setPage(res.result.pagination.current_page);
            setTotalPage(res.result.pagination.total_pages);
            if (currentPage === 0) {
                setReviews(dataReviews);
            } else {
                setReviews(prevReviews => [...prevReviews, ...dataReviews]);
            }
        }
    }

    const handleFetchMoreReviews = async () => {
        if (page < totalPage) {
            setIsLoadingMore(true);
            await fetchReviews(page + 1);
            setIsLoadingMore(false);
        }
    }

    const handleRefreshing = async () => {
        setRefreshing(true);
        await fetchReviews(0);
        setRefreshing(false);
    }

    useEffect(() => {
        if (productId) {
            fetchProductById();
            fetchReviews(0);
        }
    }, [productId]);

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewCard navigation={navigation} review={item} />}
            keyExtractor={item => 'review_' + item.id.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="border-t-2 border-gray-400" />}
            ListHeaderComponent={() => <ReviewOverall overallReview={overallReview} />}
            onEndReachedThreshold={0.5}
            onEndReached={handleFetchMoreReviews}
            ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" color="#ccc" /> : null}
            refreshing={refreshing}
            onRefresh={handleRefreshing}
        />
    );
};

export default ReviewScreen;