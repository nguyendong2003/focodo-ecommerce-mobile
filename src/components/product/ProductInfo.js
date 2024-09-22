import { Button, Icon } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import result from "../../data/products.json"

const ProductInfo = ({ navigation, productId }) => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null)

    useEffect(() => {
        // call api
        const products = result.products;

        const productFind = products.find((product) => product.id === productId);

        setProduct(productFind);

    }, [productId]);

    // Quantity product
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
        <>
            <View className="items-center p-4">
                <Image source={require('../../static/images/products/1.png')} className="h-64 w-64 rounded-lg" />
            </View>
            <View className="mt-2 px-4">
                <Text className="text-black text-xl font-bold">{product?.name}</Text>

                <View className="flex-row items-center gap-x-2" >
                    <Text className="text-black text-sm font-bold">4.5</Text>
                    <Rating
                        type="star"
                        startingValue={4.5}
                        readonly={true}
                        imageSize={14}
                        className="items-start"
                    />
                    <Text className="text-gray-500 text-sm">({new Intl.NumberFormat('vi-VN').format(2123)})</Text>
                    <Text className="text-gray-500 text-sm">Đã bán: {new Intl.NumberFormat('vi-VN').format(16759)}</Text>
                </View>
                <View className="flex-row items-center gap-x-4">
                    <Text className=" text-red-500 text-2xl font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price)}</Text>
                    <Text className=" text-gray-500 text-sm bg-gray-200 rounded-lg px-1">-10%</Text>
                    <Text className=" text-gray-500 text-sm line-through">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.originPrice)}</Text>
                </View>

                <Text className="text-black text-base italic">Bánh bột lọc Huế không chỉ được coi là món ăn vặt, bạn hoàn toàn có thể thưởng thức thay cơm hay bữa chính trong ngày. Loại bánh này phổ biến ở nhiều địa phương, tuy nhiên, chỉ khi ăn tại Huế, bạn mới cảm nhận được vị ngon đặc trưng, đúng điệu của miền Trung</Text>


                <View className="flex-row items-center mt-1">
                    <Text className="text-black text-base font-semibold mr-4">Số lượng:</Text>
                    <Icon type="antdesign" name="minus" onPress={handleDecrease} size={24} />
                    <TextInput
                        className="w-14 px-3 mx-2 text-center border border-gray-300 rounded"
                        keyboardType="numeric"
                        value={String(quantity)}
                        onChangeText={handleInputChange}
                    />
                    <Icon type="antdesign" name="plus" onPress={handleIncrease} size={24} />
                </View>

                <View className="mt-3 flex-row">
                    <Button
                        title="Thêm vào giỏ hàng"
                        type="outline"
                        containerStyle={{ flexGrow: 1 }}
                        buttonStyle={{ borderColor: '#000', borderWidth: 2, borderRadius: 8 }}
                        titleStyle={{ color: '#000' }}
                    />
                    <Button
                        title="Thanh toán"
                        containerStyle={{ flexGrow: 1 }}
                        buttonStyle={{ borderColor: '#000', backgroundColor: '#000', borderWidth: 2, borderRadius: 8, marginLeft: 20 }}
                        titleStyle={{ color: '#fff' }}
                    />
                </View>

                <View className="mt-2 flex-row items-center">
                    <Icon type="feather" name="truck" color="#000" size={28} />
                    <View className="p-2">
                        <Text className="text-base text-gray-600 ">Thời gian vận chuyển dự kiến</Text>
                        <Text className="text-base text-gray-600 ">1 giờ - 3 ngày</Text>
                    </View>
                </View>

                <View className="mt-2">
                    <Text className="text-black text-xl font-bold">Mô tả sản phẩm</Text>

                </View>
            </View>
        </>
    )
}

export default ProductInfo;