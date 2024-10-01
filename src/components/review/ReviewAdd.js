import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

const ReviewAdd = ({ item, handleChange, handleBlur, setFieldValue, values, errors, touched }) => {
    const hasError = touched[item.id]?.review && errors[item.id]?.review;

    return (
        <View>
            <View className="flex-row bg-slate-100 rounded-md gap-x-2 p-2">
                <Image
                    source={{ uri: item.image }}
                    className="rounded-lg w-12 h-12"
                />
                <Text className="text-gray-600 text-sm font-semibold shrink leading-5 p-1" numberOfLines={2}>{item.name}</Text>
            </View>

            {/* Component AirbnbRating */}
            <AirbnbRating
                count={5}
                reviews={["Rất tệ", "Tệ", "Trung bình", "Tốt", "Rất tốt"]}
                defaultRating={values[item.id].rating} // Giá trị hiện tại của rating
                size={28}
                reviewSize={16}
                onFinishRating={(rating) => setFieldValue(`${item.id}.rating`, rating)} // Lưu giá trị rating
            />

            {/* TextInput cho nội dung đánh giá */}
            <View className="p-3">
                <TextInput
                    className={`rounded-md border-2 p-2 text-base ${hasError ? 'border-red-500' : 'border-gray-300'}`}
                    style={{ textAlignVertical: 'top' }}
                    placeholder="Hãy chia sẻ nhận xét cho sản phẩm này!"
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={handleChange(`${item.id}.review`)} // Sử dụng product.id.review
                    onBlur={handleBlur(`${item.id}.review`)} // Sử dụng product.id.review
                    value={values[item.id].review} // Giá trị của review
                />
                {/* <Text className="text-right text-gray-400 mr-3">{values[item.id].review.length}/500</Text> */}
                {/* Hiển thị lỗi nếu có */}
                <View className="h-6 flex-row justify-between">
                    {hasError && (
                        <Text className="text-sm text-red-500 font-bold">{errors[item.id].review}</Text>
                    )}
                    <Text className="text-right text-gray-400 mr-3 grow">{values[item.id].review.length}/500</Text>
                </View>

                {touched[item.id]?.rating && errors[item.id]?.rating && (
                    <Text className="text-sm text-red-500 font-bold">{errors[item.id].rating}</Text>
                )}
            </View>
        </View>
    );
};

export default ReviewAdd;
