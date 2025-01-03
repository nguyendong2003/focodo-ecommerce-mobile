import { Button, Icon } from '@rneui/themed';
import { useContext, useEffect, useState } from 'react';
import { Alert, Dimensions, Image, Modal, PixelRatio, Pressable, Text, TextInput, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import result from "../../data/products.json"
import WebView from 'react-native-webview';
import { TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { formatCurrency, formatNumber } from '../../utils/FormatNumber';
import { AuthContext } from '../context/AuthProvider';
import { callAddToCart } from '../../services/api';
import { formatDescription } from '../../utils/FormatDescription';
import RenderHTML from 'react-native-render-html';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';

const screenWidth = Dimensions.get('screen').width;

// Ignore specific warning related to defaultProps
LogBox.ignoreLogs([
    'Warning: TNodeChildrenRenderer: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
    'Warning: MemoizedTNodeRenderer: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.',
    'Warning: TRenderEngineProvider: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
    'Warning: bound renderChildren: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.'
]);

const ModalAddToCart = ({ navigation, product, visibleModalImage, setVisibleModalImage }) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visibleModalImage}
            onRequestClose={() => {
                setVisibleModalImage(!visibleModalImage);
            }}
        >
            <View className="flex-1 justify-end items-center " style={{ backgroundColor: "rgba(0,0,0,0.5)", }}>
                <Pressable
                    className="h-3/4 w-full"
                    onPress={() => setVisibleModalImage(false)}
                />
                <View className="h-1/4 flex-1 bg-white w-full rounded-t-md p-3">
                    <View className="flex-row items-center gap-x-1">
                        <Icon type='antdesign' name="checkcircle" color={'#22c55e'} size={20} />
                        <Text className="text-green-500 text-lg font-bold">Đã thêm vào giỏ hàng</Text>
                    </View>

                    <View className="flex-row bg-gray-100 rounded-md gap-x-2 my-4">
                        <Image
                            // source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
                            source={{ uri: product?.images[0] }}
                            className="rounded-lg w-14 h-14"
                        />
                        <Text className="text-gray-600 text-base font-semibold shrink leading-5 p-1" numberOfLines={2}>
                            {product?.name}
                        </Text>

                    </View>

                    <View className="flex-row justify-around items-center bg-white gap-x-2">
                        <TouchableOpacity activeOpacity={0.7}
                            className="rounded-md  border-black py-2 border-2 w-1/2"
                            onPress={() => setVisibleModalImage(false)}
                        >
                            <Text className="text-center text-black font-bold">Đóng</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.7}
                            className="rounded-md  border-black py-2 grow border-2 bg-black"
                            onPress={() => navigation.navigate('Cart')}
                        >
                            <Text className="text-center text-white font-bold">Xem giỏ hàng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const ProductInfo = ({ navigation, product }) => {
    const { userLogin, logout, handleNavigate } = useContext(AuthContext)
    const [quantity, setQuantity] = useState(1);
    const [currentPageImage, setCurrentPageImage] = useState(0);
    const [visibleModalImage, setVisibleModalImage] = useState(false);

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

    const handleAddToCart = async () => {
        if (userLogin) {
            const res = await callAddToCart(product?.id, quantity);
            if (res.status === 200) {
                setVisibleModalImage(true);
            } else if (res.status === 400) {
                Toast.show({
                    type: 'error',
                    text1: 'Thất bại',
                    text2: 'Sản phẩm đã hết hàng hoặc có lỗi xảy ra',
                });
            }
        } else {
            // call api add to cart

            handleNavigate(navigation, 'ProductDetail', { productId: product?.id })
        }
    }

    return (
        <>
            {
                product?.images?.length > 1 && (

                    <View>
                        <PagerView style={{ width: screenWidth, height: screenWidth }}
                            initialPage={0}
                            onPageSelected={(e) => setCurrentPageImage(e.nativeEvent.position)}

                        >
                            {
                                product?.images?.map((image, index) => (
                                    <View key={index}>
                                        <Image
                                            source={{ uri: image }}
                                            className="rounded-lg"
                                            style={{ width: screenWidth, height: screenWidth }}
                                        />
                                    </View>
                                ))
                            }
                        </PagerView>

                        <View style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 5, borderRadius: 5 }}>
                            <Text className="text-white">{currentPageImage + 1}/{product?.images?.length}</Text>
                        </View>
                    </View>
                )
            }
            <View className="mt-2 px-4">
                <Text className="text-black text-base font-bold leading-5 mt-1">{product?.name}</Text>

                {
                    product?.review?.avg_rating !== "NaN" ? (
                        <View className="flex-row items-center gap-x-2" >
                            <Text className="text-black text-base font-bold">{product?.review?.avg_rating?.toFixed(1)}</Text>
                            <Rating
                                type="star"
                                startingValue={product?.review?.avg_rating}
                                readonly={true}
                                imageSize={14}
                                className="items-start"
                            />
                            {/* <Text className="text-gray-500 text-sm">({formatNumber(product?.reviewQuantity)})</Text> */}
                            <Text className="text-gray-500 text-sm">Đã bán: {formatNumber(product?.sold_quantity)}</Text>
                        </View>
                    ) : (
                        <View className="flex-row items-center gap-x-2" >
                            <Text className="text-gray-500 text-base font-bold">Chưa có đánh giá</Text>
                            <Text className="text-gray-500 text-sm">Đã bán: {formatNumber(product?.sold_quantity)}</Text>
                        </View>
                    )
                }



                <View className="flex-row items-center gap-x-4">
                    <Text className=" text-red-500 text-base font-bold">{formatCurrency(product?.sell_price)}</Text>
                    {
                        product?.discount > 0 && (
                            <Text className=" text-gray-500 text-sm bg-gray-200 rounded-lg px-1">-{(product.discount * 100).toFixed(0)}%</Text>
                        )
                    }
                    {
                        product?.sell_price < product?.original_price && (
                            <Text className=" text-gray-500 text-sm line-through">{formatCurrency(product?.original_price)}</Text>
                        )
                    }

                </View>

                {/* <Text className="text-black text-sm ">{product?.sub_description}</Text> */}
                <RenderHTML
                    contentWidth={screenWidth}
                    source={{ html: product?.sub_description || '' }}
                />

                <View className="flex-row items-center mt-1">
                    <Text className="text-black text-base font-semibold mr-4">Số lượng:</Text>
                    <Icon type="antdesign" name="minus" onPress={handleDecrease} size={24} />
                    <TextInput
                        className="w-14 px-3 mx-2 text-center border border-gray-500 rounded font-bold text-gray-700 text-base"
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
                        buttonStyle={{ borderColor: '#000', backgroundColor: '#000', borderWidth: 2, borderRadius: 8 }}
                        titleStyle={{ color: '#fff' }}
                        onPress={handleAddToCart}
                    // buttonStyle={{ borderColor: '#000', borderWidth: 2, borderRadius: 8 }}
                    // titleStyle={{ color: '#000' }}
                    />
                    {/* <Button
                        title="Thanh toán"
                        containerStyle={{ flexGrow: 1 }}
                        buttonStyle={{ borderColor: '#000', backgroundColor: '#000', borderWidth: 2, borderRadius: 8, marginLeft: 20 }}
                        titleStyle={{ color: '#fff' }}
                    /> */}
                </View>

                <View className="mt-2 flex-row items-center">
                    <Icon type="feather" name="truck" color="#000" size={28} />
                    <View className="p-2">
                        <Text className="text-sm text-gray-600 ">Thời gian vận chuyển dự kiến</Text>
                        <Text className="text-sm text-gray-600 ">1 giờ - 3 ngày</Text>
                    </View>
                </View>

                {
                    product?.main_description && (
                        <View className="mt-2">
                            <Text className="text-black text-base font-bold">Mô tả sản phẩm</Text>
                            <WebView
                                style={{ height: 120 }} // Điều chỉnh chiều cao cho phù hợp
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                originWhitelist={['*']}
                                source={{ html: formatDescription(product?.main_description) || '' }}
                            />
                            <TouchableOpacity activeOpacity={0.5}
                                className="p-2 "
                                onPress={() => navigation.navigate('ProductDescription', {
                                    productDescription: formatDescription(product?.main_description)
                                })}>
                                <Text className="text-center text-base text-blue-600">Xem tất cả mô tả</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

            </View>

            <ModalAddToCart
                navigation={navigation}
                product={product}
                visibleModalImage={visibleModalImage}
                setVisibleModalImage={setVisibleModalImage}
            />
        </>
    )
}

export default ProductInfo;