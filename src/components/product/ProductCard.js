import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { formatCurrency, formatNumber } from '../../utils/FormatNumber';

const dimensionWidth = Dimensions.get('window').width;

const ProductCard = ({ product, navigation }) => {

    return (
        <TouchableOpacity activeOpacity={0.5}
            onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
            className=" bg-white my-1 mx-1 rounded-lg"
            style={{ width: dimensionWidth / 2 - 12 }}
        >
            <View>
                <Image
                    // source={{ uri: item.image }}
                    source={require('../../static/images/products/1.png')}
                    className="rounded-lg items-center"
                    style={{ width: dimensionWidth / 2 - 12, height: dimensionWidth / 2 - 12 }}
                />
                <View className="bg-red-500 absolute top-0 right-0 rounded-lg p-1">
                    <Text className="text-white text-sm">{product.salePercent}%</Text>
                    <Text className="text-white text-sm">OFF</Text>
                </View>
            </View>

            <View className="px-1">
                <Text className="text-black text-base leading-5 font-bold h-10 mt-1" numberOfLines={2} ellipsizeMode="tail">
                    {product.name}
                </Text>

                <View className="flex-row items-center" >
                    <Rating
                        type="star"
                        fractions={1}
                        startingValue={product?.rate}
                        readonly={true}
                        imageSize={14}
                    />
                    <Text className="text-gray-500 text-sm mx-1 shrink" numberOfLines={1}>
                        ({formatNumber(product?.reviewQuantity)})
                    </Text>
                </View>

                <Text className="text-sm text-slate-600 leading-5">Đã bán: {formatNumber(product?.soldQuantity)}</Text>

                <Text className="text-red-500 text-lg italic leading-5">
                    {formatCurrency(product?.price)}
                </Text>
                <Text className="text-slate-500 text-base line-through italic leading-5">
                    {formatCurrency(product?.originPrice)}
                </Text>
            </View>



        </TouchableOpacity>
    );
}

export default ProductCard;