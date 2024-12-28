import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { formatCurrency, formatNumber } from '../../utils/FormatNumber';


const ProductSlider = ({ product, navigation }) => {


    return (
        <TouchableOpacity activeOpacity={0.8}
            onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
            className="w-36 px-2 bg-white"
        >
            <View>
                <Image
                    // source={require('../../static/images/products/1.png')}
                    source={{ uri: product.image }}
                    className="w-32 h-32 rounded-lg items-center"
                />
                {
                    product.discount > 0 && (
                        <View className="bg-red-500 absolute top-0 right-0 rounded-lg p-1">
                            <Text className="text-white text-sm font-bold">{(product.discount * 100).toFixed(0)}%</Text>
                            <Text className="text-white text-sm font-bold">OFF</Text>
                        </View>
                    )
                }
            </View>
            <Text className="text-black text-sm leading-5 font-bold h-12 mt-1" numberOfLines={2} ellipsizeMode="tail">
                {product.name}
            </Text>

            {
                product.review !== "NaN" ? (
                    <View className="flex-row items-center " >
                        <Text className="text-gray-500 text-sm shrink mr-1" numberOfLines={1}>
                            {product.review?.toFixed(1)}
                        </Text>
                        <Rating
                            type="star"
                            fractions={1}
                            startingValue={product.review}
                            readonly={true}
                            imageSize={14}
                        />
                        {/* <Text className="text-gray-500 text-sm mx-1 shrink" numberOfLines={1}>
                                ({formatNumber(product?.reviewQuantity)})
                            </Text> */}

                    </View>
                ) : (
                    <View className="flex-row items-center " >
                        <Text className="text-gray-500 text-sm shrink mr-1" numberOfLines={1}>
                            Chưa có đánh giá
                        </Text>
                    </View>
                )
            }

            <Text className="text-sm text-slate-600 leading-5">Đã bán: {formatNumber(product?.sold_quantity)}</Text>

            <Text className="text-red-500 text-base italic leading-5">
                {formatCurrency(product?.sell_price)}
            </Text>
            {
                product.original_price !== product.sell_price && (
                    <Text className="text-slate-500 text-sm line-through italic leading-5">
                        {formatCurrency(product?.original_price)}
                    </Text>
                )
            }


        </TouchableOpacity>
    );
}

export default ProductSlider;