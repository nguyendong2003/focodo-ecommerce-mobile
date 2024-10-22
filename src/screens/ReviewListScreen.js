import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import result from '../data/reviews.json'
import { useEffect, useState } from 'react';
import { callFetchReviews } from '../services/api';
import { Icon } from '@rneui/themed';
import ReviewCard from '../components/review/ReviewCard';

const ReviewListScreen = ({ navigation }) => {
    const [reviews, setReviews] = useState([])
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isFetching, setIsFetching] = useState(false); // Add a flag to prevent multiple API calls

    const fetchReviewsOfUser = async (currentPage) => {
        setIsFetching(true); // Set fetching flag to true
        const res = await callFetchReviews(currentPage, size);
        if (res && res.result) {
            const reviewsData = res.result?.data?.map((item) => {
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

            if (currentPage === 0) {
                setReviews(reviewsData);
            } else {
                setReviews(prev => [...prev, ...reviewsData]);
            }

            setPage(res.result.pagination.current_page);
            setTotalPage(res.result.pagination.total_pages);
        }
        setIsFetching(false); // Set fetching flag to false
    };

    const handleFetchMoreReviews = async () => {
        if (page < totalPage && !isFetching) {
            setIsLoadingMore(true);
            await fetchReviewsOfUser(page + 1);
            setIsLoadingMore(false);
        }
    };

    const handleRefreshing = async () => {
        setRefreshing(true);
        await fetchReviewsOfUser(0);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchReviewsOfUser(0);
    }, []);

    return (
        <View className="flex-1 bg-white">
            <FlatList
                data={reviews}
                renderItem={({ item }) => <ReviewCard navigation={navigation} review={item} isEditable={true} isProductVisible={true}/>}
                keyExtractor={(item, index) => `all_reviews_${item.id}_${index}`}
                key={'all_reviews'}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="bg-gray-700 h-1" />}
                ListEmptyComponent={() => (
                    <View className="flex-1 items-center justify-center bg-white">
                        <Icon type="octicon" name="checklist" size={48} color="#ccc" />
                        <Text className="text-gray-500 text-lg mt-2">Đánh giá trống</Text>
                    </View>
                )}
                contentContainerStyle={{ flexGrow: 1 }}

                onEndReachedThreshold={0.2} // Load more when 20% of the list is reached
                onEndReached={handleFetchMoreReviews}
                ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" color="#ccc" /> : null}
                refreshing={refreshing}
                onRefresh={handleRefreshing}

            />
        </View>
    );
};

export default ReviewListScreen;