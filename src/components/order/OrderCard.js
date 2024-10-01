import { Image, Text, TouchableOpacity, View } from "react-native"
import { formatCurrency } from "../../utils/FormatNumber"
import OrderButton from "./OrderButton"
import { getStatusText } from "../../utils/OrderUtils"

const OrderCard = ({ navigation, order }) => {


    return (
        <>
            <Text className="mx-2 py-2 border-b-2 border-b-gray-200 text-gray-500 font-bold text-base"
                style={{ borderBottomWidth: 1 }}>{getStatusText(order?.status)}</Text>

            <TouchableOpacity activeOpacity={0.7}
                className="p-2"
                onPress={() => navigation.navigate('OrderDetail', { orderId: order?.id })}
            >
                <View className="flex-row items-center gap-x-2">
                    <Image source={{ uri: order?.image }} className="w-24 h-24 rounded-lg" />
                    <View className="shrink h-full w-full ">
                        <Text className="text-base text-gray-600 font-semibold leading-5" numberOfLines={2}>{order?.title}</Text>
                        <Text className="text-sm text-gray-500 leading-6" numberOfLines={1}>02/10/2024 16:20</Text>
                        <Text className="text-sm text-gray-500 leading-6 font-bold" numberOfLines={1}>{formatCurrency(order?.total)}</Text>
                    </View>
                </View>


                <View className="flex-row justify-between items-center mt-4 mb-1 gap-x-2">
                    <TouchableOpacity activeOpacity={0.7}
                        className="rounded-md  border-black py-2 w-1/2 border-2 mr-2"
                        // style={{ borderWidth: 2 }}
                        onPress={() => navigation.navigate('OrderDetail', { orderId: order?.id })}
                    >
                        <Text className="text-center text-black font-bold">Xem chi tiết</Text>
                    </TouchableOpacity>

                    <OrderButton navigation={navigation} order={order} />
                </View>
            </TouchableOpacity>
        </>

    )
}

export default OrderCard