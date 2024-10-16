import { Button, Icon } from "@rneui/themed"
import { BackHandler, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { formatCurrency } from "../utils/FormatNumber"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback } from "react"

const OrderSuccessScreen = ({ navigation, route }) => {
    const { customer, order } = route.params


    // Ngăn chặn hành động back press (nút back trên thiết bị)
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                // Ngăn chặn hành động back press
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );

    return (
        <View className="bg-white flex-1">
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View className="h-52 justify-center" style={{ backgroundColor: '#1ba8ff' }}>
                    <Icon type="antdesign" name="checkcircle" color={'white'} size={50} />
                    <Text className="text-center text-xl text-white mt-2">Cảm ơn quý khách!</Text>
                    <Text className="text-center text-lg text-white">Đặt hàng thành công</Text>
                </View>

                <View className="border-b-4 border-gray-200 py-3">
                    <Text className="text-center text-base">Số tiền đơn hàng</Text>
                    <Text className="text-center text-xl text-blue-600 font-bold">{formatCurrency(order?.final_price)}</Text>
                </View>

                <View className="flex-row justify-between items-center p-3 border-b-2 border-gray-100">
                    <Text className="text-base text-gray-500 font-bold">Mã đơn hàng: {order?.id}</Text>
                    <TouchableOpacity activeOpacity={0.6}
                        onPress={() => navigation.navigate('OrderDetail', { orderId: order?.id })}
                    >
                        <Text className="text-base text-blue-500 font-bold">Xem đơn hàng</Text>
                    </TouchableOpacity>
                </View>

                <View className="border-b-8 border-gray-200">

                    {
                        order?.details?.map((item, index) => (
                            <TouchableOpacity
                                key={item.id_product}
                                activeOpacity={0.7}
                                className="p-2 px-3 border-b-2 border-b-gray-100"
                                onPress={() => navigation.navigate('ProductDetail', { productId: item.id_product })}
                            >
                                <View className="flex-row items-center gap-x-2">
                                    <Image source={{ uri: item?.image }} className="w-16 h-16 rounded-lg" />
                                    <View className="shrink h-full w-full ">
                                        <Text className="text-base text-gray-600 font-semibold leading-5" numberOfLines={2}>{item?.name}</Text>
                                        <Text className="text-sm text-gray-500 leading-6" numberOfLines={1}>x{item?.quantity}  | {formatCurrency(item?.unit_price)}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
            <View
                className="p-5"
            >
                <Button
                    title="Quay về trang chủ"
                    type="outline"
                    buttonStyle={{ borderRadius: 8, borderWidth: 2 }}
                    onPress={() => navigation.navigate('HomePage')}
                />
            </View>
        </View>
    )
}

export default OrderSuccessScreen