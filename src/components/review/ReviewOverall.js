import { Text, View } from "react-native";
import * as Progress from 'react-native-progress';
import { Rating } from 'react-native-ratings';
import { formatNumber } from "../../utils/FormatNumber";

const ReviewOverall = ({ overallReview }) => {

    const getLabelForRate = (rate) => {
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
                return "Rất hài lòng";
        }
    };

    return (

        <View className="bg-white pt-1 pb-4">
            <View className="flex-row items-center gap-x-3 mt-1 px-4">
                <Text className="text-xl font-bold">{overallReview?.averageRate?.toFixed(1)}</Text>
                <Rating
                    type="star"
                    startingValue={overallReview?.averageRate}
                    readonly={true}
                    imageSize={20}
                />
                <Text className="text-sm text-gray-600">{formatNumber(overallReview?.totalReview)} Đánh giá</Text>
            </View>

            <View className="items-center ">
                <View>
                    {
                        overallReview?.rateDetail?.map((rate, index) => (
                            <View key={index} className="flex-row items-center gap-x-2">
                                <Text className="text-sm text-black w-28">{getLabelForRate(rate?.rate)}</Text>
                                <Progress.Bar progress={rate?.rateQuantity / overallReview?.totalReview} width={150} color="#FFB547" />
                                <Text className="text-sm text-gray-600">{rate?.rateQuantity}</Text>
                            </View>
                        ))
                    }
                </View>
            </View>
        </View>


    )
}

export default ReviewOverall;