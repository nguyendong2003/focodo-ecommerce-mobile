import { Icon } from '@rneui/themed';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Rating } from 'react-native-ratings';
import { formatDateTime } from '../../utils/FormatNumber';
import { ReviewContext } from '../context/ReviewProvider';
import { callDeleteReview } from '../../services/api';

const { width, height } = Dimensions.get('window');

const getReviewText = (rate) => {
    switch (rate) {
        case 5:
            return "Rất hài lòng";
        case 4:
            return "Hài lòng";
        case 3:
            return "Bình thường";
        case 2:
            return "Tệ";
        case 1:
            return "Rất tệ";
        default:
            return "Không có đánh giá";
    }
};
const ReviewCard = ({ navigation, review, isEditable = false, isProductVisible = false }) => {
    const { reviewContextValue, setReviewContextValue } = useContext(ReviewContext);
    const [reviewItem, setReviewItem] = useState(review);
    const [isDeleted, setIsDeleted] = useState(false);
    const isFirstRender = useRef(true);


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; // Set to false after the first render
            return; // Exit the effect early on the first render
        }

        if (reviewContextValue?.id === reviewItem?.id && reviewContextValue?.isDeleted) {
            setIsDeleted(true);
        }
        else if (reviewContextValue?.id === reviewItem?.id) {
            setReviewItem(reviewContextValue)
        }
    }, [reviewContextValue])

    const handleDeleteReview = async () => {
        const res = await callDeleteReview(reviewItem.id);
        if (res && res.result) {
            Alert.alert('Thông báo', 'Xóa đánh giá thành công');
            setReviewContextValue({
                id: reviewItem.id,
                isDeleted: true
            })
        } else {
            Alert.alert('Thông báo', 'Xóa đánh giá thất bại');
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc chắn muốn xóa đánh giá này không?',
            [
                { text: 'Không', style: 'cancel' },
                { text: 'Xác nhận', onPress: handleDeleteReview },
            ],
            { cancelable: true }
        );
    };

    if (isDeleted) {
        return null; // Do not render the component if it is deleted
    }

    return (
        <>
            <View className="gap-y-1 p-3 pt-1 bg-white border-t-2 border-t-gray-100">
                <View className="flex-row gap-x-1 items-center shrink">
                    {
                        reviewItem.user.avatar ? (
                            <Image
                                source={{ uri: reviewItem.user.avatar }}
                                className="w-9 h-9 rounded-full" />
                        ) : (
                            <Icon type="octicon" name="smiley" size={36} color={'#2563eb'} />
                        )
                    }

                    <View className="grow flex-row justify-between items-center ">
                        <View className="shrink">
                            <Text className="text-black text-base font-bold" numberOfLines={1}>{reviewItem.user.name}</Text>
                            <Text className="text-gray-600 text-sm" numberOfLines={1}>
                                {formatDateTime(reviewItem.time)}
                            </Text>
                        </View>

                        {
                            isEditable && (
                                <View className="flex-row gap-x-3">
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={confirmDelete}
                                    >
                                        <Icon type='feather' name='trash-2' color={'#ef4444'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => navigation.navigate('ReviewUpdate', { reviewId: reviewItem.id })}
                                    >
                                        <Icon type='feather' name='edit' color={'#eab308'} />
                                    </TouchableOpacity>
                                </View>


                                // <TouchableOpacity activeOpacity={0.7}
                                //     className="rounded-md  border-black border-2 justify-center px-4 py-1"
                                //     onPress={() => navigation.navigate('ReviewUpdate', { reviewId: reviewItem.id })}
                                // >
                                //     <Text className="text-center text-black font-bold">Sửa</Text>
                                // </TouchableOpacity>
                            )
                        }
                    </View>

                </View>
                <View className="flex-row gap-x-3 mx-8 items-center">
                    <Rating
                        type="star"
                        startingValue={reviewItem.rate}
                        readonly={true}
                        imageSize={18}
                    />
                    <Text className="text-gray-500 font-bold text-base">{getReviewText(reviewItem.rate)}</Text>
                </View>

                <View>
                    <Text className="text-gray-700 text-sm">{reviewItem.comment}</Text>
                </View>

                <View>
                    {
                        reviewItem.images && (
                            <View className="flex-row flex-wrap gap-2">
                                {
                                    reviewItem.images.map((image, index) => (
                                        <Image
                                            key={index}
                                            source={{ uri: image }}
                                            className="rounded-md"
                                            style={{ width: width / 3 - 14, height: width / 3 - 14 }}
                                        />
                                    ))
                                }
                            </View>
                        )
                    }
                </View>
            </View>

            {
                isProductVisible && (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="flex-row bg-gray-200 rounded-md gap-x-2 p-2 mx-3 mb-5"
                        onPress={() => navigation.navigate('ProductDetail', { productId: reviewItem?.product?.id })}
                    >
                        <Image
                            source={{ uri: reviewItem?.product?.image }}
                            className="rounded-lg w-12 h-12"
                        />
                        <Text className="text-gray-600 text-sm font-semibold shrink leading-5 p-1" numberOfLines={2}>{reviewItem?.product?.name}</Text>
                    </TouchableOpacity>
                )
            }
        </>
    )
}

export default memo(ReviewCard);