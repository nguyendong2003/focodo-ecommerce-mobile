import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { formatCurrency } from '../../utils/FormatNumber';


const ProductSlider = ({ product, navigation }) => {


    return (
        <TouchableOpacity activeOpacity={0.8}
            onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
            className="w-32 px-2 bg-white"
        >
            <View>
                <Image
                    // source={{ uri: item.image }}
                    source={require('../../static/images/products/1.png')}
                    className="w-28 h-28 rounded-lg items-center"
                />
                <View className="bg-red-500 absolute top-0 right-0 rounded-lg p-1">
                    <Text className="text-white text-sm font-bold">53%</Text>
                    <Text className="text-white text-sm font-bold">OFF</Text>
                </View>
            </View>
            <Text className="text-black text-base leading-5 font-bold h-10 mt-1" numberOfLines={2} ellipsizeMode="tail">
                {product.name}
            </Text>

            <View className="flex-row items-center" >
                <Rating
                    type="star"
                    startingValue={4.5}
                    readonly={true}
                    imageSize={14}
                    className="my-1 items-start"
                />
                <Text className="text-gray-500 text-sm mx-1">(23)</Text>
            </View>

            <Text className="text-red-500 text-lg italic leading-5">
                {formatCurrency(product?.price)}
            </Text>
            <Text className="text-slate-500 text-base line-through italic leading-5">
                {formatCurrency(product?.originPrice)}
            </Text>


        </TouchableOpacity>
    );
}

export default ProductSlider;