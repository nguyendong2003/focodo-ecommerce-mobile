import { LogBox, StyleSheet, View } from "react-native";
import BaseLayout from "../../layout/BaseLayout";
import { Button, Icon, Image, Text, Divider } from "@rneui/themed";
import imageMap from "../../components/ImageMap";
import result from '../fakedata/product.json'
import { Dimensions } from "react-native";
import { TextInput } from "react-native";
import { useState } from "react";
import * as Progress from 'react-native-progress';
import { Rating, AirbnbRating } from 'react-native-ratings';

const screenWidth = Dimensions.get('window').width;

// Bỏ qua cảnh báo về defaultProps
LogBox.ignoreLogs([
    'Warning: Star: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
    'Warning: TapRating: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
]);

const TopReviews = () => {
    return (
        <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 24, fontStyle: 'italic' }}>Đánh giá</Text>

            <View style={{ marginTop: 8 }}>
                <View style={{ paddingVertical: 8, borderWidth: 1, borderRadius: 8, padding: 4 }} >
                    <Text style={{ fontSize: 20, fontStyle: 'italic', fontWeight: 'bold' }}>Số sao trung bình: 4.8</Text>
                    <Text style={{ fontSize: 20, fontStyle: 'italic', opacity: 0.6, marginTop: 8 }}>125 lượt đánh giá</Text>
                    <Rating
                        type="star"
                        fractions={2}
                        startingValue={2.5}
                        readonly={true}
                        imageSize={40}
                        style={{ paddingVertical: 10, marginTop: 8 }}
                    />
                    {/* <AirbnbRating
                        count={5}
                        reviews={["Rất tệ", "Tệ", "Trung bình", "Tốt", "Rất tốt"]}
                        defaultRating={4.8}
                        size={20}
                        isDisabled={true}
                        showRating={false}
                    /> */}
                </View>
                <View style={{ paddingVertical: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000', width: 90 }}>Trung bình</Text>
                        <Progress.Bar progress={0.5} width={200} color="#FFB547" />
                        <Text style={{ fontSize: 16, color: '#000', fontStyle: 'italic', opacity: 0.6, marginLeft: 8 }}>100</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000', width: 90 }}>Trung bình</Text>
                        <Progress.Bar progress={0.5} width={200} color="#FFB547" />
                        <Text style={{ fontSize: 16, color: '#000', fontStyle: 'italic', opacity: 0.6, marginLeft: 8 }}>100</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000', width: 90 }}>Trung bình</Text>
                        <Progress.Bar progress={0.5} width={200} color="#FFB547" />
                        <Text style={{ fontSize: 16, color: '#000', fontStyle: 'italic', opacity: 0.6, marginLeft: 8 }}>100</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000', width: 90 }}>Trung bình</Text>
                        <Progress.Bar progress={0.5} width={200} color="#FFB547" />
                        <Text style={{ fontSize: 16, color: '#000', fontStyle: 'italic', opacity: 0.6, marginLeft: 8 }}>100</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000', width: 90 }}>Trung bình</Text>
                        <Progress.Bar progress={0.5} width={200} color="#FFB547" />
                        <Text style={{ fontSize: 16, color: '#000', fontStyle: 'italic', opacity: 0.6, marginLeft: 8 }}>100</Text>
                    </View>
                </View>

                <View>
                    <View style={{ flexDirection: 'row', paddingVertical: 12 }}>
                        <Image source={require('../../assets/products/1.png')} style={{ width: 44, height: 44, borderRadius: 100 }} />
                        <View style={{ flexShrink: 1, paddingHorizontal: 8, }}>
                            <Text style={{ color: '#000', fontSize: 18, fontStyle: 'italic', fontWeight: 'bold' }}>Nguyễn Đông</Text>
                            <Text style={{ color: '#000', fontSize: 14, fontStyle: 'italic' }}>14/09/2024 16:00</Text>
                            <Rating
                                type="star"
                                fractions={2}
                                startingValue={2.5}
                                readonly={true}
                                imageSize={24}
                                style={{ paddingVertical: 10 }}
                            />
                            <Text style={{ color: '#000', fontSize: 16, fontStyle: 'italic', opacity: 0.6 }}>I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn’t be happier with my purchase!! I have a pre-paid data plan so I was worried that this phone wouldn’t connect with my data plan, since the new phones don’t have the physical Sim tray anymore, but couldn’t have been easier! I bought an Unlocked black iPhone 14 Pro Max in excellent condition and everything is PERFECT. It was super easy to set up and the phone works and looks great. It truly was in excellent condition. Highly recommend!!!🖤</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 12 }}>
                        <Image source={require('../../assets/products/1.png')} style={{ width: 44, height: 44, borderRadius: 100 }} />
                        <View style={{ flexShrink: 1, paddingHorizontal: 8, }}>
                            <Text style={{ color: '#000', fontSize: 18, fontStyle: 'italic', fontWeight: 'bold' }}>Nguyễn Đông</Text>
                            <Text style={{ color: '#000', fontSize: 14, fontStyle: 'italic' }}>14/09/2024 16:00</Text>
                            <Rating
                                type="star"
                                fractions={2}
                                startingValue={2.5}
                                readonly={true}
                                imageSize={24}
                                style={{ paddingVertical: 10 }}
                            />
                            <Text style={{ color: '#000', fontSize: 16, fontStyle: 'italic', opacity: 0.6 }}>I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn’t be happier with my purchase!! I have a pre-paid data plan so I was worried that this phone wouldn’t connect with my data plan, since the new phones don’t have the physical Sim tray anymore, but couldn’t have been easier! I bought an Unlocked black iPhone 14 Pro Max in excellent condition and everything is PERFECT. It was super easy to set up and the phone works and looks great. It truly was in excellent condition. Highly recommend!!!🖤</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View >
    )
}

const Reviews = () => {

    return (
        <View
        // style={styles.container}

        >
            <TopReviews />
        </View>
    )
}

const ProductDetailScreen = ({ navigation, route }) => {
    const { productId } = route.params
    console.log(route.params);

    const products = result.products
    const product = products.find((product) => product.id === productId)

    //
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleInputChange = (text) => {
        const newQuantity = parseInt(text);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            setQuantity(newQuantity);
        } else {
            setQuantity(1);
        }
    };


    return (
        <BaseLayout navigation={navigation}>
            <View style={styles.container}>
                <View style={styles.productImageSection}>
                    <Image source={imageMap[product.image]} style={styles.productDetailImage} />
                </View>
                <View style={styles.productContent}>
                    <Text style={{ color: '#000', fontSize: 30, fontWeight: 'bold' }}>Bánh lọc Huế</Text>
                    <Text style={{ marginTop: 8, color: '#000', fontSize: 16, fontWeight: 'semibold', fontStyle: 'italic', opacity: 0.7 }}>Bánh bột lọc Huế không chỉ được coi là món ăn vặt, bạn hoàn toàn có thể thưởng thức thay cơm hay bữa chính trong ngày. Loại bánh này phổ biến ở nhiều địa phương, tuy nhiên, chỉ khi ăn tại Huế, bạn mới cảm nhận được vị ngon đặc trưng, đúng điệu của miền Trung</Text>
                    <Text style={{ marginTop: 8, color: '#000', fontSize: 24, fontWeight: 'bold' }}>35.000đ</Text>
                    <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'semibold', marginRight: 16, fontStyle: 'italic' }}>Số lượng:</Text>
                        <Icon type="antdesign" name="minus" color="#000" onPress={handleDecrease} size={20} />
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={String(quantity)}
                            onChangeText={handleInputChange}
                        />
                        <Icon type="antdesign" name="plus" color="#000" onPress={handleIncrease} size={20} />
                    </View>
                    <View style={{ marginTop: 20, flexDirection: 'row', gap: 16, }}>
                        <Button title="Thêm vào giỏ hàng" type="outline"
                            containerStyle={styles.productButton}
                            buttonStyle={{ borderColor: '#000', borderWidth: 2 }}
                            titleStyle={{ color: '#000' }}
                        />
                        <Button title="Thanh toán"
                            containerStyle={styles.productButton}
                            buttonStyle={{ borderColor: '#000', backgroundColor: '#000', borderWidth: 2 }}
                            titleStyle={{ color: '#fff' }}
                        />
                        {/* <Button containerStyle={styles.productButton} title="Thanh toán" /> */}
                    </View>
                    <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon type="feather" name="truck" color="#000" size={36} />
                        <View style={{ padding: 12 }}>
                            <Text style={{ fontSize: 14, color: '#000', fontStyle: 'italic' }}>Thời gian vận chuyển dự kiến</Text>
                            <Text style={{ fontSize: 14, color: '#000', fontStyle: 'italic' }}>1 giờ - 3 ngày</Text>
                        </View>
                    </View>
                </View>

                <View>
                    <Reviews />
                </View>
            </View>
        </BaseLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
        // backgroundColor: 'red',
    },
    productImageSection: {
        alignItems: 'center',
        marginTop: 20
    },
    productDetailImage: {
        height: screenWidth * 0.7,
        width: screenWidth * 0.7,
        borderRadius: 12
    },
    productContent: {
        marginTop: 8,

    },
    input: {
        width: 60,
        height: 40,
        marginHorizontal: 10,
        textAlign: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    productButton: {
        flexGrow: 1,
        // paddingHorizontal: 4
    }
})

export default ProductDetailScreen;