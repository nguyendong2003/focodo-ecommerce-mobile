import { View, Image, Text } from 'react-native';
import { Rating } from 'react-native-ratings';

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
const ReviewCard = ({ review }) => {
    return (
        <View className="gap-y-1 p-3">
            <View className="flex-row gap-x-1 items-center">
                <Image
                    // source={require('../../static/images/products/1.png')} 
                    source={{ uri: review.user.avatar }}

                    className="w-9 h-9 rounded-full" />
                <View>
                    <Text className="text-black text-base font-bold">{review.user.name}</Text>
                    <Text className="text-gray-600 text-sm">{review.time}</Text>
                </View>
            </View>
            <View className="flex-row gap-x-3 mx-8 items-center">
                <Rating
                    type="star"
                    startingValue={review.rate}
                    readonly={true}
                    imageSize={18}
                />
                <Text className="text-gray-500 font-bold text-base">{getReviewText(review.rate)}</Text>
            </View>

            <Text className="text-gray-600 text-sm">{review.comment}</Text>
        </View>
    )
}

export default ReviewCard;