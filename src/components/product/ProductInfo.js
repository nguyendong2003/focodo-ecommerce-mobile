import { Button, Icon } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { Dimensions, Image, PixelRatio, Text, TextInput, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import result from "../../data/products.json"
import WebView from 'react-native-webview';
import { TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { formatCurrency, formatNumber } from '../../utils/FormatNumber';

const screenWidth = Dimensions.get('screen').width;

const ProductInfo = ({ navigation, productId }) => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null)
    const [currentPageImage, setCurrentPageImage] = useState(0);

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
            1
            setQuantity(newQuantity);
        } else {
            setQuantity(1);
        }
    };
    return (
        <>
            <View>
                <PagerView style={{ width: screenWidth, height: screenWidth }}
                    initialPage={0}
                    onPageSelected={(e) => setCurrentPageImage(e.nativeEvent.position)}

                >

                    <View key="1">
                        <Image
                            source={require('../../static/images/products/1.png')}
                            className="rounded-lg"
                            style={{ width: screenWidth, height: screenWidth }}
                        />
                    </View>
                    <View key="2">
                        <Image
                            source={require('../../static/images/products/2.png')}
                            className="rounded-lg"
                            style={{ width: screenWidth, height: screenWidth }}
                        />
                    </View>
                    <View key="3">
                        <Image
                            source={require('../../static/images/products/3.png')}
                            className="rounded-lg"
                            style={{ width: screenWidth, height: screenWidth }}
                        />
                    </View>
                    <View key="4">
                        <Image
                            source={require('../../static/images/products/4.png')}
                            className="rounded-lg"
                            style={{ width: screenWidth, height: screenWidth }}
                        />
                    </View>
                    <View key="5">
                        <Image
                            source={require('../../static/images/products/5.png')}
                            className="rounded-lg"
                            style={{ width: screenWidth, height: screenWidth }}
                        />
                    </View>
                </PagerView>

                <View style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 5, borderRadius: 5 }}>
                    <Text className="text-white">{currentPageImage + 1}/5</Text>
                </View>
            </View>
            <View className="mt-2 px-4">
                <Text className="text-black text-base font-bold">{product?.name}</Text>

                <View className="flex-row items-center gap-x-2" >
                    <Text className="text-black text-sm font-bold">{product?.rate.toFixed(1)}</Text>
                    <Rating
                        type="star"
                        startingValue={product?.rate}
                        readonly={true}
                        imageSize={14}
                        className="items-start"
                    />
                    <Text className="text-gray-500 text-sm">({formatNumber(product?.reviewQuantity)})</Text>
                    <Text className="text-gray-500 text-sm">Đã bán: {formatNumber(product?.soldQuantity)}</Text>
                </View>
                <View className="flex-row items-center gap-x-4">
                    <Text className=" text-red-500 text-2xl font-bold">{formatCurrency(product?.price)}</Text>
                    <Text className=" text-gray-500 text-sm bg-gray-200 rounded-lg px-1">-{product?.salePercent}%</Text>
                    <Text className=" text-gray-500 text-sm line-through">{formatCurrency(product?.originPrice)}</Text>
                </View>

                <Text className="text-black text-sm italic">{product?.shortDescription}</Text>


                <View className="flex-row items-center mt-1">
                    <Text className="text-black text-sm font-semibold mr-4">Số lượng:</Text>
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
                        <Text className="text-sm text-gray-600 ">Thời gian vận chuyển dự kiến</Text>
                        <Text className="text-sm text-gray-600 ">1 giờ - 3 ngày</Text>
                    </View>
                </View>

                <View className="mt-2">
                    <Text className="text-black text-xl font-bold">Mô tả sản phẩm</Text>
                    <WebView
                        style={{ height: 300 }} // Điều chỉnh chiều cao cho phù hợp
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        originWhitelist={['*']}
                        source={{ html: product?.longDescription || '' }}
                    />
                    <TouchableOpacity activeOpacity={0.5}
                        className="p-2 "
                        onPress={() => navigation.navigate('ProductDescription', {
                            productDescription: product?.longDescription
                        })}>
                        <Text className="text-center text-base text-blue-600">Xem tất cả</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </>
    )
}

export default ProductInfo;