import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ReviewAdd from '../components/review/ReviewAdd';
import { Button } from '@rneui/themed';

const ReviewAddScreen = ({ navigation, route }) => {
    const { orderId } = route.params;
    const [data, setData] = useState(null); // State để lưu dữ liệu từ API
    const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái loading
    const [error, setError] = useState(null); // State để lưu thông báo lỗi

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch('https://api.example.com/products'); // Thay thế URL bằng API của bạn
                // const result = await response.json();
                const result = require('../data/reviewAdd.json'); // Sử dụng dữ liệu mẫu
                setData(result); // Lưu dữ liệu vào state
            } catch (error) {
                setError(error); // Lưu lỗi nếu có
            } finally {
                setLoading(false); // Đánh dấu là đã tải xong
            }
        };

        fetchData(); // Gọi hàm fetch dữ liệu
    }, []); // Chỉ chạy một lần khi component mount

    if (loading) {
        return <Text>Loading...</Text>; // Hiển thị loading
    }

    if (error) {
        return <Text>Error: {error.message}</Text>; // Hiển thị thông báo lỗi
    }

    // Khởi tạo giá trị ban đầu cho review và rating
    const initialValues = data.products.reduce((acc, product) => {
        acc[product.id] = { review: '', rating: 5 }; // Default rating là 5 sao
        return acc;
    }, {});

    // Validation schema cho cả review và rating
    const validationSchema = Yup.object().shape(
        data.products.reduce((acc, product) => {
            acc[product.id] = Yup.object({
                review: Yup.string().required('Bình luận là bắt buộc'),
                rating: Yup.number().required('Đánh giá là bắt buộc'),
                // images: Yup.array().of(Yup.string().url()).max(3, 'Tối đa 3 ảnh'),
            });
            return acc;
        }, {})
    );

    const handleSubmit = (values) => {
        console.log('Submitted Reviews:', values);
        // Xử lý logic gửi đánh giá ở đây
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <View className="bg-white">
                    <FlatList
                        data={data.products} // Sử dụng dữ liệu từ API
                        renderItem={({ item }) => (
                            <ReviewAdd
                                item={item}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                values={values}
                                errors={errors}
                                touched={touched}
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
    );
};

export default ReviewAddScreen;
