import { Image, Text, TouchableOpacity, View } from "react-native"
import { formatCurrency } from "../../utils/FormatNumber"

const OrderCard = ({ navigation, order }) => {
    const getStatusText = (status) => {
        switch (status) {
            case 'process':
                return 'Đang xử lý'
            case 'shipping':
                return 'Đang vận chuyển'
            case 'finish':
                return 'Đã giao'
            case 'cancel':
                return 'Đã hủy'
            default:
                return 'Đã hủy'
        }
    }

    return (
        <>
            <Text className="mx-2 py-2 border-b-2 border-b-gray-200 text-gray-500 font-bold text-base"
                style={{ borderBottomWidth: 1 }}>{getStatusText(order?.status)}</Text>

            <TouchableOpacity activeOpacity={0.7}
                className="p-2"
                onPress={() => navigation.navigate('OrderDetail', { orderId: order?.id })}
            >
                <View className="flex-row items-center gap-x-2">
                    <Image source={{ uri: order?.image }} className="w-16 h-16 rounded-lg" />
                    <View className="shrink h-full w-full ">
                        <Text className="text-base text-gray-600 font-semibold leading-5" numberOfLines={2}>{order?.title}</Text>
                        <Text className="text-sm text-gray-500 leading-6" numberOfLines={1}>Số lượng: {order?.quantity}  | Tổng tiền: {formatCurrency(order?.total)}</Text>
                    </View>
                </View>


                <View className="flex-row justify-between items-center mt-4 mb-1 gap-x-2">
                    <TouchableOpacity activeOpacity={0.7}
                        className="rounded  border-black py-2 grow border-2"
                        // style={{ borderWidth: 2 }}
                        onPress={() => navigation.navigate('OrderDetail', { orderId: order?.id })}
                    >
                        <Text className="text-center text-black font-bold">Xem chi tiết</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7}
                        className="rounded  border-black py-2 grow border-2 bg-black"
                        // style={{ borderWidth: 2 }}
                        onPress={() => {
                            navigation.navigate('OrderDetail', { orderId: order?.id })
                        }}
                    >
                        <Text className="text-center text-white font-bold">Mua lại</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </>

    )
}

export default OrderCard