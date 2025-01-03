import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Alert, ScrollView, TouchableOpacity, Image, Dimensions, TextInput, RefreshControl } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { AirbnbRating } from 'react-native-ratings';
import { Button, Icon } from '@rneui/themed';
import { callFetchReviewById, callUpdateReview } from '../services/api';
import { ReviewContext } from '../components/context/ReviewProvider';
import Toast from 'react-native-toast-message';

const screenWidth = Dimensions.get('window').width;

const ReviewUpdateScreen = ({ navigation, route }) => {
    const { reviewContextValue, setReviewContextValue } = useContext(ReviewContext);
    const { reviewId } = route.params;
    const [review, setReview] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchReviewById = async (reviewId) => {
        setLoading(true);
        const res = await callFetchReviewById(reviewId);
        if (res && res.result) {
            const data = res.result
            const dataReview = {
                id: data.id,
                time: data.date,
                rate: data.rating,
                comment: data.content,
                user: {
                    id: data.user.id,
                    name: data.user.full_name,
                    avatar: data.user.avatar ? data.user.avatar : null,
                },
                images: data.images,
                product: data.product
            }
            setReview(dataReview);
        }
        setLoading(false)
    }

    const handleRefresh = () => {
        setRefreshing(true);
        fetchReviewById(reviewId);
        setRefreshing(false);
    };


    useEffect(() => {
        fetchReviewById(reviewId);
    }, [reviewId]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if (!hasUnsavedChanges) {
                // Nếu không có thay đổi chưa lưu, không cần làm gì
                return;
            }

            // Ngăn chặn hành động mặc định (rời khỏi màn hình)
            e.preventDefault();

            // Hiển thị thông báo xác nhận
            Alert.alert(
                'Xác nhận rời khỏi',
                'Bạn có thay đổi chưa được lưu. Bạn có chắc chắn muốn hủy bỏ chúng và rời khỏi màn hình không?',
                [
                    { text: "Không", style: 'cancel', onPress: () => { } },
                    {
                        text: 'Đồng ý',
                        style: 'destructive',
                        // Nếu người dùng xác nhận, tiếp tục hành động bị chặn trước đó
                        onPress: () => navigation.dispatch(e.data.action),
                    },
                ]
            );
        });

        return unsubscribe;
    }, [navigation, hasUnsavedChanges]);

    if (loading) {
        return <Text>Loading...</Text>; // Hiển thị loading
    }

    if (error) {
        return <Text>Error: {error.message}</Text>; // Hiển thị thông báo lỗi
    }

    const initialValues = {
        review: review.comment,
        rating: review.rate,
        images: review.images || [],
        files: review.files || []
        // images: review.images ? review.images?.map(image => image.url) : []

    };

    const validationSchema = Yup.object().shape({
        review: Yup.string().required('Bình luận là bắt buộc'),
        rating: Yup.number().required('Đánh giá là bắt buộc'),
        // images: Yup.array().of(Yup.string().url()).max(3, 'Tối đa 3 ảnh'),
    });

    // Upload avatar
    const handlePickImage = async (setFieldValue, values) => {
        const remainingImages = 5 - values.images.length - values.files.length;
        if (remainingImages <= 0) {
            Toast.show({
                type: 'error',
                text1: 'Thất bại',
                text2: 'Bạn chỉ có thể chọn tối đa 5 ảnh',
            });
            // Alert.alert('Thông báo', 'Bạn chỉ có thể chọn tối đa 5 ảnh.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
            allowsMultipleSelection: true,
            selectionLimit: remainingImages,
        });

        if (!result.canceled) {
            // const selectedImages = result.assets.map(asset => asset.uri);
            const selectedImages = result.assets.map(asset => ({
                uri: asset.uri,
                type: asset.type || 'image/jpeg', // Default to 'image/jpeg' if type is not provided
                name: asset.uri.split('/').pop(), // Extract the file name from the URI
            }));
            const newImages = [...values.files, ...selectedImages];
            setFieldValue('files', newImages);
            setHasUnsavedChanges(true);
        }
    };

    const handleRemoveImage = (index, setFieldValue, values) => {
        setFieldValue('images', values.images.filter((_, i) => i !== index));
    };

    const handleRemoveFile = (index, setFieldValue, values) => {
        setFieldValue('files', values.files.filter((_, i) => i !== index));
    };

    const handleSubmit = async (values) => {
        setHasUnsavedChanges(false);

        // const updatedReview = {
        //     ...review,
        //     comment: values.review,
        //     rate: values.rating,
        //     images: values.images,
        //     files: values.files
        //     // images: values.images.map((url, index) => ({ id: index + 1, url }))
        // };

        const updatedReview = {
            id: review.id,
            review: {
                content: values.review,
                rating: values.rating,
                id_product: review.product.id,
            },
            images: values.images,
            files: values.files
        };

        // console.log('Updated Review:', updatedReview);

        const res = await callUpdateReview(updatedReview);
        // console.log('Response:', res);

        if (res && res.result) {
            const data = res.result
            const dataReview = {
                id: data.id,
                time: data.date,
                rate: data.rating,
                comment: data.content,
                user: {
                    id: data.user.id,
                    name: data.user.full_name,
                    avatar: data.user.avatar ? data.user.avatar : null,
                },
                images: data.images,
                product: data.product
            }
            // const files = values.files.map(file => (file.uri));
            // const dataReview = {
            //     ...review,
            //     rate: values.rating,
            //     comment: values.review,
            //     images: [
            //         ...values.images,
            //         ...files
            //     ]
            // }
            setReviewContextValue(dataReview)
            navigation.goBack();
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: 'Cập nhật đánh giá thành công',
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Thất bại',
                text2: 'Cập nhật đánh giá thất bại',
            });
        }
    };

    return (
        <ScrollView className="flex-1 bg-white"
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            }
        >

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                    <View className="bg-white">
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="flex-row bg-blue-200 rounded-md gap-x-2 p-2"
                            onPress={() => navigation.navigate('ProductDetail', { productId: review.product.id })}
                        >
                            <Image
                                source={{ uri: review.product?.image }}
                                className="rounded-lg w-12 h-12"
                            />
                            <Text className="text-gray-600 text-sm font-semibold shrink leading-5 p-1" numberOfLines={2}>{review.product?.name}</Text>
                        </TouchableOpacity>

                        <AirbnbRating
                            count={5}
                            reviews={["Rất tệ", "Tệ", "Trung bình", "Tốt", "Rất tốt"]}
                            defaultRating={values.rating}
                            size={28}
                            reviewSize={16}
                            starContainerStyle={{ margin: -8 }}
                            onFinishRating={(rating) => setFieldValue('rating', rating)}
                        />
                        {/* Nút upload hình ảnh */}
                        <View className="items-center">
                            <TouchableOpacity
                                activeOpacity={0.7}
                                className="flex-row justify-center items-center gap-x-1 rounded-md border-2 border-gray-600 p-1 mt-5"
                                onPress={() => handlePickImage(setFieldValue, values)}
                            >
                                <Icon type='antdesign' name='camerao' />
                                <Text className="text-center text-black text-base">Chọn hình ảnh</Text>
                            </TouchableOpacity>
                        </View>


                        {/* Hiển thị hình ảnh đã upload */}
                        <View className="flex-row flex-wrap mt-2 px-2">
                            {values.images && values.images.map((uri, index) => (
                                <View key={index} className="relative m-1"
                                    style={{ width: screenWidth / 3 - 14, height: screenWidth / 3 - 14 }}
                                >
                                    <Image source={{ uri }} className="w-full h-full rounded-md" />
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        className="absolute top-0 right-0 rounded-full w-6 h-6 flex items-center justify-center"
                                        onPress={() => handleRemoveImage(index, setFieldValue, values)}
                                    >
                                        <Icon type='antdesign' name='close' color='white' />
                                    </TouchableOpacity>
                                </View>
                            ))}

                            {values.files && values.files.map((file, index) => (
                                <View key={index} className="relative m-1"
                                    style={{ width: screenWidth / 3 - 14, height: screenWidth / 3 - 14 }}
                                >
                                    <Image source={{ uri: file.uri }} className="w-full h-full rounded-md" />
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        className="absolute top-0 right-0 rounded-full w-6 h-6 flex items-center justify-center"
                                        onPress={() => handleRemoveFile(index, setFieldValue, values)}
                                    >
                                        <Icon type='antdesign' name='close' color='white' />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>

                        {/* TextInput cho nội dung đánh giá */}
                        <View className="p-3">
                            <TextInput
                                className={`rounded-md border-2 p-2 text-base h-36 max-h-36 ${errors.review && touched.review ? 'border-red-500' : 'border-gray-300'}`} style={{ textAlignVertical: 'top' }}
                                placeholder="Hãy chia sẻ nhận xét cho sản phẩm này!"
                                multiline={true}
                                numberOfLines={5}
                                returnKeyType='done'
                                onChangeText={handleChange('review')}
                                onBlur={handleBlur('review')}
                                value={values.review}
                            />
                            <View className="h-6 flex-row justify-between">
                                {errors.review && touched.review && (
                                    <Text className="text-sm text-red-500 font-bold">{errors.review}</Text>
                                )}
                                <Text className="text-right text-gray-400 mr-3 grow">{values.review?.length}/500</Text>
                            </View>

                            {touched.rating && errors.rating && (
                                <Text className="text-sm text-red-500 font-bold">{errors.rating}</Text>
                            )}
                        </View>

                        <View className="p-3 rounded-md mb-3">
                            <Button title="Xác nhận" color={'black'} onPress={handleSubmit} />
                        </View>
                    </View>
                )}
            </Formik>

        </ScrollView>
    );
};

export default ReviewUpdateScreen;
