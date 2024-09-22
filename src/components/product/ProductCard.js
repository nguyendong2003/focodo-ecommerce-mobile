import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { Rating } from 'react-native-ratings';

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
                    <Text className="text-white text-sm">53%</Text>
                    <Text className="text-white text-sm">OFF</Text>
                </View>
            </View>

            <View className="px-1">
                <Text className="text-black text-lg leading-6 font-bold h-12 mt-1" numberOfLines={2} ellipsizeMode="tail">
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
                    <Text className="text-gray-500 text-sm mx-1 shrink" numberOfLines={1}>({new Intl.NumberFormat('vi-VN').format(20513)})</Text>
                </View>

                <Text className="text-slate-600">Đã bán: {new Intl.NumberFormat('vi-VN').format(114999)}</Text>

                <Text className="text-red-500 text-lg italic">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </Text>
                <Text className="text-slate-500 text-base line-through italic">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originPrice)}
                </Text>
            </View>



        </TouchableOpacity>
    );
}

export default ProductCard;