import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ReviewAdd from '../components/review/ReviewAdd';
import { Button } from '@rneui/themed';
import { OrderContext } from '../components/context/OrderProvider';
import { callCreateReview, callFetchOrderById } from '../services/api';

const screenWidth = Dimensions.get('window').width;

const ReviewAddScreen = ({ navigation, route }) => {
    const { orderContextValue, setOrderContextValue } = useContext(OrderContext);
    const { orderId } = route.params;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrder = async () => {
        setLoading(true);
        const res = await callFetchOrderById(orderId);
        if (res && res.result) {
            const dataAPI = res.result;
            const orderId = dataAPI?.id_order;
            const products = dataAPI?.order_details?.map((item) => ({
                id: item?.product?.id,
                name: item?.product?.name,
                image: item?.product?.image,
            }));
            setData({ orderId, products });
        } else {
            Alert.alert('Error', 'Failed to fetch order');
        }
        setLoading(false);
    }

    const handleRefresh = () => {
        setRefreshing(true);
        fetchOrder();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchOrder();
    }, []);

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

    // Khởi tạo giá trị ban đầu cho review và rating
    const initialValues = data?.products?.reduce((acc, product) => {
        acc[product.id] = { review: '', rating: 5 }; // Default rating là 5 sao
        return acc;
    }, {});

    // Validation schema cho cả review và rating
    const validationSchema = Yup.object().shape(
        data?.products?.reduce((acc, product) => {
            acc[product.id] = Yup.object({
                review: Yup.string().required('Bình luận là bắt buộc'),
                rating: Yup.number().required('Đánh giá là bắt buộc'),
                // images: Yup.array().of(Yup.string().url()).max(3, 'Tối đa 3 ảnh'),
            });
            return acc;
        }, {})
    );

    const handleSubmit = async (values) => {
        setHasUnsavedChanges(false); // Đánh dấu là không còn thay đổi chưa lưu
        // Chuyển đổi values thành mảng các object với key được thêm vào value tương ứng
        // const reviewsArray = Object.entries(values).map(([key, value]) => ({
        //     productId: key,
        //     ...value
        // }));
        const reviewsArray = Object.entries(values).map(([key, value]) => {
            const review = {
                id_product: parseInt(key),
                rating: value.rating,
                content: value.review
            }

            const images = value.images || [];

            return { id_order: orderId, review, images, };
        });

        // console.log('Reviews Array:', reviewsArray);

        const res = await callCreateReview(reviewsArray);
        console.log('Response:', res);

        // Check if all responses have status 200 and a valid result
        const allSuccess = res.every(res => res.code === 0 && res.result);

        if (allSuccess) {
            Alert.alert('Thông báo', 'Thêm đánh giá thành công');
            setOrderContextValue((prev) => {
                return { ...prev, id: orderId, status: 'Đã đánh giá' }
            })
            navigation.goBack()
        }
        else {
            Alert.alert('Thông báo', 'Có lỗi khi thêm đánh giá');
        }
    };

    return (
        <ScrollView className="flex-1"
            horizontal
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            }
            contentContainerStyle={{ width: screenWidth }}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true} // Cho phép cập nhật giá trị ban đầu

            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                    <View className="flex-1">
                        <FlatList
                            data={data.products} // Sử dụng dữ liệu từ API
                            renderItem={({ item }) => (
                                <ReviewAdd
                                    navigation={navigation}
                                    item={item}
                                    handleChange={(field) => (value) => {
                                        handleChange(field)(value);
                                        setHasUnsavedChanges(true); // Đánh dấu là có thay đổi chưa lưu
                                    }}
                                    handleBlur={handleBlur}
                                    setFieldValue={setFieldValue}
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    setHasUnsavedChanges={setHasUnsavedChanges}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            ListFooterComponent={() =>
                                <View className="p-3 rounded-md mb-3">
                                    <Button title="Xác nhận" color={'black'} onPress={handleSubmit} />
                                </View>
                            }
                            ItemSeparatorComponent={() => <View className="border-t-2 border-slate-200" />}
                        />
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
};

export default ReviewAddScreen;
