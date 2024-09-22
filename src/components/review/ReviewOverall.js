import { Text, View } from "react-native";
import * as Progress from 'react-native-progress';
import { Rating } from 'react-native-ratings';

const ReviewOverall = ({ review }) => {
    return (
        <View>
            <View className="flex-row items-center gap-x-3 mt-1 px-4">
                <Text className="text-3xl font-bold">4.8</Text>
                <Rating
                    type="star"
                    startingValue={4.8}
                    readonly={true}
                    imageSize={20}
                />
                <Text className="text-sm text-gray-600">{new Intl.NumberFormat('vi-VN').format(2050)} Đánh giá</Text>
            </View>

            <View className="items-center mt-1">
                <View>
                    <View className="flex-row items-center gap-x-2">
                        <Text className="text-sm text-black w-20">Rất hài lòng</Text>
                        <Progress.Bar progress={0.9} width={150} color="#FFB547" />
                        <Text className="text-sm text-gray-600">1831</Text>
                    </View>
                    <View className="flex-row items-center gap-x-2">
                        <Text className="text-sm  text-black w-20">Hài lòng</Text>
                        <Progress.Bar progress={0.5} width={150} color="#FFB547" />
                        <Text className="text-sm text-gray-600">1000</Text>
                    </View>
                    <View className="flex-row items-center gap-x-2">
                        <Text className="text-sm  text-black w-20">Bình thường</Text>
                        <Progress.Bar progress={0.3} width={150} color="#FFB547" />
                        <Text className="text-sm text-gray-600">200</Text>
                    </View>
                    <View className="flex-row items-center gap-x-2">
                        <Text className="text-sm  text-black w-20">Tệ</Text>
                        <Progress.Bar progress={0.2} width={150} color="#FFB547" />
                        <Text className="text-sm text-gray-600">10</Text>
                    </View>
                    <View className="flex-row items-center gap-x-2">
                        <Text className="text-sm  text-black w-20">Rất tệ</Text>
                        <Progress.Bar progress={0.05} width={150} color="#FFB547" />
                        <Text className="text-sm text-gray-600">5</Text>
                    </View>
                </View>
            </View>
        </View>

    )
}

export default ReviewOverall;