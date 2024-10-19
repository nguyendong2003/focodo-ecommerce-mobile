import { useEffect } from "react"
import { Text, TouchableOpacity } from "react-native"


const OrderButton = ({ navigation, order, orderStatus }) => {
    const getButtonText = (status) => {
        switch (status) {
            case 'Chưa xác nhận':
                return 'Hủy đơn'
            case 'Đã hủy':
                return 'Mua lại'
            case 'Đã xác nhận':
                return 'Theo dõi đơn hàng'
            case 'Đã giao':
                return 'Đánh giá'
            case 'Đã đánh giá':
                return 'Xem đánh giá'
            default:
                return 'Mặc định'
        }
    }

    const optionButtonPress = (status) => {
        switch (status) {
            case 'Chưa xác nhận':
                navigation.navigate({
                    name: 'OrderCancelledReason',
                    params: {
                        orderId: order?.id,
                    },
                });
                break;
            case 'Đã hủy':
                // call api buy again
                navigation.navigate('Cart');
                break;
            case 'Đã xác nhận':
                navigation.navigate('OrderTracking', { orderId: order?.id });
                break;
            case 'Đã giao':
                navigation.navigate('ReviewAdd', { orderId: order?.id });
                break;
            case 'Đã đánh giá':
                navigation.navigate('ReviewOrder', { orderId: order?.id });
                break;
            default:
                // call api buy again
                break;
        }
    }

    return (
        <TouchableOpacity activeOpacity={0.7}
            className="rounded-md  border-black py-2 border-2 bg-black"
            onPress={() => optionButtonPress(orderStatus)}
        >
            <Text className="text-center text-white font-bold">{getButtonText(orderStatus)}</Text>
        </TouchableOpacity>
    )
}

export default OrderButton