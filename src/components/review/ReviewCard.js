import { View, Image, Text, Dimensions } from 'react-native';
import { Rating } from 'react-native-ratings';

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
const ReviewCard = ({ review }) => {
    return (
        <View className="gap-y-1 p-3 pt-1 bg-white border-t-2 border-t-gray-100">
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

            <View>
                <Text className="text-gray-700 text-sm">{review.comment}</Text>
            </View>

            {
                review.images && (
                    <View className="flex-row flex-wrap gap-2">
                        {
                            review.images.map((image, index) => (
                                <Image
                                    key={image.id}
                                    // source={require('../../static/images/products/1.png')} 
                                    source={{ uri: image.url }}
                                    className="rounded-md"
                                    style={{ width: width / 3 - 14, height: width / 3 - 14 }}
                                />
                            ))
                        }
                    </View>
                )
            }

        </View>
    )
}

export default ReviewCard;