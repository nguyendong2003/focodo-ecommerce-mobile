import React from 'react';
import { View, Text, Image, TextInput, LogBox, TouchableOpacity, Dimensions } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from '@rneui/themed';

const screenWidth = Dimensions.get('window').width;

// Bỏ qua cảnh báo về defaultProps
LogBox.ignoreLogs([
    'Warning: Star: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
    'Warning: TapRating: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
]);

const ReviewAdd = ({ navigation, item, handleChange, handleBlur, setFieldValue, values, errors, touched, setHasUnsavedChanges }) => {
    const hasError = touched[item.id]?.review && errors[item.id]?.review;

    // Upload avatar
    const handlePickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            // allowsEditing: true,
            quality: 1,
            allowsMultipleSelection: true,
            selectionLimit: 5,
        });

        if (!result.canceled) {
            const selectedImages = result.assets.map(asset => asset.uri);
            const currentImages = values[item.id].images || [];
            const newImages = [...currentImages, ...selectedImages]
            setFieldValue(`${item.id}.images`, newImages);
            setHasUnsavedChanges(true);
        }
    };

    // Xóa ảnh đã chọn
    const handleRemoveImage = (index) => {
        const currentImages = values[item.id].images || [];
        const newImages = currentImages.filter((_, i) => i !== index);
        if (newImages.length === 0) {
            // Xóa khóa images nếu mảng trống
            const { [item.id]: { images, ...restItem }, ...restValues } = values;
            setFieldValue(item.id, { ...restItem });
        } else {
            setFieldValue(`${item.id}.images`, newImages);
        }
        setHasUnsavedChanges(true);
    };

    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.7}
                className="flex-row bg-blue-200 rounded-md gap-x-2 p-2"
                onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            >
                <Image
                    source={{ uri: item.image }}
                    className="rounded-lg w-12 h-12"
                />
                <Text className="text-gray-600 text-sm font-semibold shrink leading-5 p-1" numberOfLines={2}>{item.name}</Text>
            </TouchableOpacity>

            {/* Component AirbnbRating */}
            <AirbnbRating
                count={5}
                reviews={["Rất tệ", "Tệ", "Trung bình", "Tốt", "Rất tốt"]}
                defaultRating={values[item.id].rating} // Giá trị hiện tại của rating
                size={28}
                reviewSize={16}
                starContainerStyle={{ margin: -8 }}
                onFinishRating={(rating) => setFieldValue(`${item.id}.rating`, rating)} // Lưu giá trị rating
            />
            {/* Nút upload hình ảnh */}
            <View className="items-center">
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row justify-center items-center gap-x-1 rounded-md border-2 border-gray-600 p-1 mt-5"
                    onPress={handlePickImage}
                >
                    <Icon type='antdesign' name='camerao' />
                    <Text className="text-center text-black text-base">Chọn hình ảnh</Text>

                </TouchableOpacity>
            </View>


            {/* Hiển thị hình ảnh đã upload */}
            <View className="flex-row flex-wrap mt-2 px-2">
                {values[item.id].images && values[item.id].images.map((uri, index) => (
                    <View key={index} className="relative m-1"
                        style={{ width: screenWidth / 3 - 14, height: screenWidth / 3 - 14 }}
                    >
                        <Image source={{ uri }} className="w-full h-full rounded-md" />
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="absolute top-0 right-0 rounded-full w-6 h-6 flex items-center justify-center"
                            onPress={() => handleRemoveImage(index)}
                        >
                            <Icon type='antdesign' name='close' color='white' />
                            {/* <Text className="text-white text-xs">x</Text> */}
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {/* TextInput cho nội dung đánh giá */}
            <View className="p-3">
                <TextInput
                    className={`rounded-md border-2 p-2 text-base h-36 max-h-36 ${hasError ? 'border-red-500' : 'border-gray-300'}`}
                    style={{ textAlignVertical: 'top' }}
                    placeholder="Hãy chia sẻ nhận xét cho sản phẩm này!"
                    multiline={true}
                    numberOfLines={5}
                    returnKeyType='done'
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
